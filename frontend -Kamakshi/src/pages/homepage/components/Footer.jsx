import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  return (
    <footer className="footer-container relative">
      {/* Newsletter Section */}
      <div className="border-b border-gold/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-serif font-bold mb-4 text-white fade-in-up">
              Stay Updated with Our Latest Collections
            </h3>
            <p className="text-gold/90 font-serif mb-8 max-w-2xl mx-auto text-lg fade-in-up" style={{animationDelay: '0.1s'}}>
              Be the first to know about new arrivals, exclusive offers, and styling tips from our saree experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto fade-in-up" style={{animationDelay: '0.2s'}}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg bg-white text-royal-blue font-serif placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300"
              />
              <button className="premium-gradient text-royal-blue font-serif font-bold px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 hover-lift">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gold/70 mt-4">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Story */}
          <div className="lg:col-span-1 fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/assets/images/logo.jpeg" 
                alt="AVIRA UDUPU Logo" 
                className="w-24 h-24 object-contain hover-lift transition-transform duration-300"
              />
            </div>
            <p className="text-gold/90 font-serif text-sm leading-relaxed mb-6 text-center">
              Celebrating the timeless elegance of Indian sarees with premium quality fabrics, 
              exquisite craftsmanship, and designs that honor tradition while embracing modernity.
            </p>
            <div className="flex space-x-4 justify-center">
              <a href="#" className="w-11 h-11 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold/40 transition-all duration-300 hover-lift text-gold hover:text-gold/80">
                <Icon name="Facebook" size={18} />
              </a>
              <a href="#" className="w-11 h-11 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold/40 transition-all duration-300 hover-lift text-gold hover:text-gold/80">
                <Icon name="Instagram" size={18} />
              </a>
              <a href="#" className="w-11 h-11 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold/40 transition-all duration-300 hover-lift text-gold hover:text-gold/80">
                <Icon name="Twitter" size={18} />
              </a>
              <a href="#" className="w-11 h-11 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold/40 transition-all duration-300 hover-lift text-gold hover:text-gold/80">
                <Icon name="Youtube" size={18} />
              </a>
            </div>
          </div>

          {/* Collection Links */}
          <div className="slide-in-left">
            <h4 className="text-lg font-serif font-bold mb-6 text-gold border-b-2 border-gold/30 pb-3">Collections</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/product-collection-grid?category=new-arrivals" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/product-collection-grid?fabric=silk" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  Silk Sarees
                </Link>
              </li>
              <li>
                <Link to="/product-collection-grid?category=bridal" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  Bridal Collection
                </Link>
              </li>
              <li>
                <Link to="/product-collection-grid?category=designer" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  Designer Sarees
                </Link>
              </li>
              <li>
                <Link to="/product-collection-grid?fabric=cotton" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  Cotton Sarees
                </Link>
              </li>
              <li>
                <Link to="/product-collection-grid?category=trending" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  🔥 Trending Sarees
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="slide-in-right">
            <h4 className="text-lg font-serif font-bold mb-6 text-gold border-b-2 border-gold/30 pb-3">Customer Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping-info" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/care-instructions" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  Care Instructions
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif hover-gold">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="fade-in-up" style={{animationDelay: '0.3s'}}>
            <h4 className="text-lg font-serif font-bold mb-6 text-gold border-b-2 border-gold/30 pb-3">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <Icon name="MapPin" size={18} className="text-gold mt-1 flex-shrink-0 group-hover:text-gold/80 transition-colors" />
                <div>
                  <p className="text-gold/80 font-serif text-sm group-hover:text-gold transition-colors">
                    123 Saree Street, Fashion District<br />
                    Bangalore, Karnataka 560001<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <Icon name="Phone" size={18} className="text-gold flex-shrink-0 group-hover:text-gold/80 transition-colors" />
                <div>
                  <a href="tel:+919876543210" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif text-sm font-semibold">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <Icon name="Mail" size={18} className="text-gold flex-shrink-0 group-hover:text-gold/80 transition-colors" />
                <div>
                  <a href="mailto:info@rootstraditional.com" className="text-gold/80 hover:text-gold transition-colors duration-300 font-serif text-sm font-semibold break-all">
                    info@rootstraditional.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <Icon name="Clock" size={18} className="text-gold flex-shrink-0 group-hover:text-gold/80 transition-colors" />
                <div>
                  <p className="text-gold/80 font-serif text-sm group-hover:text-gold transition-colors">
                    Mon - Sat: 10:00 AM - 8:00 PM<br />
                    Sunday: 11:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-blue-200 font-serif text-sm">
                © 2024 Roots Traditional. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-blue-200 hover:text-primary transition-colors duration-300 font-serif">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-blue-200 hover:text-primary transition-colors duration-300 font-serif">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-blue-200 hover:text-primary transition-colors duration-300 font-serif">
                Cookie Policy
              </Link>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-blue-200 font-serif text-sm mb-2">Secure Payment Methods:</p>
                <div className="flex space-x-3">
                  <div className="w-10 h-6 bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">VISA</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">MC</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">UPI</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">GPay</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-blue-200 font-serif text-sm">
                  Crafted with ❤️ for saree lovers worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
