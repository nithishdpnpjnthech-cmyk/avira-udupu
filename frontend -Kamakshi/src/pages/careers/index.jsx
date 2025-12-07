import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const Careers = () => {
  const positions = [
    {
      id: 1,
      title: 'Senior Product Designer',
      department: 'Design',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'We are looking for a creative Senior Product Designer to join our design team and help shape the future of our saree e-commerce platform.'
    },
    {
      id: 2,
      title: 'E-commerce Marketing Manager',
      department: 'Marketing',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Lead our digital marketing efforts to drive growth and brand awareness for our premium saree collections.'
    },
    {
      id: 3,
      title: 'Customer Experience Specialist',
      department: 'Customer Success',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Provide exceptional customer service and support to our valued customers across all channels.'
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Build and maintain our e-commerce platform using modern web technologies and best practices.'
    }
  ];

  const benefits = [
    {
      icon: 'Briefcase',
      title: 'Competitive Salary',
      description: 'Market-leading compensation packages with performance bonuses'
    },
    {
      icon: 'Heart',
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage for you and your family'
    },
    {
      icon: 'Calendar',
      title: 'Flexible Hours',
      description: 'Work-life balance with flexible working arrangements'
    },
    {
      icon: 'GraduationCap',
      title: 'Learning Budget',
      description: '$2000 annually for courses, conferences, and books'
    },
    {
      icon: 'Home',
      title: 'Remote Work',
      description: 'Option to work remotely up to 3 days per week'
    },
    {
      icon: 'Coffee',
      title: 'Team Events',
      description: 'Monthly team outings and company-sponsored events'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Careers - AVIRA UDUPU</title>
        <meta name="description" content="Join our passionate team at AVIRA UDUPU and help preserve India's handloom heritage." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of a passionate team dedicated to preserving India's handloom heritage and bringing authentic sarees to modern women
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="font-semibold">10+ Open Positions</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="font-semibold">Remote Options</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="font-semibold">Growing Company</span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Culture */}
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-primary mb-4">
                Our Culture
              </h2>
              <p className="text-royal-blue max-w-2xl mx-auto">
                At AVIRA UDUPU, we believe in fostering creativity, collaboration, and continuous learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-royal-blue mb-2">Passion for Craft</h3>
                <p className="text-royal-blue">
                  We're deeply connected to traditional Indian textiles and crafts
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-royal-blue mb-2">Collaborative</h3>
                <p className="text-royal-blue">
                  We work together to achieve common goals and celebrate successes
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Rocket" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-royal-blue mb-2">Innovation</h3>
                <p className="text-royal-blue">
                  We encourage creative thinking and new approaches to challenges
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="py-16 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-primary mb-4">
                Employee Benefits
              </h2>
              <p className="text-royal-blue max-w-2xl mx-auto">
                We invest in our team's well-being and professional growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={benefit.icon} size={24} className="text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-royal-blue mb-2">{benefit.title}</h3>
                  <p className="text-royal-blue">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-primary mb-4">
                Open Positions
              </h2>
              <p className="text-royal-blue max-w-2xl mx-auto">
                Join us in our mission to celebrate and preserve India's textile heritage
              </p>
            </div>

            <div className="space-y-6">
              {positions.map((position) => (
                <div key={position.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-royal-blue mb-2">{position.title}</h3>
                      <p className="text-royal-blue mb-4">{position.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          <Icon name="Building" size={16} />
                          {position.department}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          <Icon name="MapPin" size={16} />
                          {position.location}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                          <Icon name="Clock" size={16} />
                          {position.type}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">
                          <Icon name="Briefcase" size={16} />
                          {position.experience}
                        </span>
                      </div>
                    </div>
                    <div>
                      <button className="px-6 py-3 bg-gradient-to-r from-primary to-blue-900 text-white font-semibold rounded-lg hover:from-blue-900 hover:to-primary transition-all duration-300 shadow-lg">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 px-4 bg-gradient-to-r from-primary to-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Don't See Your Role?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for preserving India's textile heritage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gold text-royal-blue font-semibold rounded-lg hover:bg-gold/90 transition-all duration-300">
                Send Open Application
              </button>
              <button className="px-8 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-royal-blue transition-all duration-300">
                Learn About Our Values
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
