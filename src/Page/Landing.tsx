import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import HowItWorks from '../Components/HowItWorks';
import Features from '../Components/FeatureCard';
import Testimonials from '../Components/Testimonials';
import FAQ from '../Components/Faq';
import CTASection from '../Components/Cta';
import Footer from '../Components/Footer';

// Import components


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const LandingPage: React.FC = () => {
  const smoothWrapper = useRef<HTMLDivElement>(null);
  const smoothContent = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create smooth scrolling experience
    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapper.current,
      content: smoothContent.current,
      smooth: 1.2,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });
    
    // Clean up
    return () => {
      if (smoother) smoother.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div ref={smoothWrapper} className="overflow-hidden">
      <div ref={smoothContent}>
        <Navbar />
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <FAQ />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;