import React, { useEffect, useRef } from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import HowItWorks from '../Components/HowItWorks';
import Features from '../Components/FeatureCard';
import Testimonials from '../Components/Testimonials';
import FAQ from '../Components/Faq';
import CTASection from '../Components/Cta';
import Footer from '../Components/Footer';
import { gsap } from 'gsap';

const LandingPage: React.FC = () => {
  const landingPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Basic fade-in animations for sections
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
        gsap.fromTo(
          section,
          { 
            opacity: 0,
            y: 50 
          },
          { 
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, landingPageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="App bg-black text-white" ref={landingPageRef}>
      <Navbar />
      
      <div id="home" className="section-spacer">
        <Hero />
      </div>
      
      <div id="how-it-works" className="animate-section">
        <HowItWorks />
      </div>
      
      <div id="features" className="animate-section">
        <Features />
      </div>
      
      <div id="testimonials" className="animate-section">
        <Testimonials />
      </div>
      
      <div id="faq" className="animate-section">
        <FAQ />
      </div>
      
      <div id="cta" className="animate-section">
        <CTASection />
      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;