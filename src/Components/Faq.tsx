import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How is my advance amount calculated?",
    answer: "Your advance is calculated based on your historical streaming data and projected future earnings. We analyze key metrics like monthly listeners, stream counts, growth trends, and engagement rates to determine a fair offer amount."
  },
  {
    question: "Do I give up ownership of my music?",
    answer: "No. Unlike traditional record deals, OwnMuse advances don't require you to transfer ownership of your masters or publishing rights. You maintain 100% ownership of your intellectual property."
  },
  {
    question: "What happens if I don't recoup the full advance?",
    answer: "Our agreements are non-recourse, which means you're only obligated to pay back the advance from the agreed-upon percentage of your future music income during the term. If the advance isn't fully recouped by the end of the term, the remaining balance is forgiven."
  },
  {
    question: "Can I customize my recoupment rate?",
    answer: "Yes. OwnMuse offers flexible recoupment rates, typically ranging from 50% to 90% of your streaming income. A higher recoupment rate may qualify you for a larger advance, while a lower rate preserves more of your monthly income during repayment."
  },
  {
    question: "How quickly can I receive funding?",
    answer: "After connecting your streaming accounts and accepting an offer, funds are typically disbursed within 2-3 business days. The entire process from application to funding can be completed in less than a week."
  },
  {
    question: "Is there a minimum streaming requirement to qualify?",
    answer: "While there's no strict minimum, our funding model works best for artists with established streaming history. Generally, artists with at least 10,000 monthly listeners and consistent streaming revenue over 6+ months receive the most competitive offers."
  }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Reset refs array
  useEffect(() => {
    faqRefs.current = faqRefs.current.slice(0, faqs.length);
  }, []);
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  // Animations
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    
    if (section && heading) {
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
      
      // FAQ items staggered animation
      gsap.fromTo(
        faqRefs.current,
        { 
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);
  
  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="py-20 md:py-28 relative bg-gradient-to-b from-[#131338] to-[#0A0A0F]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-700/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-indigo-600/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair">
            <span className="text-white">Frequently </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Asked Questions</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Everything you need to know about OwnMuse funding and how it works.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
            key={index}
            ref={el => { faqRefs.current[index] = el; }}
            className="mb-5"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-5 flex justify-between items-center rounded-lg transition-colors ${
                  activeIndex === index 
                    ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30' 
                    : 'bg-[#1A1A2E]/30 hover:bg-[#1A1A2E]/50 border border-white/5'
                }`}
              >
                <span className="font-medium text-lg text-white">{faq.question}</span>
                <span className={`transform transition-transform duration-300 text-purple-400 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}>
                  <i className="fas fa-chevron-down"></i>
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 text-gray-300 bg-[#1A1A2E]/10 rounded-b-lg border-t-0 border border-white/5">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA card */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-2xl p-8 md:p-10 border border-purple-500/20 text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Still have questions?</h3>
            <p className="text-gray-300 mb-6">
              Our team is ready to help you understand how OwnMuse can support your music career.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#contact" 
                className="bg-white text-[#131338] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="#calculator" 
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Calculate Your Advance
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;