import React, { useEffect } from 'react';
import './App.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import FallbackScroll from './Components/FallbackScroll';
import LandingPage from './Page/Landing';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App: React.FC = () => {
  // Add Font Awesome for icons
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/a076d05399.js';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="App">
      <FallbackScroll>
        <LandingPage />
      </FallbackScroll>
    </div>
  );
};

export default App;