import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Return, Exchange & Refund Policy - AVIRA UDUPU</title>
        <meta name="description" content="Learn about our hassle-free return, exchange, and refund policy at AVIRA UDUPU." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Return, Exchange & Refund Policy
            </h1>
            <p className="text-lg text-blue-100">
              Your satisfaction is our priority
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* 7-Day Policy Banner */}
          <div className="bg-gradient-to-r from-gold to-amber-400 rounded-xl p-8 text-center mb-12 shadow-xl">
            <h2 className="text-3xl font-playfair font-bold text-white mb-2">
              7-Day Return Policy
            </h2>
            <p className="text-white text-lg">
              Easy returns and exchanges within 7 days of delivery
            </p>
          </div>

          {/* Return Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6 border-b-2 border-gold pb-2">
              Return Policy
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-royal-blue mb-4">Eligibility Criteria</h3>
              <ul className="space-y-3 text-royal-blue">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Return request must be initiated within 7 days of delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Product must be unused, unwashed, and in original condition</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>All original tags, labels, and packaging must be intact</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Invoice/receipt must be provided</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Saree should not have any stains, odor, or damage</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-royal-blue mb-4">Non-Returnable Items</h3>
              <ul className="space-y-3 text-royal-blue">
                <li className="flex items-start gap-3">
                  <Icon name="X" size={20} className="text-red-500 mt-1 flex-shrink-0" />
                  <span>Products marked as "Final Sale" or "Clearance"</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="X" size={20} className="text-red-500 mt-1 flex-shrink-0" />
                  <span>Custom-made or personalized sarees</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="X" size={20} className="text-red-500 mt-1 flex-shrink-0" />
                  <span>Products purchased during special sales (unless defective)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Exchange Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6 border-b-2 border-gold pb-2">
              Exchange Policy
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-royal-blue mb-4">
                We offer exchanges for products of equal or higher value within 7 days of delivery.
              </p>
              <ul className="space-y-3 text-royal-blue">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Exchange is subject to product availability</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>If exchanging for a higher-value item, pay the difference</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Original shipping charges are non-refundable</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Same eligibility criteria as returns apply</span>
                </li>
              </ul>
            </div>
          </section>

          {/* How to Return */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6 border-b-2 border-gold pb-2">
              How to Initiate a Return/Exchange
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-royal-blue mb-2">Contact Us</h4>
                    <p className="text-royal-blue">
                      Email us at care@aviraudupu.com or call +91 9674373838 within 7 days of delivery
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-royal-blue mb-2">Provide Details</h4>
                    <p className="text-royal-blue">
                      Share your order number, reason for return, and product photos
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-royal-blue mb-2">Approval & Pickup</h4>
                    <p className="text-royal-blue">
                      Once approved, we'll arrange a pickup from your address within 2-3 business days
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-royal-blue mb-2">Quality Check</h4>
                    <p className="text-royal-blue">
                      We inspect the product to ensure it meets return criteria
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-royal-blue mb-2">Refund/Exchange</h4>
                    <p className="text-royal-blue">
                      Refund processed or exchange shipped within 7-10 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6 border-b-2 border-gold pb-2">
              Refund Policy
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <ul className="space-y-3 text-royal-blue">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Refunds are processed to the original payment method</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Processing time: 7-10 business days after product inspection</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Bank/card companies may take additional 5-7 days to credit the amount</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Original shipping charges are non-refundable</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Refund amount will be the product price minus any discounts applied</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Damaged/Defective Products */}
          <section>
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6 border-b-2 border-gold pb-2">
              Damaged or Defective Products
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-royal-blue mb-4">
                If you receive a damaged or defective product:
              </p>
              <ul className="space-y-3 text-royal-blue">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Contact us immediately within 48 hours of delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>Provide photos/videos of the damaged product and packaging</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>We'll arrange immediate replacement or full refund</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span>No return shipping charges for damaged/defective products</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Need Help with Returns?
            </h3>
            <p className="text-blue-100 mb-6">
              Our customer care team is here to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:care@aviraudupu.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-royal-blue font-semibold rounded-lg hover:bg-gold/90 transition-all duration-300"
              >
                <Icon name="Mail" size={20} />
                Email Us
              </a>
              <a
                href="tel:+919674373838"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-royal-blue transition-all duration-300"
              >
                <Icon name="Phone" size={20} />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnPolicy;
