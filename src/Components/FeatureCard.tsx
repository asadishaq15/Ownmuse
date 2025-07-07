import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureCard: React.FC<{
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
      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-md shadow-purple-600/20 group-hover:scale-110 transition-transform">
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dealSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const dealSection = dealSectionRef.current;
    
    if (section && heading && dealSection) {
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
      
      // Deal section animation
      gsap.fromTo(
        dealSection,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: dealSection,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const features = [
    {
      title: "Keep Your Rights",
      description: "Maintain 100% ownership of your masters and publishing rights while accessing the capital you need.",
      icon: "fa-copyright"
    },
    {
      title: "Flexible Terms",
      description: "Choose from 6-24 month terms with adjustable recoupment rates to match your cash flow needs.",
      icon: "fa-sliders-h"
    },
    {
      title: "Data-Driven Offers",
      description: "Get advance amounts based on your actual streaming performance, not subjective opinions.",
      icon: "fa-chart-line"
    },
    {
      title: "No Hidden Fees",
      description: "Transparent pricing with no hidden costs, and no long-term obligations beyond your selected term.",
      icon: "fa-money-bill-wave"
    },
    {
      title: "Fast Funding",
      description: "Complete the process online and receive funds in your account within days, not months.",
      icon: "fa-bolt"
    },
    {
      title: "Artist Support",
      description: "Access our team of music industry experts for guidance throughout your project.",
      icon: "fa-headphones"
    }
  ];

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-20 md:py-28 relative bg-gradient-to-b from-[#131338] to-[#0A0A0F]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-700/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-indigo-600/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair">
            <span className="text-white">Why Choose </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">OwnMuse</span>
          </h2>
          <p className="text-gray-300 text-lg">
            We've redesigned music funding to put artists first, with transparent terms and creator-friendly deals.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {/* Deal Customization Section (inspired by BeatBread) */}
        <div ref={dealSectionRef} className="bg-[#1A1A2E]/70 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-purple-900/10 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Deal details form */}
            <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <span>Deal Details</span>
                <i className="fas fa-info-circle ml-2 text-purple-400 text-lg"></i>
              </h3>
              
              <div className="space-y-6">
                {/* Included Works */}
                <div>
                  <label className="block text-gray-200 mb-2 flex items-center">
                    <span>Included Works</span>
                    <i className="fas fa-info-circle ml-2 text-purple-400 text-sm"></i>
                  </label>
                  <div className="relative">
                    <select className="w-full bg-[#0A0A0F] border border-white/20 rounded-lg p-3 text-white appearance-none focus:border-purple-500 focus:outline-none transition-colors">
                      <option>Catalog Only</option>
                      <option>Catalog + New Releases</option>
                      <option>New Releases Only</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <i className="fas fa-chevron-down text-purple-400"></i>
                    </div>
                  </div>
                </div>
                
                {/* Percent of Income Paid Through */}
                <div>
                  <label className="block text-gray-200 mb-2 flex items-center">
                    <span>Percent of Income Paid Through Before Recoupment</span>
                    <i className="fas fa-info-circle ml-2 text-purple-400 text-sm"></i>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['0%', '10%', '20%', '30%', '40%', '50%'].map((percent, i) => (
                      <div
                        key={i}
                        className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
                          i === 0 ? 'bg-purple-600 text-white' : 'bg-[#0A0A0F] text-white border border-white/20 hover:border-purple-500'
                        }`}
                      >
                        {percent}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recoupment Rate */}
                <div>
                  <label className="block text-gray-200 mb-2 flex items-center">
                    <span>Recoupment Rate</span>
                    <i className="fas fa-info-circle ml-2 text-purple-400 text-sm"></i>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['90%', '80%', '70%', '60%', '50%'].map((percent, i) => (
                      <div
                        key={i}
                        className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
                          i === 2 ? 'bg-purple-600 text-white' : 'bg-[#0A0A0F] text-white border border-white/20 hover:border-purple-500'
                        }`}
                      >
                        {percent}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Post-Recoupment Term Length */}
                <div>
                  <label className="block text-gray-200 mb-2 flex items-center">
                    <span>Post-Recoupment Term Length</span>
                    <i className="fas fa-info-circle ml-2 text-purple-400 text-sm"></i>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['0 YEARS', '1 YEAR', '2 YEARS', '3 YEARS', '5 YEARS'].map((years, i) => (
                      <div
                        key={i}
                        className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
                          i === 0 ? 'bg-purple-600 text-white' : 'bg-[#0A0A0F] text-white border border-white/20 hover:border-purple-500'
                        }`}
                      >
                        {years}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Offer summary */}
            <div className="p-6 md:p-10 bg-[#0A0A0F]/70">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <span>Confirmed Offer Summary</span>
                <i className="fas fa-info-circle ml-2 text-purple-400 text-lg"></i>
              </h3>
              <p className="text-gray-400 mb-6">Valid through July 31, 2025</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Total Advance</span>
                  <span className="text-2xl font-bold text-white">$250,000</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Included Works</span>
                  <span className="text-white">Catalog Only</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300 flex items-center">
                    <span>Percent of Income Retained</span>
                    <i className="fas fa-info-circle ml-2 text-purple-400 text-sm"></i>
                  </span>
                  <span className="text-white">0%</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Recoupment Rate</span>
                  <span className="text-white">70%</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300 flex items-center">
                    <span>Post-Recoup Term</span>
                    <i className="fas fa-info-circle ml-2 text-purple-400 text-sm"></i>
                  </span>
                  <span className="text-white">0 Years</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Time to Recoup</span>
                  <span className="text-white">5-6 Years</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Distribution Fee</span>
                  <span className="text-white">0%</span>
                </div>
              </div>
              
              <button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all">
                SELECT DEAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;