// components/FallbackScroll.tsx
import React, { useEffect } from 'react';

interface FallbackScrollProps {
  children: React.ReactNode;
}

const FallbackScroll: React.FC<FallbackScrollProps> = ({ children }) => {
  useEffect(() => {
    // Simple scroll to hash on load with retry mechanism
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        } else {
          // Retry if element not found (may still be loading)
          setTimeout(scrollToHash, 100);
        }
      }
    };
    
    scrollToHash();
    
    // Handle anchor clicks with improved reliability
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && 
          (anchor.href.includes(window.location.pathname) || anchor.getAttribute('href')?.startsWith('#'))) {
        e.preventDefault();
        
        // Find the target element
        const elementId = anchor.hash.substring(1);
        const element = document.getElementById(elementId) || document.querySelector(anchor.hash);
        
        if (element) {
          // Close mobile menu if open
          const mobileMenu = document.querySelector('.mobile-menu[data-open="true"]');
          if (mobileMenu) {
            const closeButton = mobileMenu.querySelector('.mobile-close-button');
            if (closeButton) {
              (closeButton as HTMLElement).click();
            }
          }
          
          // Smooth scroll with a slight delay to allow any UI changes
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update URL without reload
            history.pushState(null, '', anchor.hash);
          }, 50);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  return <>{children}</>;
};

export default FallbackScroll;