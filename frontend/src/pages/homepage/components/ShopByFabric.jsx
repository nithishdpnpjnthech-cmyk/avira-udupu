import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ShopByFabric = () => {
  const fabricCategories = [
    {
      id: 1,
      name: "Silk Sarees",
      description: "Luxurious silk sarees with rich textures",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop",
      link: "/product-collection-grid?fabric=silk",
      count: "150+ Designs",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      name: "Cotton Sarees",
      description: "Comfortable everyday wear sarees",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop",
      link: "/product-collection-grid?fabric=cotton",
      count: "200+ Designs",
      gradient: "from-green-400 to-blue-500"
    },
    {
      id: 3,
      name: "Georgette Sarees",
      description: "Flowing and elegant party wear",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop",
      link: "/product-collection-grid?fabric=georgette",
      count: "120+ Designs",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      id: 4,
      name: "Chiffon Sarees",
      description: "Light and airy formal wear",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&h=400&fit=crop",
      link: "/product-collection-grid?fabric=chiffon",
      count: "80+ Designs",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      id: 5,
      name: "Linen Sarees",
      description: "Breathable and sustainable choice",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop",
      link: "/product-collection-grid?fabric=linen",
      count: "60+ Designs",
      gradient: "from-teal-400 to-cyan-500"
    },
    {
      id: 6,
      name: "Organza Sarees",
      description: "Sheer elegance for special occasions",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop",
      link: "/product-collection-grid?fabric=organza",
      count: "40+ Designs",
      gradient: "from-rose-400 to-red-500"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-secondary mb-4">
            Shop by Fabric
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-royal-blue font-serif max-w-2xl mx-auto">
            Choose from our curated collection of premium fabrics, each offering unique textures and styles for every occasion.
          </p>
        </div>

        {/* Fabric Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fabricCategories.map((fabric) => (
            <Link
              key={fabric.id}
              to={fabric.link}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-premium transition-all duration-500 transform hover:scale-105"
            >
              {/* Background Image */}
              <div className="relative h-80">
                <img 
                  src={fabric.image} 
                  alt={fabric.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${fabric.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="mb-2">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-serif font-semibold">
                      {fabric.count}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {fabric.name}
                  </h3>
                  
                  <p className="text-sm font-serif opacity-90 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {fabric.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-serif font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    <span>Explore Collection</span>
                    <Icon name="ArrowRight" size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                <div className="w-full h-full rounded-full bg-white/20 animate-pulse"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
            <h3 className="text-2xl font-serif font-bold text-secondary mb-4">
              Can't Decide? Let Us Help!
            </h3>
            <p className="text-royal-blue font-serif mb-6 max-w-md mx-auto">
              Our fabric experts can guide you to choose the perfect saree for your occasion and style preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/product-collection-grid"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-serif font-semibold rounded-full hover:bg-primary/90 transition-colors duration-300"
              >
                <Icon name="Grid" size={20} className="mr-2" />
                View All Sarees
              </Link>
              <a 
                href="tel:+919876543210"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-serif font-semibold rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <Icon name="Phone" size={20} className="mr-2" />
                Call Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByFabric;