import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const Shipping = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Shipping Details - AVIRA UDUPU</title>
        <meta name="description" content="Learn about our shipping policies, delivery times, and international shipping options at AVIRA UDUPU." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Shipping Details
            </h1>
            <p className="text-lg text-blue-100">
              Fast, secure, and reliable delivery worldwide
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Free Shipping Banner */}
          <div className="bg-gradient-to-r from-gold to-amber-400 rounded-xl p-8 text-center mb-12 shadow-xl">
            <Icon name="Package" size={48} className="text-white mx-auto mb-4" />
            <h2 className="text-3xl font-playfair font-bold text-white mb-2">
              FREE Shipping
            </h2>
            <p className="text-white text-lg">
              On all orders above ₹3,000
            </p>
          </div>

          {/* Domestic Shipping */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6 border-b-2 border-gold pb-2">
              Domestic Shipping (India)
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-royal-blue mb-4">Delivery Time</h3>
              <ul className="space-y-3 text-royal-blue">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span><strong>Metro Cities:</strong> 3-5 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span><strong>Other Cities:</strong> 5-7 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span><strong>Remote Areas:</strong> 7-10 business days</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-royal-blue mb-4">Shipping Charges</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-royal-blue">Order Value</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-royal-blue">Shipping Charge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-royal-blue">Below ₹3,000</td>
                      <td className="px-4 py-3 text-royal-blue">₹100</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 text-royal-blue font-semibold">₹3,000 and above</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6 border-b-2 border-gold pb-2">
              International Shipping
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-royal-blue mb-4">Delivery Time</h3>
              <ul className="space-y-3 text-royal-blue">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span><strong>USA, UK, Canada, Australia:</strong> 10-15 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span><strong>Middle East, Singapore:</strong> 7-12 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span><strong>Other Countries:</strong> 15-20 business days</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-royal-blue mb-4">Important Notes</h3>
              <ul className="space-y-3 text-royal-blue">
                <li className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <span>Shipping charges vary by destination and will be calculated at checkout</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <span>Customs duties and taxes (if any) are the responsibility of the recipient</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <span>Delivery times may vary due to customs clearance procedures</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Shipping Partners */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6 border-b-2 border-gold pb-2">
              Our Shipping Partners
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-royal-blue mb-4">
                We partner with leading courier services to ensure safe and timely delivery:
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="bg-slate-100 px-6 py-3 rounded-lg">
                  <span className="font-bold text-royal-blue">FedEx</span>
                </div>
                <div className="bg-slate-100 px-6 py-3 rounded-lg">
                  <span className="font-bold text-blue-600">Blue Dart</span>
                </div>
                <div className="bg-slate-100 px-6 py-3 rounded-lg">
                  <span className="font-bold text-red-600">Delhivery</span>
                </div>
              </div>
            </div>
          </section>

          {/* Order Tracking */}
          <section>
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6 border-b-2 border-gold pb-2">
              Order Tracking
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-royal-blue mb-4">
                Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order:
              </p>
              <ul className="space-y-3 text-royal-blue">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Through the tracking link in your email/SMS</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>In your Account Dashboard under "My Orders"</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>By contacting our customer support team</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Questions About Shipping?
            </h3>
            <p className="text-blue-100 mb-6">
              Our customer care team is ready to assist you
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

export default Shipping;
