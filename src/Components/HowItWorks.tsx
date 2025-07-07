import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsArray = useRef<HTMLDivElement[]>([]);

  // Function to add elements to the steps array ref
  const addToStepsArray = (el: HTMLDivElement | null) => {
    if (el && !stepsArray.current.includes(el)) {
      stepsArray.current.push(el);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const steps = stepsRef.current;
    
    if (section && heading && steps) {
      // Heading animation
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
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Steps animation with stagger
      gsap.fromTo(
        stepsArray.current,
        { 
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: steps,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Timeline connector animation
      gsap.fromTo(
        ".timeline-connector",
        { height: 0 },
        {
          height: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: steps,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const workflowSteps = [
    {
      number: "01",
      title: "Connect Your Streaming Data",
      description: "Link your Spotify, Apple Music, or other streaming platforms to let us analyze your performance metrics.",
      iconClass: "fa-chart-line"
    },
    {
      number: "02",
      title: "Get Your Offer",
      description: "We'll calculate a custom advance offer based on your streaming history and projected earnings.",
      iconClass: "fa-calculator"
    },
    {
      number: "03",
      title: "Customize Your Terms",
      description: "Adjust recoupment rates, term length, and catalog selection to find the perfect fit for your needs.",
      iconClass: "fa-sliders-h"
    },
    {
      number: "04",
      title: "Receive Your Funding",
      description: "Once approved, funds arrive in your account within 2-3 business days, with no hidden fees.",
      iconClass: "fa-wallet"
    }
  ];

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-20 md:py-28 relative bg-gradient-to-b from-[#0A0A0F] to-[#131338]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-700/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair">
            <span className="text-white">How </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">OwnMuse</span>
            <span className="text-white"> Works</span>
          </h2>
          <p className="text-gray-300 text-lg">
            A straightforward process designed to get you the funding you need while maintaining full ownership of your music.
          </p>
        </div>
        
        <div ref={stepsRef} className="relative">
          {/* Vertical timeline connector for desktop */}
          <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-indigo-500 timeline-connector"></div>
          
          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {workflowSteps.map((step, index) => (
              <div 
                key={index}
                ref={addToStepsArray}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 md:gap-16 mb-12 md:mb-24`}
              >
                {/* Step Number and Icon */}
                <div className="w-full md:w-1/2 flex md:justify-center">
                  <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 p-8 rounded-2xl backdrop-blur-sm border border-white/10 relative">
                    <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                      {step.number}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                    
                    <div className="mt-6 flex items-center text-purple-400">
                      <i className={`fas ${step.iconClass} mr-2`}></i>
                      <span>Simple & Transparent</span>
                    </div>
                  </div>
                </div>
                
                {/* Illustration or Icon (placeholder) */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/20">
                    <i className={`fas ${step.iconClass} text-white text-2xl md:text-3xl`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-12">
          <a 
            href="#calculator" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-purple-500/20 inline-block"
          >
            Calculate Your Advance Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;