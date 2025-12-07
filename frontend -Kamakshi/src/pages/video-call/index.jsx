import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const VideoCall = () => {
  const [isScheduled, setIsScheduled] = useState(false);
  const [appointmentType, setAppointmentType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const appointmentTypes = [
    {
      id: 'styling',
      title: 'Saree Styling Consultation',
      description: 'Get expert advice on choosing the perfect saree for any occasion',
      duration: '30 mins'
    },
    {
      id: 'product',
      title: 'Product Inquiry',
      description: 'Detailed discussion about specific sarees or collections',
      duration: '20 mins'
    },
    {
      id: 'custom',
      title: 'Custom Design Discussion',
      description: 'Talk to our designers about creating your dream saree',
      duration: '45 mins'
    },
    {
      id: 'bridal',
      title: 'Bridal Consultation',
      description: 'Specialized guidance for your wedding saree selection',
      duration: '45 mins'
    }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appointmentType && selectedDate && selectedTime) {
      setIsScheduled(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Video Call Appointment - AVIRA UDUPU</title>
        <meta name="description" content="Schedule a video call with our experts for saree styling consultations and product inquiries." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Video Call Appointment
            </h1>
            <p className="text-lg text-blue-100">
              Connect with our experts for personalized saree styling advice
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          {!isScheduled ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Appointment Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-playfair font-bold text-primary mb-6">
                  Schedule Your Appointment
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Appointment Type */}
                  <div>
                    <label className="block text-sm font-medium text-royal-blue mb-3">
                      Select Appointment Type *
                    </label>
                    <div className="space-y-3">
                      {appointmentTypes.map((type) => (
                        <label key={type.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary cursor-pointer">
                          <input
                            type="radio"
                            name="appointmentType"
                            value={type.id}
                            checked={appointmentType === type.id}
                            onChange={(e) => setAppointmentType(e.target.value)}
                            className="mt-1"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-royal-blue">{type.title}</span>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                {type.duration}
                              </span>
                            </div>
                            <p className="text-sm text-royal-blue mt-1">{type.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-royal-blue mb-2">
                      Select Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-royal-blue mb-2">
                      Select Time Slot *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                            selectedTime === time
                              ? 'bg-primary text-white border-primary'
                              : 'border-gray-300 hover:border-primary hover:bg-blue-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!appointmentType || !selectedDate || !selectedTime}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      appointmentType && selectedDate && selectedTime
                        ? 'bg-gradient-to-r from-primary to-blue-900 text-white shadow-lg hover:from-blue-900 hover:to-primary'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Schedule Appointment
                  </button>
                </form>
              </div>

              {/* Information Panel */}
              <div>
                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-8 mb-8">
                  <h3 className="text-xl font-playfair font-bold text-primary mb-4">
                    What to Expect
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={20} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-royal-blue">Personalized saree recommendations based on your preferences</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={20} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-royal-blue">Expert styling advice for your body type and occasion</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={20} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-royal-blue">Live product demonstrations and detailed views</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={20} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-royal-blue">Real-time assistance with purchasing decisions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-playfair font-bold text-primary mb-4">
                    Before Your Call
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-royal-blue">Ensure you have a stable internet connection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-royal-blue">Have good lighting for product viewing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-royal-blue">Prepare any specific questions or preferences</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-royal-blue">Have your wishlist or favorite products ready</span>
                    </li>
                  </ul>
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
                Appointment Scheduled!
              </h2>
              
              <p className="text-royal-blue mb-8 max-w-2xl mx-auto">
                Thank you for scheduling your video call with AVIRA UDUPU. We've sent a confirmation email 
                with meeting details. Our expert will connect with you at the scheduled time.
              </p>
              
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment Details</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-royal-blue">Type:</span>
                    <span className="font-medium text-royal-blue">
                      {appointmentTypes.find(t => t.id === appointmentType)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-royal-blue">Date:</span>
                    <span className="font-medium text-royal-blue">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-royal-blue">Time:</span>
                    <span className="font-medium text-royal-blue">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-royal-blue">Duration:</span>
                    <span className="font-medium text-royal-blue">
                      {appointmentTypes.find(t => t.id === appointmentType)?.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsScheduled(false)}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-blue-900 text-white font-semibold rounded-lg hover:from-blue-900 hover:to-primary transition-all duration-300"
                >
                  Schedule Another Appointment
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

        {/* Support Section */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-blue-100 mb-6">
              Our customer care team is available for quick questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919674373838"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-royal-blue font-semibold rounded-lg hover:bg-gold/90 transition-all duration-300"
              >
                <Icon name="Phone" size={20} />
                Call Us
              </a>
              <a
                href="https://wa.me/919845651468?text=Hello%20AVIRA%20UDUPU!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-royal-blue transition-all duration-300"
              >
                <Icon name="MessageCircle" size={20} />
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VideoCall;
