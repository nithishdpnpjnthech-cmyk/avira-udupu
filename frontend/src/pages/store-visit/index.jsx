import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const StoreVisit = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);

  const stores = [
    {
      id: 1,
      name: 'AVIRA UDUPU Flagship Store',
      address: '123 MG Road, Bangalore, Karnataka 560001',
      phone: '+91 96743 73838',
      hours: '10:00 AM - 9:00 PM (Mon-Sun)',
      features: ['Private Fitting Room', 'Styling Consultation', 'Exclusive Preview', 'Complimentary Refreshments'],
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'AVIRA UDUPU Premium Outlet',
      address: '456 Brigade Road, Bangalore, Karnataka 560025',
      phone: '+91 96743 73839',
      hours: '11:00 AM - 8:00 PM (Mon-Sat)',
      features: ['Special Collections', 'Seasonal Offers', 'Gift Wrapping', 'Personal Shopping Assistant'],
      image: 'https://images.unsplash.com/photo-1582233479366-6d38bc390a08?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'AVIRA UDUPU Experience Center',
      address: '789 Koramangala, Bangalore, Karnataka 560034',
      phone: '+91 96743 73840',
      hours: '10:00 AM - 10:00 PM (Mon-Sun)',
      features: ['Virtual Reality Experience', 'Custom Design Studio', 'Artisan Meet & Greet', 'Workshop Space'],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop'
    }
  ];

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStore && visitDate && visitTime) {
      setIsScheduled(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Store Visit - AVIRA UDUPU</title>
        <meta name="description" content="Schedule a visit to our flagship stores and experience our premium saree collections in person." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Store Visit
            </h1>
            <p className="text-lg text-blue-100">
              Experience our premium saree collections in person at our flagship stores
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          {!isScheduled ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Store Selection */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-playfair font-bold text-primary mb-6">
                  Select a Store to Visit
                </h2>
                
                <div className="space-y-6">
                  {stores.map((store) => (
                    <div 
                      key={store.id}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedStore?.id === store.id 
                          ? 'ring-2 ring-primary shadow-xl' 
                          : 'hover:shadow-xl'
                      }`}
                      onClick={() => setSelectedStore(store)}
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img 
                            src={store.image} 
                            alt={store.name}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex items-start justify-between">
                            <h3 className="text-xl font-semibold text-royal-blue mb-2">
                              {store.name}
                            </h3>
                            {selectedStore?.id === store.id && (
                              <Icon name="CheckCircle" size={24} className="text-primary flex-shrink-0" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-royal-blue mb-3">
                            <Icon name="MapPin" size={16} />
                            <span className="text-sm">{store.address}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-royal-blue mb-3">
                            <Icon name="Phone" size={16} />
                            <span className="text-sm">{store.phone}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-royal-blue mb-4">
                            <Icon name="Clock" size={16} />
                            <span className="text-sm">{store.hours}</span>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-royal-blue mb-2">Store Features:</h4>
                            <div className="flex flex-wrap gap-2">
                              {store.features.map((feature, index) => (
                                <span 
                                  key={index}
                                  className="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                  <h3 className="text-xl font-playfair font-bold text-primary mb-4">
                    Schedule Your Visit
                  </h3>
                  
                  {selectedStore ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-royal-blue mb-1">
                          Selected Store
                        </label>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-royal-blue">{selectedStore.name}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-royal-blue mb-1">
                          Select Date *
                        </label>
                        <input
                          type="date"
                          id="date"
                          value={visitDate}
                          onChange={(e) => setVisitDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-royal-blue mb-1">
                          Select Time *
                        </label>
                        <select
                          value={visitTime}
                          onChange={(e) => setVisitTime(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        >
                          <option value="">Choose a time slot</option>
                          {timeSlots.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={!visitDate || !visitTime}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                          visitDate && visitTime
                            ? 'bg-gradient-to-r from-primary to-blue-900 text-white shadow-lg hover:from-blue-900 hover:to-primary'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Confirm Visit
                      </button>
                      
                      <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                        <p className="text-sm text-amber-800">
                          <Icon name="Info" size={16} className="inline mr-1" />
                          Please arrive 10 minutes before your scheduled time
                        </p>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <Icon name="Store" size={48} className="text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Please select a store to schedule your visit
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Confirmation Screen */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Check" size={48} className="text-green-600" />
              </div>
              
              <h2 className="text-3xl font-playfair font-bold text-primary mb-4">
                Visit Confirmed!
              </h2>
              
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Thank you for scheduling your visit to {selectedStore?.name}. We look forward to welcoming you 
                and providing you with an exceptional shopping experience.
              </p>
              
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Visit Details</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Store:</span>
                    <span className="font-medium">{selectedStore?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium text-right">{selectedStore?.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{visitDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{visitTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{selectedStore?.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsScheduled(false)}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-blue-900 text-white font-semibold rounded-lg hover:from-blue-900 hover:to-primary transition-all duration-300"
                >
                  Schedule Another Visit
                </button>
                <a
                  href="/"
                  className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Back to Home
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Store Features */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-primary mb-4">
                Why Visit Our Stores?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the luxury and craftsmanship of our sarees in person
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Eye" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">See in Person</h3>
                <p className="text-gray-600 text-sm">
                  Appreciate the texture, weave, and intricate details of our sarees
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Guidance</h3>
                <p className="text-gray-600 text-sm">
                  Get personalized styling advice from our experienced consultants
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Try Before You Buy</h3>
                <p className="text-gray-600 text-sm">
                  Drape and try on sarees to find your perfect match
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Star" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Exclusive Access</h3>
                <p className="text-gray-600 text-sm">
                  Preview new collections and limited editions before they launch
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoreVisit;
