// Components/Mission.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
const Mission: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    
    if (section && text) {
      gsap.fromTo(
        text.children,
        { 
          opacity: 0,
          y: 30 
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef} 
      className="py-20 md:py-28 relative bg-gradient-to-b from-[#131338] to-[#0A0A0F]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-700/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center" ref={textRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Mission</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            We are committed to bridging the gap for underserved students by providing access to cutting-edge technology and creative S.T.E.A.M. education through the universal language of music.
          </p>
          
          <p className="text-lg text-gray-300 mb-10 leading-relaxed">
            Our Music Science Group (MSG) Program empowers students with the skills, knowledge, and confidence they need to thrive in a rapidly evolving digital world. By fostering collaboration, innovation, and wellness, we help students unlock their full potential and prepare them for success in the future.
          </p>
          
          <div className="mt-10">
            <a 
              href="#programs" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-purple-500/20"
            >
              See Our Programs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;