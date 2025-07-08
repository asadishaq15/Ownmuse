// Components/Testimonials.tsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role }) => {
  return (
    <div className="bg-[#1A1A2E]/50 backdrop-blur-sm p-8 rounded-xl border border-white/10 h-full flex flex-col">
      <div className="flex-grow">
        <div className="text-4xl text-purple-400 mb-4">"</div>
        <p className="text-gray-300 text-lg italic mb-6">{quote}</p>
      </div>
      <div>
        <h4 className="text-white font-bold">{author}</h4>
        <p className="text-purple-400">{role}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const maxSlides = 3;
  
  // Testimonials data
  const testimonials = [
    {
      quote: "The Music Science program transformed my daughter's interest in technology. She went from being intimidated by computers to coding her own music in just a few weeks!",
      author: "Maria Johnson",
      role: "Parent"
    },
    {
      quote: "I never thought I'd be interested in engineering until I built my own digital instrument. Now I'm planning to study computer science in college.",
      author: "Jamal Williams",
      role: "Student, Age 16"
    },
    {
      quote: "The combination of music and technology creates a uniquely engaging environment for students. I've seen remarkable growth in both technical skills and confidence.",
      author: "Dr. Sarah Chen",
      role: "Education Researcher"
    },
    {
      quote: "As a school principal, I've seen many programs come and go, but the Music Science Group's approach has had a lasting impact on our students' engagement with STEM subjects.",
      author: "Robert Martinez",
      role: "School Principal"
    },
    {
      quote: "My son struggled with traditional learning approaches, but the musical component of this program helped him connect with technology in ways I never expected.",
      author: "David Thompson",
      role: "Parent"
    },
    {
      quote: "The creative approach to teaching technology concepts through music has opened doors for students who might otherwise never consider careers in STEM fields.",
      author: "Lisa Rodriguez",
      role: "Community Partner"
    }
  ];
  
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
    
    // Auto-advance slides
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % maxSlides);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Get current visible testimonials based on active slide
  const getVisibleTestimonials = () => {
    const startIndex = activeSlide * 2;
    return testimonials.slice(startIndex, startIndex + 2);
  };

  return (
    <section 
      id="testimonials" 
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
            <span className="text-white">What People </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Say</span>
          </h2>
        </div>
        
        <div className="relative">
          {/* Testimonial slider */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div key={index} className="h-full">
                <Testimonial
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                />
              </div>
            ))}
          </div>
          
          {/* Slider controls */}
          <div className="flex justify-center space-x-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeSlide === index 
                    ? 'bg-purple-500 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;