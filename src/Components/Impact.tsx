// Components/Impact.tsx - Updated version
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const StatCard: React.FC<{
  number: string;
  label: string;
  delay?: number;
}> = ({ number, label, delay = 0 }) => {
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
      
      // Number counter animation
      const numberElement = card.querySelector('.stat-number');
      if (numberElement) {
        gsap.fromTo(
          numberElement,
          { innerText: "0" },
          { 
            innerText: number.replace(/[^\d]/g, ''),
            duration: 2,
            delay: delay + 0.3,
            snap: { innerText: 1 }
          }
        );
      }
    }
  }, [delay, number]);

  return (
    <div 
      ref={cardRef}
      className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-2xl p-8 text-center backdrop-blur-sm border border-white/10"
    >
      <h3 className="text-4xl md:text-5xl font-bold mb-3 text-white">
        <span className="stat-number">{number.replace(/[^\d]/g, '')}</span>
        <span>{number.includes('+') ? '+' : number.includes('%') ? '%' : ''}</span>
      </h3>
      <p className="text-gray-300">{label}</p>
    </div>
  );
};

const Impact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
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

  const stats = [
    {
      number: "3000+",
      label: "Young people impacted"
    },
    {
      number: "100%",
      label: "Increased interest in STEM fields"
    },
    {
      number: "100%",
      label: "Better understanding of STEAM concepts"
    },
    {
      number: "91%",
      label: "Parent recommendation rate"
    }
  ];

  return (
    <section 
      id="impact" 
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
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Impact</span>
          </h2>
          <div className="text-gray-300 text-lg space-y-4" ref={textRef}>
            <p>
              Our programs empower kids with the knowledge and skills they need to thrive in the digital age. They also provide a unique opportunity for self-expression through music, building confidence and fostering creativity.
            </p>
            <p>
              We have a proven track record of success, and we are committed to continuing to provide life-changing opportunities for children in underserved communities.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <a 
            href="#get-involved" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-purple-500/20"
          >
            Make An Impact
          </a>
        </div>
      </div>
    </section>
  );
};

export default Impact;