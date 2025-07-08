// Components/MusicTechShowcase.tsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const MusicTechShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const text = textRef.current;
    
    if (section && heading && text) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      
      gsap.fromTo(
        text.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  // Music visualization effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    let source: MediaElementAudioSourceNode | null = null;
    
    // Resize canvas to parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw particles that respond to mouse and "music"
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    const createParticles = () => {
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 1,
          speedY: (Math.random() - 0.5) * 1,
          color: `hsl(${Math.random() * 60 + 240}, 100%, 50%)`
        });
      }
    };

    createParticles();

    // Mouse interaction
    let mouse = {
      x: 0,
      y: 0,
      radius: 100
    };

    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    });

    // Create simulated audio data when not playing actual audio
    const simulateAudioData = () => {
      if (!dataArray) {
        dataArray = new Uint8Array(128);
      }
      
      // Create a wave-like pattern that changes over time
      const time = Date.now() / 1000;
      for (let i = 0; i < dataArray.length; i++) {
        const t = time + i * 0.05;
        dataArray[i] = 128 + 
          40 * Math.sin(t) +
          20 * Math.sin(t * 2.5) +
          10 * Math.sin(t * 5);
      }
      
      return dataArray;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get audio data (real or simulated)
      const audioData = isPlaying && analyser ? (() => {
        analyser.getByteFrequencyData(dataArray!);
        return dataArray!;
      })() : simulateAudioData();
      
      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Influence particles by audio data
        const audioIndex = Math.floor(i / particles.length * audioData.length);
        const audioValue = audioData[audioIndex] / 255; // Normalize to 0-1
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + audioValue), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          p.x -= Math.cos(angle) * force * 2;
          p.y -= Math.sin(angle) * force * 2;
        }
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Add some randomness to movement
        p.speedX += (Math.random() - 0.5) * 0.1;
        p.speedY += (Math.random() - 0.5) * 0.1;
        
        // Limit speed
        const maxSpeed = 2;
        p.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, p.speedX));
        p.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, p.speedY));
      }
      
      // Draw frequency bars
      const barWidth = canvas.width / audioData.length;
      const barSpacing = 2;
      const barHeightMultiplier = canvas.height / 255 * 0.5;
      
      ctx.fillStyle = 'rgba(124, 58, 237, 0.5)';
      for (let i = 0; i < audioData.length; i++) {
        const barHeight = audioData[i] * barHeightMultiplier;
        ctx.fillRect(
          i * (barWidth + barSpacing),
          canvas.height - barHeight,
          barWidth,
          barHeight
        );
      }
      
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Toggle actual audio processing
    const toggleAudio = () => {
      if (isPlaying) {
        // Setup audio context and analyzer if needed
        if (!audioContext) {
          audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          const bufferLength = analyser.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          
          // Create audio element (would normally connect to a real audio source)
          const audio = new Audio();
          audio.src = "https://example.com/sample-music.mp3"; // Placeholder - not actually loaded
          audio.crossOrigin = "anonymous";
          
          source = audioContext.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          
          // Simulate playing (we don't actually play the audio since we don't have a real file)
          // audio.play();
        }
      }
    };

    // Call toggle based on state
    toggleAudio();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      
      if (audioContext) {
        if (source) {
          source.disconnect();
        }
        if (analyser) {
          analyser.disconnect();
        }
      }
    };
  }, [isPlaying]);

  return (
    <section 
      id="music-tech" 
      ref={sectionRef}
      className="py-20 md:py-28 relative bg-gradient-to-b from-[#0A0A0F] to-[#131338]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-700/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-indigo-600/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair" ref={headingRef}>
            <span className="text-white">Where </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Music</span>
            <span className="text-white"> Meets </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Technology</span>
          </h2>
          <div className="text-gray-300 text-lg space-y-4" ref={textRef}>
            <p>
              Experience the magic of how music and technology intersect in our innovative programs. This interactive visualization demonstrates how students can see sound and learn about frequency, amplitude, and digital signal processing.
            </p>
            <p>
              Interact with the visualization below by moving your mouse over it to see how technology can help us visualize and understand music in new ways.
            </p>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-[#1A1A2E]/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden h-96 md:h-[500px] shadow-xl shadow-purple-600/10">
            <canvas 
              ref={canvasRef} 
              className="w-full h-full cursor-pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            ></canvas>
            
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {isPlaying ? "Interactive Mode" : "Ambient Mode"} - Click to toggle
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1A2E]/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-4">
                <i className="fas fa-wave-square text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Sound Visualization</h3>
              <p className="text-gray-300">Students learn to see sound waves and understand the physics behind music.</p>
            </div>
            
            <div className="bg-[#1A1A2E]/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-4">
                <i className="fas fa-code text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Coding Music</h3>
              <p className="text-gray-300">Create digital music through coding, learning both programming and music theory.</p>
            </div>
            
            <div className="bg-[#1A1A2E]/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-4">
                <i className="fas fa-brain text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Digital Creativity</h3>
              <p className="text-gray-300">Explore the intersection of technology and creativity through music composition.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#programs" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-purple-500/20"
          >
            Explore Our Programs
          </a>
        </div>
      </div>
    </section>
  );
};

export default MusicTechShowcase;