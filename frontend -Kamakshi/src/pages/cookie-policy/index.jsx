import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Cookie Policy - AVIRA UDUPU</title>
        <meta name="description" content="Learn how AVIRA UDUPU uses cookies and similar tracking technologies on our website." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Cookie Policy
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
              This Cookie Policy explains how AVIRA UDUPU ("we," "us," or "our") uses cookies and similar 
              technologies to recognize you when you visit our website. It explains what these technologies 
              are and why we use them, as well as your rights to control our use of them.
            </p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                What Are Cookies?
              </h2>
              <p className="text-royal-blue">
                Cookies are small data files that are placed on your computer or mobile device when you visit 
                a website. Cookies are widely used by website owners in order to make their websites work, 
                or to work more efficiently, as well as to provide reporting information.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                Why Do We Use Cookies?
              </h2>
              <p className="text-royal-blue mb-4">
                We use cookies for several reasons:
              </p>
              <ul className="list-disc pl-6 text-royal-blue">
                <li>To enable certain functions of our website</li>
                <li>To provide analytics and understand how visitors interact with our site</li>
                <li>To store your preferences and settings</li>
                <li>To improve your browsing experience</li>
                <li>To personalize content and advertisements</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                Types of Cookies We Use
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-royal-blue mb-2">Essential Cookies</h3>
                  <p className="text-royal-blue">
                    These cookies are essential for the website to function properly. They enable basic 
                    functions like page navigation and access to secure areas of the website.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-royal-blue mb-2">Performance Cookies</h3>
                  <p className="text-royal-blue">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. This helps us improve how the website works.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-royal-blue mb-2">Functionality Cookies</h3>
                  <p className="text-royal-blue">
                    These cookies enable the website to provide enhanced functionality and personalization. 
                    They may be set by us or by third party providers whose services we have added to our pages.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-royal-blue mb-2">Targeting Cookies</h3>
                  <p className="text-royal-blue">
                    These cookies may be set through our site by our advertising partners. They may be 
                    used by those companies to build a profile of your interests and show you relevant 
                    advertisements on other sites.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                How Can You Control Cookies?
              </h2>
              <p className="text-royal-blue mb-4">
                You have the right to decide whether to accept or reject cookies. You can set or amend 
                your web browser controls to accept or refuse cookies.
              </p>
              <p className="text-royal-blue">
                If you choose to reject cookies, you may still use our website though your access to some 
                functionality and areas of our website may be restricted.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                Analytics Cookies
              </h2>
              <p className="text-royal-blue mb-4">
                We use Google Analytics to help us understand how our customers use the site. These cookies 
                collect information in the aggregate to give us insight into how our website is being used.
              </p>
              <p className="text-royal-blue">
                For more information on Google's privacy practices, please visit: 
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline ml-1">
                  https://policies.google.com/privacy
                </a>
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                Updates to This Cookie Policy
              </h2>
              <p className="text-royal-blue">
                We may update this Cookie Policy from time to time in order to reflect, for example, 
                changes to the cookies we use or for other operational, legal or regulatory reasons. 
                Please therefore revisit this page regularly to stay informed about our use of cookies 
                and related technologies.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
                Contact Us
              </h2>
              <p className="text-royal-blue mb-4">
                If you have any questions about our use of cookies or other technologies, please contact us at:
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
              Questions About Our Cookie Policy?
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

export default CookiePolicy;
