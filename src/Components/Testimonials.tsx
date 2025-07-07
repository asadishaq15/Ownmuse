import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Updated testimonial data with real Pexels images
const testimonials = [
  {
    id: 1,
    quote: "OwnMuse helped me secure $60,000 in funding without giving up any rights to my music. The process was transparent and the funding arrived quickly. It made producing my latest album possible.",
    name: "Alex Rivera",
    title: "Independent Artist",
    imageUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5
  },
  {
    id: 2,
    quote: "As a label owner, I needed capital to sign new artists but didn't want to take on traditional investors. OwnMuse provided the perfect solution with flexible terms that aligned with our cash flow.",
    name: "Sophia Chen",
    title: "Independent Label Founder",
    imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5
  },
  {
    id: 3,
    quote: "The funding I received through OwnMuse was a game-changer for my marketing strategy. I could hire a PR team and promote my singles properly, which resulted in triple the streaming numbers.",
    name: "Marcus Johnson",
    title: "R&B Producer & Artist",
    imageUrl: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5
  },
  {
    id: 4,
    quote: "What impressed me most was how the OwnMuse team truly understood the music business. They offered valuable advice beyond just the funding, helping me optimize my release strategy.",
    name: "Elena Garcia",
    title: "Singer-Songwriter",
    imageUrl: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5
  },
  {
    id: 5,
    quote: "I've worked with other music funding platforms before, but OwnMuse offers the most artist-friendly terms by far. The customizable recoupment rates really made a difference for my cash flow.",
    name: "Thomas Wright",
    title: "Electronic Music Producer",
    imageUrl: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Handle testimonial navigation
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
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
    }
  }, []);
  
  // Animate testimonial change
  useEffect(() => {
    const testimonial = testimonialRef.current;
    
    if (testimonial) {
      gsap.fromTo(
        testimonial,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [activeIndex]);

  // Generate star rating component
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <i 
        key={i} 
        className={`fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
      ></i>
    ));
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-20 md:py-28 relative bg-gradient-to-b from-[#0A0A0F] to-[#131338]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-700/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair">
            <span className="text-white">What </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Artists</span>
            <span className="text-white"> Say</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Artists and labels share their experiences with OwnMuse funding.
          </p>
        </div>
        
        {/* Main testimonial */}
        <div 
          ref={testimonialRef}
          className="max-w-4xl mx-auto bg-[#1A1A2E]/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl shadow-purple-900/10"
        >
          <div className="flex flex-col items-center">
            <div className="mb-8">
              <i className="fas fa-quote-left text-5xl text-purple-500/30"></i>
            </div>
            
            <p className="text-xl md:text-2xl text-white text-center italic mb-8 leading-relaxed">
              "{testimonials[activeIndex].quote}"
            </p>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500 mb-4">
                <img 
                  src={testimonials[activeIndex].imageUrl} 
                  alt={testimonials[activeIndex].name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h4 className="text-xl font-bold text-white mb-1">{testimonials[activeIndex].name}</h4>
              <p className="text-purple-400 mb-3">{testimonials[activeIndex].title}</p>
              
              <div className="flex space-x-1 mb-6">
                {renderStars(testimonials[activeIndex].rating)}
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel navigation */}
        <div className="mt-8 flex justify-center items-center space-x-4" ref={carouselRef}>
          <button 
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full bg-[#1A1A2E] border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-purple-600' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
          
          <button 
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full bg-[#1A1A2E] border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        {/* Logos of partners/clients */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <p className="text-center text-gray-400 mb-8">Trusted by artists and labels across the industry</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {/* Replace with actual logos */}
            <div className="h-8 w-24 bg-white/20 rounded"></div>
            <div className="h-8 w-32 bg-white/20 rounded"></div>
            <div className="h-8 w-28 bg-white/20 rounded"></div>
            <div className="h-8 w-24 bg-white/20 rounded"></div>
            <div className="h-8 w-32 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;