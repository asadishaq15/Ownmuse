// Components/Programs.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ProgramCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  delay?: number;
}> = ({ title, description, icon, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    
    if (card) {
      gsap.fromTo(
        card,
        { 
          y: 40, 
          opacity: 0,
          scale: 0.95
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="bg-[#1A1A2E]/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30 group"
    >
      <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-md shadow-purple-600/20 group-hover:scale-110 transition-transform">
        <i className={`fas ${icon} text-2xl`}></i>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const Programs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    
    if (section && heading) {
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
    }
  }, []);

  const programs = [
    {
      title: "3D Printing & Engineering",
      description: "Students design and create musical instruments while learning key engineering concepts.",
      icon: "fa-cube"
    },
    {
      title: "Robotics",
      description: "Build and program robots that interact with music.",
      icon: "fa-robot"
    },
    {
      title: "Coding",
      description: "Learn to code and create digital musical experiences.",
      icon: "fa-code"
    },
    {
      title: "AI Music Creation",
      description: "Explore artificial intelligence to compose and generate original music.",
      icon: "fa-brain"
    }
  ];

  return (
    <section 
      id="programs" 
      ref={sectionRef}
      className="py-20 md:py-28 relative bg-gradient-to-b from-[#0A0A0F] to-[#131338]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-700/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-indigo-600/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Programs</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Innovative STEAM education programs that combine music with cutting-edge technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              title={program.title}
              description={program.description}
              icon={program.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="#get-involved" 
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            Support Our Programs
          </a>
        </div>
      </div>
    </section>
  );
};

export default Programs;