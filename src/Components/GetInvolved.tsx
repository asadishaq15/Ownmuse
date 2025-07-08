// Components/GetInvolved.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface InvolvementCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  icon: string;
  delay?: number;
}

const InvolvementCard: React.FC<InvolvementCardProps> = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  icon, 
  delay = 0 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    
    if (card) {
      gsap.fromTo(
        card,
        { 
          y: 40, 
          opacity: 0
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8,
          delay,
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
      className="bg-[#1A1A2E]/50 backdrop-blur-sm p-8 rounded-xl border border-white/10 transition-all hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30 group h-full flex flex-col"
    >
      <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-md shadow-purple-600/20 group-hover:scale-110 transition-transform">
        <i className={`fas ${icon} text-2xl`}></i>
      </div>
      
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-300 mb-8 flex-grow">{description}</p>
      
      <a 
        href={buttonLink} 
        className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors"
      >
        {buttonText}
      </a>
    </div>
  );
};

const GetInvolved: React.FC = () => {
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

  const involvementOptions = [
    {
      title: "Volunteer",
      description: "Give your time and expertise. Whether you're a teacher, a tech enthusiast, or just want to make a difference, there's a role for you.",
      buttonText: "Become a Volunteer",
      buttonLink: "#volunteer",
      icon: "fa-hands-helping"
    },
    {
      title: "Donate",
      description: "Your support directly impacts students' lives by providing access to cutting-edge technology and enriching educational experiences.",
      buttonText: "Donate Now",
      buttonLink: "#donate",
      icon: "fa-gift"
    },
    {
      title: "Corporate Partnerships",
      description: "Join our team of partners to bring lasting change to underserved communities. Together, we can empower young people with the skills they need to succeed.",
      buttonText: "Partner With Us",
      buttonLink: "#partner",
      icon: "fa-handshake"
    }
  ];

  return (
    <section 
      id="get-involved" 
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Be a Part </span>
            <span className="text-white">of the Movement</span>
          </h2>
          <p className="text-gray-300 text-lg" ref={textRef}>
            Help us empower more students to thrive in a digital world. Join us and make a difference in the lives of young people. There are many ways to get involved.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {involvementOptions.map((option, index) => (
            <InvolvementCard
              key={index}
              title={option.title}
              description={option.description}
              buttonText={option.buttonText}
              buttonLink={option.buttonLink}
              icon={option.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;