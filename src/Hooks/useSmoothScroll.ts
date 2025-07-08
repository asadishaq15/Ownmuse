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
    disableOnMobile = false, // Changed to false to enable on mobile
    disableOnSafari = false  // Changed to false to enable on Safari
  } = options;
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<any>(null);
  
  const [isSafari, setIsSafari] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Detect browser and device
    const ua = navigator.userAgent.toLowerCase();
    const isSafariDetected = /safari/.test(ua) && !/chrome/.test(ua);
    setIsSafari(isSafariDetected);
    
    const checkMobile = () => {
      const isMobileDetected = window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDetected);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Cleanup existing ScrollTrigger instances to prevent duplicates
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Short delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      if (!wrapperRef.current || !contentRef.current) return;
      
      // Determine if smooth scrolling should be enabled
      const shouldEnableSmooth = force || 
        !(disableOnMobile && isMobile) || 
        !(disableOnSafari && isSafari);
      
      if (shouldEnableSmooth) {
        // Configure ScrollTrigger for better performance
        ScrollTrigger.config({ 
          limitCallbacks: true,
          ignoreMobileResize: false, // Changed to false to handle mobile orientation changes
          autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
        });
        
        // Different scroll settings based on environment
        const scrollSettings = {
          wrapper: wrapperRef.current,
          content: contentRef.current,
          smooth: isMobileDetected ? 0.5 : (isSafariDetected ? 0.5 : 0.8), // Reduced for Safari
          effects: true, // Enable effects on all devices
          smoothTouch: 0.1, // Very light smoothing for touch devices
          normalizeScroll: !isMobileDetected && !isSafariDetected, // Only use for desktop Chrome
          ignoreMobileResize: false,
          ease: "power2.out",
          preventDefault: false, // Don't prevent default scroll behavior
        };
        
        // Initialize smoother with appropriate settings
        smootherRef.current = ScrollSmoother.create(scrollSettings);
        
        // Apply some browser-specific optimizations
        if (isSafariDetected) {
          gsap.ticker.lagSmoothing(0); // Disable lag smoothing for Safari
        } else {
          gsap.ticker.lagSmoothing(1000, 16);
        }
        
        // Force refresh ScrollTrigger after initialization
        ScrollTrigger.refresh(true);
      }
    }, 200);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(initTimeout);
      
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [force, disableOnMobile, disableOnSafari]);
  
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
    isMobile,
    smoother: smootherRef.current
  };
};