import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy - AVIRA UDUPU</title>
        <meta name="description" content="Learn how AVIRA UDUPU collects, uses, and protects your personal information." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Privacy Policy
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
              AVIRA UDUPU is committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website or make a purchase.
            </p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                1. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold text-royal-blue mb-3">Personal Information</h3>
              <p className="text-royal-blue mb-4">
                We collect personal information that you voluntarily provide to us when you register on our site, 
                place an order, subscribe to our newsletter, or contact us. This may include:
              </p>
              <ul className="list-disc pl-6 text-royal-blue mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Shipping address</li>
                <li>Billing address</li>
                <li>Payment information</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-royal-blue mb-3">Automatically Collected Information</h3>
              <p className="text-royal-blue">
                When you visit our website, we automatically collect certain information about your device, 
                including information about your web browser, IP address, time zone, and some of the cookies 
                installed on your device.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-royal-blue mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-royal-blue">
                <li>Process your orders and manage your account</li>
                <li>Communicate with you about your orders and account</li>
                <li>Send you marketing and promotional communications (with your consent)</li>
                <li>Improve our website and customer service</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                3. Sharing Your Information
              </h2>
              <p className="text-royal-blue mb-4">
                We may share your information with third parties in the following situations:
              </p>
              <ul className="list-disc pl-6 text-royal-blue">
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate our business</li>
                <li><strong>Shipping Companies:</strong> To deliver your purchases</li>
                <li><strong>Payment Processors:</strong> To process your payments</li>
                <li><strong>Legal Compliance:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="text-royal-blue mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store 
                certain information. You can instruct your browser to refuse all cookies or to indicate when 
                a cookie is being sent.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                5. Data Security
              </h2>
              <p className="text-royal-blue">
                We implement appropriate technical and organizational security measures to protect the security 
                of your personal information. However, no method of transmission over the Internet or electronic 
                storage is 100% secure.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                6. Your Rights
              </h2>
              <p className="text-royal-blue mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-royal-blue">
                <li>The right to access, update, or delete your information</li>
                <li>The right to data portability</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to withdraw consent</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                7. Data Retention
              </h2>
              <p className="text-royal-blue">
                We retain your personal information for as long as necessary to fulfill the purposes outlined 
                in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                8. Contact Us
              </h2>
              <p className="text-royal-blue mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
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
              Questions About Your Privacy?
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

export default Privacy;
