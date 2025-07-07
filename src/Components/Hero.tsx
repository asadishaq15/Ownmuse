import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dashboardImage from '../assets/dashboard.webp'; // You'll need to create this asset

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2 }
    )
    .fromTo(
      ctaButtonRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
      "-=0.5"
    )
    .fromTo(
      imageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.4 },
      "-=0.8"
    );

    // Floating animation for decoration elements
    if (floatingElementsRef.current) {
      const elements = floatingElementsRef.current.children;
      for (let i = 0; i < elements.length; i++) {
        gsap.to(elements[i], {
          y: `-=${10 + Math.random() * 15}`,
          x: `+=${Math.random() * 10 - 5}`,
          rotation: Math.random() * 8 - 4,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random()
        });
      }
    }

    // Parallax effect on scroll
    gsap.to(heroRef.current, {
      backgroundPositionY: '30%',
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 relative min-h-screen flex items-center"
      style={{
        background: 'linear-gradient(180deg, #0A0A0F 0%, #131338 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Ambient grid background */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      ></div>

      {/* Purple gradient glows */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-700/20 rounded-full filter blur-[120px] opacity-30 z-0"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-600/20 rounded-full filter blur-[120px] opacity-30 z-0"></div>

      {/* Floating decoration elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-4 h-4 rounded-full bg-purple-500/30"></div>
        <div className="absolute top-[35%] right-[15%] w-6 h-6 rounded-full bg-indigo-500/30"></div>
        <div className="absolute bottom-[25%] left-[20%] w-5 h-5 rounded-full bg-purple-600/30"></div>
        <div className="absolute top-[70%] right-[25%] w-3 h-3 rounded-full bg-indigo-400/30"></div>
        <div className="absolute top-[10%] right-[35%] w-8 h-8 rounded-full border border-purple-400/40"></div>
        <div className="absolute bottom-[15%] left-[35%] w-6 h-6 rounded-full border border-indigo-400/40"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div ref={textRef} className="text-center lg:text-left">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white leading-tight">
              Advance Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Music Career</span> On Your Terms
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              OwnMuse provides music creators with funding options that preserve independence and creative control. Get advances based on your streaming data without giving up your rights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a 
                href="#calculator" 
                ref={ctaButtonRef}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-purple-500/20"
              >
                Calculate Your Advance
              </a>
              <a 
                href="#how-it-works" 
                className="bg-transparent border border-purple-500 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-500/10 transition-all"
              >
                Learn How It Works
              </a>
            </div>
          </div>

          {/* Right side - Dashboard mockup */}
          <div ref={imageRef} className="lg:pl-10 relative">
            {/* Added more padding around the dashboard container */}
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-white/10 mx-auto" style={{ margin: '48px 24px' }}>
              <img 
                src={dashboardImage} 
                alt="OwnMuse Dashboard" 
                className="w-full h-auto"
                style={{ maxWidth: '100%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/20 to-transparent mix-blend-overlay"></div>
            </div>
            
            {/* Stats cards positioned around the dashboard - adjusted positioning */}
            <div className="absolute top-0 left-0 bg-[#1A1A2E]/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10 hidden md:block z-20">
              <p className="text-purple-400 font-medium">Monthly Streams</p>
              <p className="text-white text-xl font-bold">230,486</p>
            </div>
            
            <div className="absolute bottom-0 right-0 bg-[#1A1A2E]/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10 hidden md:block z-20">
              <p className="text-indigo-400 font-medium">Potential Advance</p>
              <p className="text-white text-xl font-bold">$18,500</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;