// Page/Landing.tsx
import React, { useRef, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Footer from '../Components/Footer';
import { gsap } from 'gsap';
import Mission from '../Components/Mission';
import Programs from '../Components/Programs';
import Impact from '../Components/Impact';
import Contact from '../Components/Contact';
import About from '../Components/About';
import Team from '../Components/Team';
import GetInvolved from '../Components/GetInvolved';
import Testimonials from '../Components/Testimonials';
import MusicTechShowcase from '../Components/MusicTechShowcase';
import FAQ from '../Components/Faq';

const LandingPage: React.FC = () => {
  const landingPageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Safari detection
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    const ctx = gsap.context(() => {
      // More Safari-friendly animation settings
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
        gsap.fromTo(
          section,
          { 
            opacity: 0,
            y: isSafari || isIOS ? 15 : 30 // Lower value for Safari
          },
          { 
            opacity: 1,
            y: 0,
            duration: isSafari || isIOS ? 0.6 : 0.8, // Faster for Safari
            scrollTrigger: {
              trigger: section,
              start: 'top 85%', // More generous trigger point
              toggleActions: 'play none none none',
              once: isSafari || isIOS, // Play only once on Safari to avoid stuttering
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            }
          }
        );
      });
    }, landingPageRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <div className="bg-black text-white" ref={landingPageRef}>
      <Navbar />
      
      {/* Section 1: Hero */}
      <div id="home">
        <Hero />
      </div>
      
      {/* Section 2: Mission */}
      <div id="mission" className="animate-section">
        <Mission />
      </div>
      
      {/* Rest of the components remain the same */}
      <div id="programs" className="animate-section">
        <Programs />
      </div>
      
      <div id="music-tech" className="animate-section">
        <MusicTechShowcase />
      </div>
      
      <div id="impact" className="animate-section">
        <Impact />
      </div>
      
      <div id="testimonials" className="animate-section">
        <Testimonials />
      </div>
      
      <div id="about" className="animate-section">
        <About />
      </div>
      
      <div id="team" className="animate-section">
        <Team />
      </div>
      
      <div id="faq" className="animate-section">
        <FAQ />
      </div>
      
      <div id="get-involved" className="animate-section">
        <GetInvolved />
      </div>
      
      <div id="contact" className="animate-section">
        <Contact />
      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;