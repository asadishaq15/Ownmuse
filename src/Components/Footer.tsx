import React from 'react';
import logo from '../assets/ownMuse.png'; // You'll need to create this asset

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0F] pt-16 pb-6 border-t border-white/10">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center mb-6">
              <img src={logo} alt="OwnMuse Logo" className="h-48" />
            </div>
            <p className="text-gray-400 mb-6">
              Empowering music creators with artist-friendly funding solutions that preserve independence and creative control.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-purple-400 transition-colors">How It Works</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">Features</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-purple-400 transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-purple-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Artist Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Support Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Partner Program</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-envelope text-purple-400 mt-1 mr-3"></i>
                <span className="text-gray-400">support@ownmuse.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone text-purple-400 mt-1 mr-3"></i>
                <span className="text-gray-400">+1 (800) 555-0123</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-purple-400 mt-1 mr-3"></i>
                <span className="text-gray-400">123 Music Ave, Suite 456<br />Nashville, TN 37203</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 pb-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Subscribe to our newsletter for the latest updates and offers.</p>
            </div>
            <div>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 bg-[#1A1A2E] border border-white/10 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-r-lg hover:from-purple-700 hover:to-indigo-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 OwnMuse. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;