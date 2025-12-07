import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Us - AVIRA UDUPU</title>
        <meta name="description" content="Get in touch with AVIRA UDUPU for any inquiries, support, or feedback." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-blue-100">
              We'd love to hear from you
            </p>
          </div>
        </div>

        {/* Contact Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-royal-blue mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-royal-blue mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-royal-blue mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-royal-blue mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-royal-blue mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-blue-900 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-900 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-playfair font-bold text-primary mb-6">
                Get In Touch
              </h2>
              
              <div className="space-y-8">
                {/* Office Address */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-royal-blue mb-2">Office Address</h3>
                      <p className="text-royal-blue">
                        AVIRA UDUPU<br />
                        Bangalore, Karnataka<br />
                        India - 560001
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-royal-blue mb-2">Phone Numbers</h3>
                      <div className="space-y-2">
                        <p className="text-royal-blue">
                          <strong>Toll Free:</strong> 1800 120 000 500
                        </p>
                        <p className="text-royal-blue">
                          <strong>Mobile:</strong> +91 96743 73838
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-royal-blue mb-2">Email Us</h3>
                      <p className="text-royal-blue">
                        <a href="mailto:care@aviraudupu.com" className="text-primary hover:underline">
                          care@aviraudupu.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-royal-blue mb-2">Business Hours</h3>
                      <div className="space-y-1">
                        <p className="text-royal-blue">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                        <p className="text-royal-blue">Sunday: 10:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-royal-blue mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://instagram.com/aviraudupu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      aria-label="Instagram"
                    >
                      <Icon name="Instagram" size={20} />
                    </a>
                    <a
                      href="https://facebook.com/aviraudupu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      aria-label="Facebook"
                    >
                      <Icon name="Facebook" size={20} />
                    </a>
                    <a
                      href="https://twitter.com/aviraudupu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      aria-label="Twitter"
                    >
                      <Icon name="Twitter" size={20} />
                    </a>
                    <a
                      href="https://pinterest.com/aviraudupu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      aria-label="Pinterest"
                    >
                      <Icon name="Pinterest" size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6 text-center">
              Our Location
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="MapPin" size={48} className="text-primary mx-auto mb-4" />
                  <p className="text-royal-blue">Interactive map would appear here</p>
                  <p className="text-sm text-royal-blue mt-2">(Placeholder for actual map integration)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-playfair font-bold mb-2">
              Chat With Us on WhatsApp
            </h3>
            <p className="text-green-100 mb-4">
              Get instant support from our team
            </p>
            <a
              href="https://wa.me/919845651468?text=Hello%20AVIRA%20UDUPU!%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-all duration-300"
            >
              <Icon name="MessageCircle" size={20} />
              Chat Now
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
