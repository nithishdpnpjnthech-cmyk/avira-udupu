import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NewArrivals = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for new arrivals - replace with API call
  const mockProducts = [
    {
      id: 1,
      name: "Banarasi Silk Saree - Royal Blue",
      price: 12999,
      originalPrice: 15999,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
      badge: "New",
      fabric: "Pure Silk",
      isNew: true
    },
    {
      id: 2,
      name: "Kanjivaram Wedding Saree - Gold",
      price: 18999,
      originalPrice: 22999,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop",
      badge: "Trending",
      fabric: "Kanjivaram Silk",
      isNew: true
    },
    {
      id: 3,
      name: "Designer Georgette Saree - Maroon",
      price: 8999,
      originalPrice: 11999,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=500&fit=crop",
      badge: "Limited",
      fabric: "Georgette",
      isNew: true
    },
    {
      id: 4,
      name: "Handloom Cotton Saree - Green",
      price: 4999,
      originalPrice: 6999,
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=500&fit=crop",
      badge: "Eco-Friendly",
      fabric: "Handloom Cotton",
      isNew: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-secondary mb-4">New Arrivals</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
                <div className="w-full h-80 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-secondary mb-4">
            New Arrivals
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-royal-blue font-serif max-w-2xl mx-auto">
            Discover our latest collection of premium sarees, handpicked for the modern woman who appreciates timeless elegance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <div key={product.id} className="group saree-card bg-white rounded-lg shadow-md overflow-hidden">
              {/* Product Image */}
              <div className="relative zoom-hover">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-serif font-semibold">
                    {product.badge}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                    <Icon name="Heart" size={16} />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors">
                    <Icon name="Eye" size={16} />
                  </button>
                </div>

                {/* Add to Cart Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    onClick={() => onAddToCart && onAddToCart(product)}
                    className="w-full bg-primary text-white font-serif font-semibold py-2 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-primary font-serif font-semibold uppercase tracking-wide">
                    {product.fabric}
                  </span>
                </div>
                
                <h3 className="font-serif font-semibold text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  <Link to={`/product-detail-page/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-serif font-bold text-secondary">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-blue-800 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={14} className="text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs text-blue-800 ml-1">(4.8)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/product-collection-grid?category=new-arrivals">
            <Button className="premium-gradient text-white font-serif font-semibold px-8 py-3 rounded-full hover:shadow-gold-lg transition-all duration-300">
              View All New Arrivals
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
