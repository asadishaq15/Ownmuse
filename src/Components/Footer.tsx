// Components/Footer.tsx
import React from 'react';
import logo from '../assets/ownMuse.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0F] border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and info */}
          <div className="md:col-span-2">
            <img src={logo} alt="Music Science Group Logo" className="h-16 mb-4" />
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering kids through music and technology, creating opportunities for learning and growth in underserved communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="#mission" className="text-gray-400 hover:text-purple-400 transition-colors">Mission</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-purple-400 transition-colors">Programs</a></li>
              <li><a href="#impact" className="text-gray-400 hover:text-purple-400 transition-colors">Impact</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">About</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-envelope text-purple-400 mt-1.5 mr-2"></i>
                <span className="text-gray-400">info@musicsciencegroup.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone text-purple-400 mt-1.5 mr-2"></i>
                <span className="text-gray-400">(916) 760-9950</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Music Science Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;