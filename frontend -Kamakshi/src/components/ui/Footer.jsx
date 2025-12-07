import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [selectedCountry, setSelectedCountry] = useState('INDIA ₹');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Country/Currency options
  const countries = [
    { name: 'UNITED STATES $', code: 'US', currency: 'USD' },
    { name: 'UNITED KINGDOM £', code: 'UK', currency: 'GBP' },
    { name: 'REST OF THE WORLD $', code: 'WORLD', currency: 'USD' },
    { name: 'AUSTRALIA A$', code: 'AU', currency: 'AUD' },
    { name: 'CANADA C$', code: 'CA', currency: 'CAD' },
    { name: 'UNITED ARAB EMIRATES د.إ', code: 'AE', currency: 'AED' },
    { name: 'INDIA ₹', code: 'IN', currency: 'INR' }
  ];

  // Trust Badges Section
  const trustBadges = [
    {
      icon: 'MapPin',
      title: 'PROUDLY MADE IN INDIA',
      description: 'Authentic Indian Craftsmanship'
    },
    {
      icon: 'Users',
      title: 'TRUSTED BY 10,000+ CUSTOMERS',
      description: 'Verified Customer Reviews'
    },
    {
      icon: 'Award',
      title: 'AUTHENTIC HANDPICKED FABRICS',
      description: 'Premium Quality Guaranteed'
    },
    {
      icon: 'Phone',
      title: 'WHATSAPP SUPPORT',
      description: 'Quick Customer Service'
    },
    {
      icon: 'Package',
      title: 'FREE SHIPPING',
      description: 'On orders above ₹3,000'
    }
  ];

  // Footer Links organized by columns
  const footerSections = {
    categories: {
      title: 'CATEGORIES',
      links: [
        { name: 'Kanjivaram Classics', path: '/product-collection-grid?category=kanjivaram-classics' },
        { name: 'Banarasi Weaves', path: '/product-collection-grid?category=banarasi-weaves' },
        { name: 'Soft Silk Elegance', path: '/product-collection-grid?category=soft-silk-elegance' },
        { name: 'Zari Heritage Sarees', path: '/product-collection-grid?category=zari-heritage' },
        { name: 'Wedding Grandeur Sarees', path: '/product-collection-grid?category=wedding-grandeur' },
        { name: 'Signature Handwoven Collection', path: '/product-collection-grid?category=signature-handwoven' }
      ]
    },
    quickLinks: {
      title: 'QUICK LINKS',
      links: [
        { name: 'About Us', path: '/about-us' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'Video Call', path: '/video-call' }
      ]
    },
    support: {
      title: 'SUPPORT',
      links: [
        { name: 'Track Order', path: '/user-account-dashboard?section=orders' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'My Account', path: '/user-account-dashboard' }
      ]
    },
    policies: {
      title: 'OUR POLICIES',
      links: [
        { name: 'FAQs', path: '/faq' },
        { name: 'Shipping Details', path: '/shipping' },
        { name: 'Return, Exchange and Refund Policy', path: '/return-policy' },
        { name: 'Terms of Use', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Cookie Policy', path: '/cookie-policy' }
      ]
    },
    customerCare: {
      title: 'CUSTOMER CARE',
      contacts: [
        { icon: 'Phone', text: '6362454920', type: 'phone' },
        { icon: 'Mail', text: 'info@aviraudupu.com', type: 'email' }
      ]
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
      {/* Trust Badges Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 flex items-center justify-center text-royal-blue group-hover:text-gold transition-colors duration-300">
                    <Icon name={badge.icon} size={32} />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-royal-blue uppercase tracking-wide mb-1">
                  {badge.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gradient-to-br from-royal-blue via-blue-900 to-royal-blue text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Categories Column */}
            <div>
              <h3 className="text-sm font-bold text-gold uppercase tracking-wider mb-4 border-b border-gold/30 pb-2">
                {footerSections.categories.title}
              </h3>
              <ul className="space-y-2">
                {footerSections.categories.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-xs text-blue-100 hover:text-gold transition-colors duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-sm font-bold text-gold uppercase tracking-wider mb-4 border-b border-gold/30 pb-2">
                {footerSections.quickLinks.title}
              </h3>
              <ul className="space-y-2">
                {footerSections.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-xs text-blue-100 hover:text-gold transition-colors duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="text-sm font-bold text-gold uppercase tracking-wider mb-4 border-b border-gold/30 pb-2">
                {footerSections.support.title}
              </h3>
              <ul className="space-y-2">
                {footerSections.support.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-xs text-blue-100 hover:text-gold transition-colors duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies Column */}
            <div>
              <h3 className="text-sm font-bold text-gold uppercase tracking-wider mb-4 border-b border-gold/30 pb-2">
                {footerSections.policies.title}
              </h3>
              <ul className="space-y-2">
                {footerSections.policies.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-xs text-blue-100 hover:text-gold transition-colors duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Care Column */}
            <div>
              <h3 className="text-sm font-bold text-gold uppercase tracking-wider mb-4 border-b border-gold/30 pb-2">
                {footerSections.customerCare.title}
              </h3>
              <div className="space-y-3">
                {footerSections.customerCare.contacts.map((contact, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon name={contact.icon} size={14} className="text-gold mt-0.5 flex-shrink-0" />
                    {contact.type === 'phone' ? (
                      <a
                        href={`tel:${contact.text.replace(/\s/g, '')}`}
                        className="text-xs text-blue-100 hover:text-gold transition-colors duration-200"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <a
                        href={`mailto:${contact.text}`}
                        className="text-xs text-blue-100 hover:text-gold transition-colors duration-200 break-all"
                      >
                        {contact.text}
                      </a>
                    )}
                  </div>
                ))}
                
                {/* Social Media & Keep in Touch */}
                <div className="mt-4 pt-4 border-t border-gold/20">
                  <h4 className="text-xs font-bold text-gold uppercase mb-3">KEEP IN TOUCH</h4>
                  <div className="flex space-x-2">
                    <a
                      href="https://twitter.com/aviraudupu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-royal-blue transition-all duration-300"
                      aria-label="Twitter"
                    >
                      <Icon name="Twitter" size={14} />
                    </a>
                    <a
                      href="https://facebook.com/aviraudupu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-royal-blue transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <Icon name="Facebook" size={14} />
                    </a>
                    <a
                      href="https://instagram.com/aviraudupu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-royal-blue transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <Icon name="Instagram" size={14} />
                    </a>
                    <a
                      href="https://youtube.com/@aviraudupu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-royal-blue transition-all duration-300"
                      aria-label="YouTube"
                    >
                      <Icon name="Youtube" size={14} />
                    </a>
                    <a
                      href="https://pinterest.com/aviraudupu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-royal-blue transition-all duration-300"
                      aria-label="Pinterest"
                    >
                      <Icon name="Menu" size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar with Shipping Partners and Payment Methods */}
        <div className="border-t border-gold/30 bg-royal-blue">
          <div className="container mx-auto px-4 py-6">
            {/* Country Selector, Shipping Partners, Copyright, Payment Methods */}
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4">
              {/* Left: Country Selector */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded border border-gold/50 transition-all duration-200 text-sm font-medium"
                  >
                    <span>{selectedCountry}</span>
                    <Icon name={isCountryDropdownOpen ? "ChevronUp" : "ChevronDown"} size={14} />
                  </button>
                  
                  {/* Country Dropdown */}
                  {isCountryDropdownOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
                      {countries.map((country, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedCountry(country.name);
                            setIsCountryDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            selectedCountry === country.name
                              ? 'bg-royal-blue text-white'
                              : 'text-royal-blue hover:bg-blue-50'
                          }`}
                        >
                          {country.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Shipping Partners */}
                <div className="hidden md:flex items-center space-x-3 pl-4 border-l border-gold/50">
                  <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded shadow">
                    <span className="text-xs font-bold text-royal-blue">FedEx</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded shadow">
                    <span className="text-xs font-bold text-blue-600">Blue Dart</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded shadow">
                    <span className="text-xs font-bold text-red-600">Delhivery</span>
                  </div>
                </div>
              </div>

              {/* Center: Copyright */}
              <div className="text-center">
                <p className="text-sm text-white font-medium">
                  © {currentYear} AVIRA UDUPU. All rights reserved.
                </p>
              </div>

              {/* Right: Payment Methods */}
              <div className="flex flex-col items-center lg:items-end space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={14} className="text-gold" />
                  <span className="text-sm text-white font-semibold">100% Secure Payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Payment Method Icons */}
                  <div className="w-10 h-6 bg-white rounded flex items-center justify-center shadow">
                    <span className="text-[10px] font-bold text-blue-800">VISA</span>
                  </div>
                  <div className="w-10 h-6 bg-white rounded flex items-center justify-center shadow">
                    <span className="text-[10px] font-bold text-red-600">MC</span>
                  </div>
                  <div className="w-10 h-6 bg-white rounded flex items-center justify-center shadow">
                    <span className="text-[10px] font-bold text-blue-600">AMEX</span>
                  </div>
                  <div className="w-10 h-6 bg-white rounded flex items-center justify-center shadow">
                    <span className="text-[10px] font-bold text-green-600">UPI</span>
                  </div>
                  <div className="w-10 h-6 bg-white rounded flex items-center justify-center shadow">
                    <span className="text-[10px] font-bold text-royal-blue">GPay</span>
                  </div>
                  <div className="w-10 h-6 bg-white rounded flex items-center justify-center shadow">
                    <span className="text-[10px] font-bold text-purple-600">PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919845651468?text=Hello%20AVIRA%20UDUPU!%20I'm%20interested%20in%20your%20sarees."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          {/* WhatsApp Icon */}
          <div className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce-slow">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
              Chat with us on WhatsApp
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </a>
    </footer>
  );
};

export default Footer;
