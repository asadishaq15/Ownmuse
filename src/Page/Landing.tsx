import React from 'react';

import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import HowItWorks from '../Components/HowItWorks';
import Features from '../Components/FeatureCard';
import Testimonials from '../Components/Testimonials';
import FAQ from '../Components/Faq';
import CTASection from '../Components/Cta';
import Footer from '../Components/Footer';
import { useSmoothScroll } from '../Hooks/useSmoothScroll';

const LandingPage: React.FC = () => {
  const { wrapperRef, contentRef, isSafari } = useSmoothScroll({
    disableOnMobile: true,
    disableOnSafari: true // Set to false if you want to try smooth scrolling on Safari
  });
  
  return (
    <div 
      ref={wrapperRef} 
      className="smooth-wrapper overflow-hidden"
      style={{ 
        position: 'relative',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div 
        ref={contentRef} 
        className="smooth-content"
        style={{
          willChange: isSafari ? 'auto' : 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
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