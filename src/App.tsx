// App.tsx
import React, { useEffect } from 'react';
import './App.css';
import LandingPage from './Page/Landing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App: React.FC = () => {
  // Setup smooth scrolling with Safari-optimized configuration
  useEffect(() => {
    // Safari detection
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: isSafari || isIOS ? 0.8 : 1.5, // Lower value for Safari/iOS
      effects: true,
      normalizeScroll: !isIOS, // Disable on iOS as it can cause issues
      ignoreMobileResize: true,
      smoothTouch: 0.1, // Gentler touch scrolling
    });

    // Additional Safari/iOS optimization
    if (isSafari || isIOS) {
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
      });
    }

    return () => {
      // Cleanup
      if (smoother) smoother.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="overflow-hidden">
      <div id="smooth-content">
        <LandingPage />
      </div>
    </div>
  );
};

export default App;