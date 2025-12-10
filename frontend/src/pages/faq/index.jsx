import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order by browsing our collections, adding items to your cart, and proceeding to checkout. Fill in your shipping details and complete the payment to confirm your order.'
        },
        {
          question: 'What are the shipping charges?',
          answer: 'We offer FREE shipping on all orders above ₹3,000. For orders below ₹3,000, a nominal shipping charge of ₹100 will be applicable.'
        },
        {
          question: 'How long does delivery take?',
          answer: 'Domestic orders typically take 5-7 business days. International orders may take 10-15 business days depending on the destination country and customs clearance.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes! We ship worldwide. International shipping charges vary by destination and will be calculated at checkout.'
        }
      ]
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We accept returns within 7 days of delivery. The saree must be unused, unwashed, and in original packaging with all tags intact.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Contact our customer care team at care@aviraudupu.com or call +91 9674373838 to initiate a return. Our team will guide you through the process.'
        },
        {
          question: 'Can I exchange a product?',
          answer: 'Yes, exchanges are available within 7 days of delivery for the same value product. Product must be in original condition.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 7-10 business days after we receive and inspect the returned product.'
        }
      ]
    },
    {
      category: 'Payment & Security',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards (Visa, Mastercard, American Express), UPI, Net Banking, and digital wallets like Google Pay and PayPal.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Absolutely! We use 256-bit SSL encryption for all transactions. Your payment information is never stored on our servers.'
        },
        {
          question: 'Can I pay Cash on Delivery?',
          answer: 'Currently, we do not offer Cash on Delivery. All orders must be paid online through our secure payment gateway.'
        }
      ]
    },
    {
      category: 'Product Care',
      questions: [
        {
          question: 'How do I care for my silk saree?',
          answer: 'Silk sarees should be dry cleaned only. Store in a cool, dry place wrapped in muslin cloth. Avoid direct sunlight and moisture.'
        },
        {
          question: 'Can I wash cotton sarees at home?',
          answer: 'Yes, cotton sarees can be hand washed in cold water with mild detergent. Avoid wringing and dry in shade.'
        },
        {
          question: 'How do I remove wrinkles from my saree?',
          answer: 'Use a steam iron on low heat. Always iron on the reverse side to protect embellishments and zari work.'
        }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Frequently Asked Questions - AVIRA UDUPU</title>
        <meta name="description" content="Find answers to common questions about orders, shipping, returns, payments, and product care at AVIRA UDUPU." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-blue-100">
              Find answers to common questions about our products and services
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-6 border-b-2 border-gold pb-2">
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(globalIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors duration-200"
                      >
                        <span className="font-semibold text-royal-blue pr-4">
                          {faq.question}
                        </span>
                        <Icon
                          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                          size={24}
                          className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <div className="px-6 pb-6 text-royal-blue leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-blue-100 mb-6">
              Our customer care team is here to help you
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

export default FAQ;
