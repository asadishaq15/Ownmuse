import React, { useState, useEffect } from 'react';
import logo from '../assets/ownMuse.png';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0A0A0F]/95 backdrop-blur-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo - Updated with responsive sizing */}
          <a href="#" className="flex items-center">
            <img 
              src={logo} 
              alt="OwnMuse Logo" 
              className="h-20 md:h-32 lg:h-44 transition-all duration-300"
              style={{ maxHeight: isScrolled ? '36px' : '' }}  
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-purple-400 transition-colors font-medium">Home</a>
            <a href="#how-it-works" className="text-white hover:text-purple-400 transition-colors font-medium">How It Works</a>
            <a href="#features" className="text-white hover:text-purple-400 transition-colors font-medium">Features</a>
            <a href="#testimonials" className="text-white hover:text-purple-400 transition-colors font-medium">Testimonials</a>
            <a href="#faq" className="text-white hover:text-purple-400 transition-colors font-medium">FAQ</a>
            <a href="#" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors">
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-[#0A0A0F]/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <a href="#home" className="text-white hover:text-purple-400 transition-colors font-medium py-2"
             onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#how-it-works" className="text-white hover:text-purple-400 transition-colors font-medium py-2"
             onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#features" className="text-white hover:text-purple-400 transition-colors font-medium py-2"
             onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#testimonials" className="text-white hover:text-purple-400 transition-colors font-medium py-2"
             onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <a href="#faq" className="text-white hover:text-purple-400 transition-colors font-medium py-2"
             onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <a href="#" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors text-center">
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;