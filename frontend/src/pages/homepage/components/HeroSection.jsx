import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);



  const heroSlides = [
    {
      id: 1,
      title: "Avira Udupu – Handpicked Sarees for Every Story",
      subtitle: "Premium Handloom Collection",
      description: "Discover our curated selection of authentic handwoven sarees crafted with generations of expertise.",
      cta1: "Shop Collections",
      cta2: "Discover Story",
      ctaLink: "/product-collection-grid",
      image: "/assets/images/banner1.jpg",
      overlay: "from-amber-100 via-pink-200 to-rose-200",
      accentColor: "from-gold to-gold-light",
      features: ["Premium Fabrics", "Master Craftsmen", "Global Shipping"]
    },
    {
      id: 2,
      title: "Bridal Excellence",
      subtitle: "Make Your Moment Unforgettable",
      description: "Exquisite bridal sarees with intricate work and traditional motifs for your special day.",
      cta1: "Bridal Collection",
      cta2: "Book Consultation",
      ctaLink: "/product-collection-grid?category=bridal",
      image: "/assets/images/banner2.jpg",
      overlay: "from-rose-200 via-pink-200 to-amber-100",
      accentColor: "from-gold to-amber-300",
      features: ["Custom Designs", "Expert Styling", "Lifetime Quality"]
    },
    {
      id: 3,
      title: "Festive Glamour",
      subtitle: "Celebrate in Style",
      description: "Our festive collection brings vibrant colors and traditional designs to your celebrations.",
      cta1: "Festive Range",
      cta2: "View Collection",
      ctaLink: "/product-collection-grid?category=festive",
      image: "/assets/images/banner3.jpg",
      overlay: "from-pink-200 via-rose-200 to-yellow-100",
      accentColor: "from-gold to-yellow-200",
      features: ["Vibrant Colors", "Traditional Motifs", "Perfect Fit"]
    },
    {
      id: 4,
      title: "Office Elegance",
      subtitle: "Professional Yet Stylish",
      description: "Sleek and sophisticated sarees designed for the modern professional woman.",
      cta1: "Office Wear",
      cta2: "See Collection",
      ctaLink: "/product-collection-grid?category=office",
      image: "/assets/images/banner4.jpg",
      overlay: "from-yellow-100 via-pink-200 to-rose-200",
      accentColor: "from-gold to-blue-200",
      features: ["Comfortable Drapes", "Modern Silhouettes", "Easy Maintenance"]
    },
    {
      id: 5,
      title: "Casual Comfort",
      subtitle: "Everyday Luxury",
      description: "Lightweight and comfortable sarees perfect for daily wear without compromising on style.",
      cta1: "Daily Wear",
      cta2: "Explore Styles",
      ctaLink: "/product-collection-grid?category=casual",
      image: "/assets/images/banner5.jpg",
      overlay: "from-amber-200 via-rose-200 to-pink-200",
      accentColor: "from-gold to-teal-200",
      features: ["Breathable Fabrics", "Easy to Drape", "Affordable Luxury"]
    }
  ];



  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 5);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 5) % 5);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlide_data = heroSlides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-blue-50">
      {/* Hero Slider Container - Responsive heights - Adjusted to fit content properly */}
      <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] max-h-[700px] max-w-full">


        {/* Slides - Using plain sheets instead of images */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background with gradient */}
            <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${slide.overlay}`}></div>
            
            {/* Banner Image on Right Side */}
            {slide.image && (
              <div className="absolute right-0 top-0 h-full w-[45%] md:w-1/2 lg:w-[45%]">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Lighter gradient on left side for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent sm:from-white/20 sm:via-transparent pointer-events-none"></div>

            {/* Content - Better positioned for mobile with adjusted padding */}
            <div className="relative h-full flex items-center">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-[50%] md:w-[45%] lg:max-w-2xl">
                  {/* Small Tagline */}
                  <div className="inline-block mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-lg border border-gold/40 rounded-full">
                      <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                      <span className="text-sm font-serif font-bold text-royal-blue">PREMIUM COLLECTION</span>
                    </div>
                  </div>

                  {/* Main Heading - Responsive text sizes - Reduced for better fit */}
                  <div className={`space-y-1 sm:space-y-3 mb-2 sm:mb-4 ${index === currentSlide ? 'animate-fadeInUp' : ''}`}>
                    <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-royal-blue leading-tight drop-shadow-md">
                      {slide.title}
                    </h1>
                    <p className={`text-sm sm:text-lg lg:text-xl font-serif font-semibold bg-gradient-to-r ${slide.accentColor} bg-clip-text text-transparent`}>
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Description - Responsive - Reduced size for better fit */}
                  <p className="text-xs sm:text-sm lg:text-base text-royal-blue font-serif leading-relaxed mb-3 sm:mb-6 drop-shadow-sm">
                    {slide.description}
                  </p>

                  {/* Features - Hidden on small mobile */}
                  <div className="hidden sm:flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {slide.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-lg">
                        <span className="text-gold text-xs sm:text-sm">✓</span>
                        <span className="text-xs font-serif text-royal-blue">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons - Responsive - Adjusted sizing */}
                  <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-3">
                    <Link to={slide.ctaLink}>
                      <button className="w-full sm:w-auto premium-gradient text-royal-blue font-serif font-bold px-3 sm:px-6 py-1.5 sm:py-3 rounded-lg hover:shadow-premium-gold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-1 sm:gap-2 group text-[10px] sm:text-sm">
                        {slide.cta1}
                        <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                    <button className="w-full sm:w-auto border-2 border-gold/80 text-royal-blue font-serif font-bold px-3 sm:px-6 py-1.5 sm:py-3 rounded-lg hover:bg-gold/20 hover:border-gold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 group backdrop-blur-sm text-[10px] sm:text-sm">
                      {slide.cta2}
                      <Icon name="Heart" size={14} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Controls - Responsive positioning - Adjusted for better fit */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 sm:gap-4 md:gap-6">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gold/20 hover:bg-gold/40 backdrop-blur-lg rounded-full flex items-center justify-center text-gold transition-all duration-300 border border-gold/40 hover:border-gold/80 group"
          >
            <Icon name="ChevronLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-gold/10 backdrop-blur-xl rounded-full border border-gold/30">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-4 h-1.5 sm:w-5 sm:h-2 bg-gold'
                    : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gold/40 hover:bg-gold/60'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gold/20 hover:bg-gold/40 backdrop-blur-lg rounded-full flex items-center justify-center text-gold transition-all duration-300 border border-gold/40 hover:border-gold/80 group"
          >
            <Icon name="ChevronRight" size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>


      </div>
    </div>
  );
};

export default HeroSection;