import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (section && content) {
      // Content animation
      gsap.fromTo(
        content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Particle floating animation
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle) => {
        gsap.to(particle, {
          y: `-=${20 + Math.random() * 30}`,
          x: `+=${Math.random() * 20 - 10}`,
          rotation: Math.random() * 360,
          duration: 3 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2
        });
      });
    }
  }, []);
  
  return (
    <section 
      id="cta" 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A1A2E 0%, #0A0A0F 100%)',
      }}
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-purple-700/10 rounded-full filter blur-[150px] opacity-70"></div>
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-indigo-600/20 rounded-full filter blur-[120px] opacity-50"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-[20%] left-[10%] w-3 h-3 rounded-full bg-purple-500/40"></div>
        <div className="particle absolute top-[65%] left-[15%] w-5 h-5 rounded-full bg-indigo-500/30"></div>
        <div className="particle absolute top-[40%] left-[75%] w-4 h-4 rounded-full bg-purple-400/30"></div>
        <div className="particle absolute top-[70%] left-[80%] w-6 h-6 rounded-full bg-indigo-400/20"></div>
        <div className="particle absolute top-[30%] left-[30%] w-8 h-8 rounded-full border border-purple-400/30"></div>
        <div className="particle absolute top-[60%] left-[60%] w-10 h-10 rounded-full border border-indigo-400/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair leading-tight">
            <span className="text-white">Ready to Fund Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Music Career</span>
            <span className="text-white"> on Your Terms?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of artists who've maintained their independence while accessing the capital they need to grow their careers.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a 
              href="#calculator" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-purple-500/30"
            >
              Calculate Your Advance
            </a>
            <a 
              href="#contact" 
              className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-colors"
            >
              Schedule a Consultation
            </a>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <i className="fas fa-check-circle text-purple-400 mr-2"></i>
              <span className="text-gray-300">No rights transfer</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle text-purple-400 mr-2"></i>
              <span className="text-gray-300">Fast funding</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle text-purple-400 mr-2"></i>
              <span className="text-gray-300">Custom terms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;