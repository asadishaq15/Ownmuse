// Components/Hero.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    
    if (hero && title && subtitle && cta) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        title,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0
      )
      .fromTo(
        subtitle,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0.3
      )
      .fromTo(
        cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.6
      );
    }
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ 
        background: "linear-gradient(to bottom, #0A0A0F, #131338)"
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-purple-700/20 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-indigo-600/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-[40%] right-[30%] w-40 h-40 bg-purple-500/20 rounded-full filter blur-[60px]"></div>
        
        {/* Music note particles */}
        <div className="absolute inset-0">
          {/* This would be replaced with actual animated music note particles */}
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center py-16">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white leading-tight"
        >
          Empowering Kids Through <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            Music & Technology
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
        >
          Bridging the gap between underserved communities and the future of STEM through the power of music.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#programs" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-purple-500/20"
          >
            Explore Programs
          </a>
          <a 
            href="#get-involved" 
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            Get Involved
          </a>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#mission" className="text-white/70 hover:text-white transition-colors">
            <svg className="w-6 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;