import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import musicIcon from '../assets/mission.jpg';

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (section && heading && content && image) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        heading,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          content.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
          '-=0.4'
        )
        .fromTo(
          image,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=0.6'
        );
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 relative bg-gradient-to-b from-[#0A0A0F] to-[#131338]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-700/10 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-indigo-600/10 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
              Story
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              Musical Instruments N Kids Hands was founded by a passionate group
              of educators and musicians who believed every child deserves
              access to creative and technological opportunities.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Recognizing the power of music and technology to empower youth,
              our organization merged these two worlds, providing underserved
              communities with the tools and knowledge they need to thrive.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our journey began with a simple vision: to create a space where
              technology and music could combine to inspire the next generation
              of innovators and creative thinkers.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Today, we continue to evolve our programs to meet the changing
              needs of students in an increasingly digital world, while staying
              true to our core mission of empowering kids through the universal
              language of music.
            </p>
          </div>
          
          <div ref={imageRef} className="relative h-full">
            <div className="rounded-xl overflow-hidden shadow-2xl shadow-purple-600/20 border border-purple-500/10 h-full">
              <div className="relative w-full h-full min-h-[400px]">
                <img
                  src={musicIcon}
                  alt="Children engaging with music and technology"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131338]/80 to-transparent rounded-xl"></div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-600 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;