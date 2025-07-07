import React, { useEffect } from 'react';
import './App.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import LandingPage from './Page/Landing';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App: React.FC = () => {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '.smooth-wrapper',
      content: '.smooth-content',
      smooth: 1.5, // Adjust the smoothness
      effects: true,
    });

    return () => {
      smoother.kill(); // Clean up on unmount
      ScrollTrigger.refresh(); // Refresh triggers if necessary
    };
  }, []);

  return (
    <div className="App smooth-wrapper">
      <div className="smooth-content">
        <LandingPage />
      </div>
    </div>
  );
};

export default App;