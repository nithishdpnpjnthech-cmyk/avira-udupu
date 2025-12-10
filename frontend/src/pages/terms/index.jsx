import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Use - AVIRA UDUPU</title>
        <meta name="description" content="Read the terms and conditions governing the use of AVIRA UDUPU website and services." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Terms of Use
            </h1>
            <p className="text-lg text-blue-100">
              Last updated: December 4, 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-royal-blue mb-6">
              Welcome to AVIRA UDUPU. These Terms of Use govern your access to and use of our website, 
              products, and services. By accessing or using our website, you agree to be bound by these Terms.
            </p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                1. Use of Our Services
              </h2>
              <p className="text-royal-blue mb-4">
                You may use our services only as permitted by law. You must be at least 18 years old to 
                purchase products from our website or use our services. You are responsible for maintaining 
                the confidentiality of your account and password.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                2. Intellectual Property
              </h2>
              <p className="text-royal-blue mb-4">
                All content on this website, including text, graphics, logos, images, and software, is the 
                property of AVIRA UDUPU or its licensors and is protected by copyright and other intellectual 
                property laws. You may not reproduce, distribute, or create derivative works without our express 
                written permission.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                3. Product Information
              </h2>
              <p className="text-royal-blue mb-4">
                While we strive to provide accurate product information, we do not warrant that product 
                descriptions, prices, or other content are accurate, complete, reliable, current, or error-free. 
                In the event of an error, we reserve the right to correct it and revise your order accordingly.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                4. Pricing and Availability
              </h2>
              <p className="text-royal-blue mb-4">
                All prices are in Indian Rupees (INR) and are subject to change without notice. We reserve 
                the right to modify or discontinue products or services at any time without prior notice. 
                We are not liable for any modification, suspension, or discontinuation of our services.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                5. Limitation of Liability
              </h2>
              <p className="text-royal-blue mb-4">
                AVIRA UDUPU shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages, including without limitation, loss of profits, data, use, goodwill, or 
                other intangible losses, resulting from your access to or use of or inability to access or 
                use the service.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                6. Governing Law
              </h2>
              <p className="text-royal-blue mb-4">
                These Terms shall be governed and construed in accordance with the laws of India, without 
                regard to its conflict of law provisions. Our failure to enforce any right or provision of 
                these Terms will not be considered a waiver of those rights.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                7. Changes to Terms
              </h2>
              <p className="text-royal-blue mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days' notice prior to any new terms 
                taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                8. Contact Us
              </h2>
              <p className="text-royal-blue mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="text-royal-blue">
                <p><strong>Email:</strong> care@aviraudupu.com</p>
                <p><strong>Phone:</strong> +91 9674373838</p>
                <p><strong>Address:</strong> AVIRA UDUPU, Bangalore, Karnataka, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-blue-100 mb-6">
              Our customer care team is here to assist you
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-gold text-royal-blue font-semibold rounded-lg hover:bg-gold/90 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
