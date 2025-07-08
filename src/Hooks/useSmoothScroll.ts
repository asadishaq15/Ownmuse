// hooks/useSmoothScroll.ts

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollOptions {
  force?: boolean;
  disableOnMobile?: boolean;
  disableOnSafari?: boolean;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const { 
    force = false,
    disableOnMobile = true, 
    disableOnSafari = true 
  } = options;
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<any>(null);
  
  const [isSafari, setIsSafari] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Detect browser and device
    const ua = navigator.userAgent.toLowerCase();
    setIsSafari(/safari/.test(ua) && !/chrome/.test(ua));
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Determine if smooth scrolling should be enabled
    const shouldEnableSmooth = force || 
      !(disableOnMobile && isMobile) || 
      !(disableOnSafari && isSafari);
    
    // Apply different scroll settings based on environment
    if (shouldEnableSmooth) {
      // Create appropriate scroll settings
      const scrollSettings = {
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: isMobile ? 0.5 : (isSafari ? 0.6 : 0.8),
        effects: !isMobile,
        smoothTouch: false,
        normalizeScroll: false,
        ignoreMobileResize: true,
        ease: "power1.out",
        lazyRender: true,
      };
      
      // Initialize smoother with appropriate settings
      smootherRef.current = ScrollSmoother.create(scrollSettings);
      
      // Apply some browser-specific optimizations
      if (isSafari) {
        gsap.ticker.lagSmoothing(0, 16); // Different lag handling for Safari
        document.body.style.overscrollBehavior = 'none';
      } else {
        gsap.ticker.lagSmoothing(1000, 16);
      }
      
      // Performance optimizations
      ScrollTrigger.config({ 
        limitCallbacks: true,
        ignoreMobileResize: true,
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      });
    }
    
    // Enable native-like scrolling for touch devices
    if (isMobile || isSafari) {
      document.documentElement.style.setProperty('--scroll-behavior', 'auto');
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.documentElement.style.removeProperty('--scroll-behavior');
    };
  }, [force, disableOnMobile, disableOnSafari, isMobile, isSafari]);
  
  // Pause/resume controls for the smooth scroller
  const pauseScroll = () => {
    if (smootherRef.current) {
      smootherRef.current.paused(true);
    }
  };
  
  const resumeScroll = () => {
    if (smootherRef.current) {
      smootherRef.current.paused(false);
    }
  };
  
  return { 
    wrapperRef, 
    contentRef, 
    pauseScroll, 
    resumeScroll, 
    isSafari, 
    isMobile 
  };
};