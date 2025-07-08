// Components/Team.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface TeamMemberProps {
  name: string;
  role: string;
  delay?: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, delay = 0 }) => {
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
          ease: "back.out(1.2)",
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
      className="bg-[#1A1A2E]/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center transition-all hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30 group"
    >
      <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 mx-auto mb-6 overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-500/50 transition-all">
        {/* This would be an actual image in production */}
        <div className="w-full h-full flex items-center justify-center text-4xl text-white/70">
          <i className="fas fa-user"></i>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-1 text-white">{name}</h3>
      <p className="text-purple-400 mb-4">{role}</p>
      
      <div className="flex justify-center space-x-3">
        <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  
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
        text,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const teamMembers = [
    {
      name: "Dr. Johnathan Smith",
      role: "Founder & Executive Director"
    },
    {
      name: "Lisa Rodriguez",
      role: "Education Director"
    },
    {
      name: "Michael Chen",
      role: "Technology Lead"
    },
    {
      name: "Aisha Johnson",
      role: "Music Program Coordinator"
    }
  ];

  return (
    <section 
      id="team" 
      ref={sectionRef}
      className="py-20 md:py-28 relative bg-gradient-to-b from-[#131338] to-[#0A0A0F]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-700/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair" ref={headingRef}>
            <span className="text-white">Leadership </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Team</span>
          </h2>
          <p className="text-gray-300 text-lg" ref={textRef}>
            Our organization is led by a dedicated team of experts who are committed to our mission of empowering the next generation through music and technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;