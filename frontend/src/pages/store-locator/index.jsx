import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const StoreLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const cities = [
    'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  const stores = [
    {
      id: 1,
      name: 'AVIRA UDUPU Flagship Store',
      address: '123 MG Road, Bangalore, Karnataka 560001',
      phone: '+91 96743 73838',
      hours: '10:00 AM - 9:00 PM (Mon-Sun)',
      city: 'Bangalore',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      features: ['Private Fitting Room', 'Styling Consultation', 'Exclusive Preview']
    },
    {
      id: 2,
      name: 'AVIRA UDUPU Premium Outlet',
      address: '456 Brigade Road, Bangalore, Karnataka 560025',
      phone: '+91 96743 73839',
      hours: '11:00 AM - 8:00 PM (Mon-Sat)',
      city: 'Bangalore',
      coordinates: { lat: 12.9726, lng: 77.6024 },
      features: ['Special Collections', 'Seasonal Offers', 'Gift Wrapping']
    },
    {
      id: 3,
      name: 'AVIRA UDUPU Experience Center',
      address: '789 Koramangala, Bangalore, Karnataka 560034',
      phone: '+91 96743 73840',
      hours: '10:00 AM - 10:00 PM (Mon-Sun)',
      city: 'Bangalore',
      coordinates: { lat: 12.9352, lng: 77.6245 },
      features: ['Virtual Reality Experience', 'Custom Design Studio', 'Artisan Meet & Greet']
    },
    {
      id: 4,
      name: 'AVIRA UDUPU Mumbai Store',
      address: '101 Nariman Point, Mumbai, Maharashtra 400021',
      phone: '+91 96743 73841',
      hours: '10:00 AM - 9:00 PM (Mon-Sun)',
      city: 'Mumbai',
      coordinates: { lat: 18.9221, lng: 72.8340 },
      features: ['Private Fitting Room', 'Styling Consultation', 'Exclusive Preview']
    },
    {
      id: 5,
      name: 'AVIRA UDUPU Delhi Store',
      address: '202 Connaught Place, New Delhi, Delhi 110001',
      phone: '+91 96743 73842',
      hours: '10:00 AM - 9:00 PM (Mon-Sun)',
      city: 'Delhi',
      coordinates: { lat: 28.6328, lng: 77.2197 },
      features: ['Special Collections', 'Seasonal Offers', 'Gift Wrapping']
    },
    {
      id: 6,
      name: 'AVIRA UDUPU Chennai Store',
      address: '303 T Nagar, Chennai, Tamil Nadu 600017',
      phone: '+91 96743 73843',
      hours: '10:00 AM - 9:00 PM (Mon-Sun)',
      city: 'Chennai',
      coordinates: { lat: 13.0410, lng: 80.2341 },
      features: ['Virtual Reality Experience', 'Custom Design Studio', 'Artisan Meet & Greet']
    }
  ];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity ? store.city === selectedCity : true;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Store Locator - AVIRA UDUPU</title>
        <meta name="description" content="Find the nearest AVIRA UDUPU store and get directions to experience our premium saree collections." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Store Locator
            </h1>
            <p className="text-lg text-blue-100">
              Find the nearest AVIRA UDUPU store and experience our premium saree collections
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow-lg py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by store name or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                >
                  <option value="">All Cities</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Store List */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-playfair font-bold text-primary mb-6">
                {filteredStores.length} Store{filteredStores.length !== 1 ? 's' : ''} Found
              </h2>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredStores.map((store) => (
                  <div key={store.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg font-semibold text-royal-blue mb-2">{store.name}</h3>
                    
                    <div className="flex items-start gap-2 text-royal-blue mb-2">
                      <Icon name="MapPin" size={16} className="mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{store.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-royal-blue mb-2">
                      <Icon name="Phone" size={16} />
                      <span className="text-sm">{store.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-royal-blue mb-3">
                      <Icon name="Clock" size={16} />
                      <span className="text-sm">{store.hours}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {store.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gold/20 text-gold text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-blue-900 transition-colors">
                        Get Directions
                      </button>
                      <button className="px-3 py-2 border border-primary text-primary text-sm rounded-lg hover:bg-primary/10 transition-colors">
                        Call
                      </button>
                    </div>
                  </div>
                ))}
                
                {filteredStores.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Store" size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-royal-blue">No stores found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Map" size={48} className="text-primary mx-auto mb-4" />
                    <p className="text-gray-600">Interactive map showing store locations</p>
                    <p className="text-sm text-gray-500 mt-2">(Placeholder for actual map integration)</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-primary mb-4">
                    Store Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Store Hours</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Monday - Sunday: 10:00 AM - 9:00 PM</li>
                        <li>Holidays: 11:00 AM - 8:00 PM</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Services Available</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Private Fitting Rooms</li>
                        <li>Personal Styling Consultations</li>
                        <li>Gift Packaging</li>
                        <li>Custom Design Services</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <Icon name="Info" size={16} className="inline mr-1" />
                      Some stores may have special holiday hours. Please call ahead to confirm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Can't Find a Store Near You?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              We're continuously expanding our retail presence. Sign up to be notified when we open a store in your area.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button className="px-6 py-3 bg-gold text-royal-blue font-semibold rounded-lg hover:bg-gold/90 transition-all duration-300 whitespace-nowrap">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoreLocator;
