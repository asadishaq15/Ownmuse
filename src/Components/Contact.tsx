// Components/Contact.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const form = formRef.current;
    
    if (section && heading && form) {
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
        form,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: form,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="contact" 
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
            <span className="text-white">Contact </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Us</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Have Questions? Want to Get Involved? Reach out to our team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact information */}
          <div className="bg-[#1A1A2E]/50 backdrop-blur-sm p-8 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mr-4 flex-shrink-0">
                  <i className="fas fa-envelope text-lg"></i>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Email</h4>
                  <p className="text-gray-300">info@musicsciencegroup.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mr-4 flex-shrink-0">
                  <i className="fas fa-phone text-lg"></i>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Phone</h4>
                  <p className="text-gray-300">(916) 760-9950</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mr-4 flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-lg"></i>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Follow Us</h4>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                      <i className="fab fa-facebook-f text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                      <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                      <i className="fab fa-linkedin-in text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <form ref={formRef} className="bg-[#1A1A2E]/50 backdrop-blur-sm p-8 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-[#0A0A0F] border border-white/20 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-[#0A0A0F] border border-white/20 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-[#0A0A0F] border border-white/20 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;