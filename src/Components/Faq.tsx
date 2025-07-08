// Components/FAQ.tsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ 
  question, 
  answer, 
  isOpen, 
  onToggle,
  delay = 0
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const item = itemRef.current;
    
    if (item) {
      gsap.fromTo(
        item,
        { 
          y: 30, 
          opacity: 0
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8,
          delay,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [delay]);
  
  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      if (isOpen) {
        gsap.to(content, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: "power1.out"
        });
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power1.out"
        });
      }
    }
  }, [isOpen]);

  return (
    <div 
      ref={itemRef}
      className="border-b border-white/10 last:border-b-0"
    >
      <button
        className="w-full py-6 text-left flex items-center justify-between focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-white">{question}</h3>
        <span className={`text-purple-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div 
        ref={contentRef}
        className="overflow-hidden opacity-0 h-0"
      >
        <div className="pb-6 text-gray-300">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [openItem, setOpenItem] = useState<number | null>(0);
  
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

  const faqs = [
    {
      question: "What age groups do your programs serve?",
      answer: "Our programs are designed for students ages 8-18, with different curricula tailored to specific age groups and skill levels. We offer introductory programs for younger students and more advanced options for teenagers."
    },
    {
      question: "Do students need prior music or technology experience?",
      answer: "No prior experience is required! Our programs are designed to meet students where they are, whether they're complete beginners or have some background in music or technology. Our educators are skilled at adapting to different learning levels."
    },
    {
      question: "How can schools partner with Music Science Group?",
      answer: "We offer several partnership models for schools, including after-school programs, in-school workshops, teacher training, and curriculum integration. Contact us to discuss how we can create a customized program that meets your school's specific needs."
    },
    {
      question: "Are scholarships available for students?",
      answer: "Yes! We're committed to making our programs accessible to all students. We offer need-based scholarships and work with community partners to ensure that financial constraints don't prevent any child from participating in our programs."
    },
    {
      question: "What technology equipment do you use in your programs?",
      answer: "We use a variety of technologies, including 3D printers, coding platforms, MIDI controllers, digital audio workstations, robotics kits, and AI music generation tools. All equipment is provided during our programs, so students don't need to bring their own devices."
    },
    {
      question: "How can I volunteer or get involved?",
      answer: "We welcome volunteers with backgrounds in music, technology, education, or simply a passion for helping young people. Visit our 'Get Involved' section to learn about volunteer opportunities, donations, and partnerships."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section 
      id="faq" 
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
            <span className="text-white">Frequently Asked </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Questions</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Find answers to common questions about our programs and how we empower students through music and technology.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-[#1A1A2E]/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItem === index}
              onToggle={() => toggleItem(index)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;