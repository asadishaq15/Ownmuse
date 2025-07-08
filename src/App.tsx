import React, { useEffect } from 'react';
import './App.css';
import LandingPage from './Page/Landing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App: React.FC = () => {
  useEffect(() => {
    // Add Font Awesome for icons
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/a076d05399.js';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
    
    // Simple detection for browser/device to adjust settings
    const isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Create scroll smoother with appropriate settings based on browser/device
    let smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: isMobile ? 0.5 : (isSafari ? 0.8 : 1.2),
      effects: !isMobile,
      normalizeScroll: !isSafari, // Disable on Safari for better performance
      ignoreMobileResize: true,
      smoothTouch: 0.1, // Light touch smoothing
    });
    
    // Optimize performance for different browsers
    if (isSafari) {
      gsap.ticker.lagSmoothing(0);
    } else {
      gsap.ticker.lagSmoothing(1000, 16);
    }
    
    // Set up scroll trigger defaults
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    return () => {
      // Clean up
      if (smoother) smoother.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <LandingPage />
      </div>
    </div>
  );
};

export default App;