import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import Footer from '../../components/ui/Footer';
import { useCart } from '../../contexts/CartContext';

const Homepage = () => {
  const { addToCart } = useCart();
  const [bestsellers, setBestsellers] = useState([]);
  const [testimonials] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      text: 'Every AVIRA UDUPU saree I wear transports me to a world of elegance and timeless beauty.',
      rating: 5,
      product: 'Silk Saree'
    },
    {
      id: 2,
      name: 'Anjali Patel',
      text: 'The craftsmanship and quality are exceptional. I feel like royalty wearing these sarees.',
      rating: 5,
      product: 'Bridal Collection'
    },
    {
      id: 3,
      name: 'Divya Nair',
      text: 'Wearing an AVIRA UDUPU saree is always a delightful experience. Highly recommended!',
      rating: 5,
      product: 'Designer Saree'
    }
  ]);

  // AVIRA UDUPU COLLECTION - 12 round categories
  const aviraCollection = [
    { name: 'Mul Cotton Sarees', link: '/product-collection-grid?type=mul-cotton', image: '/assets/images/mul-cotton.jpg' },
    { name: 'Linen Sarees', link: '/product-collection-grid?type=linen', image: '/assets/images/linen.jpg' },
    { name: 'Tissue Silk Sarees', link: '/product-collection-grid?type=tissue-silk', image: '/assets/images/tissue-silk.jpg' },
    { name: 'Kanchipuram Inspired Sarees', link: '/product-collection-grid?type=kanchipuram', image: '/assets/images/kanchipuram.jpg' },
    { name: 'Party Wear Sarees', link: '/product-collection-grid?category=party', image: '/assets/images/party-wear.jpg' },
    { name: 'Office Wear Sarees', link: '/product-collection-grid?category=office', image: '/assets/images/office-wear.jpg' },
    { name: 'Wedding Edit Sarees', link: '/product-collection-grid?category=wedding', image: '/assets/images/wedding-edit.jpg' },
    { name: 'Festive Collection', link: '/product-collection-grid?category=festive', image: '/assets/images/festive.jpg' },
    { name: 'Handloom Classics', link: '/product-collection-grid?category=handloom', image: '/assets/images/handloom.jpg' },
    { name: 'Everyday Drapes', link: '/product-collection-grid?category=everyday', image: '/assets/images/everyday.jpg' },
    { name: 'Signature Collection', link: '/product-collection-grid?category=signature', image: '/assets/images/signature.jpg' },
    { name: 'Pastel Dreams', link: '/product-collection-grid?category=pastel', image: '/assets/images/pastel.jpg' }
  ];

  // Trending Sarees (5 featured categories)
  const trendingSarees = [
    { name: 'Kanjeevaram Sarees', image: '/assets/images/kanjeevaram.jpg', link: '/product-collection-grid?type=kanjeevaram' },
    { name: 'Mangalagiri Pure Sarees', image: '/assets/images/mangalagiri.jpg', link: '/product-collection-grid?type=mangalagiri' },
    { name: 'Banarasi Pure Sarees', image: '/assets/images/banarasi.jpg', link: '/product-collection-grid?type=banarasi' },
    { name: 'Arjakh Modal Silk Sarees', image: '/assets/images/arjakh.jpg', link: '/product-collection-grid?type=arjakh-modal' },
    { name: 'Ikkath Sarees', image: '/assets/images/ikkath.jpg', link: '/product-collection-grid?type=ikkath' }
  ];

  const aviraSpecials = [
    { id: 1, title: 'FLORAL ORGANZA SAREES', link: '/product-collection-grid?category=floral-organza', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop' },
    { id: 2, title: 'MUL MUL COTTON SAREES', link: '/product-collection-grid?category=mulmul-cotton', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop' },
    { id: 3, title: 'FLORAL CHIFFON SAREES', link: '/product-collection-grid?category=floral-chiffon', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop' },
    { id: 4, title: 'HAND PAINTED SAREES', link: '/product-collection-grid?category=hand-painted', image: 'https://images.unsplash.com/photo-1617627231000-5b5a146ff323?w=600&h=800&fit=crop' }
  ];

  const spotlightCategories = [
    { name: 'DESIGNER SAREES', link: '/product-collection-grid?category=designer' },
    { name: 'LEHENGAS', link: '/product-collection-grid?category=lehenga' },
    { name: 'DRAPE SAREES', link: '/product-collection-grid?category=drape' },
    { name: 'ANARKALIS', link: '/product-collection-grid?category=anarkali' }
  ];

  const customerImages = [
    { id: 1, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop', caption: 'Beautiful bridal moment' },
    { id: 2, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop', caption: 'Festive elegance' },
    { id: 3, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=600&fit=crop', caption: 'Traditional grace' },
    { id: 4, image: 'https://images.unsplash.com/photo-1617627231000-5b5a146ff323?w=600&h=600&fit=crop', caption: 'Wedding perfection' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Trending Festive Saree Styles for 2025',
      date: 'December 03, 2025',
      author: 'AVIRA UDUPU',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop',
      excerpt: 'Discover the latest saree trends that are making waves this festive season...',
      link: '/blog/festive-saree-styles-2025'
    },
    {
      id: 2,
      title: 'How to Identify Authentic Handloom Sarees',
      date: 'November 28, 2025',
      author: 'AVIRA UDUPU',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
      excerpt: 'Learn the key indicators of genuine handloom craftsmanship...',
      link: '/blog/authentic-handloom-sarees'
    },
    {
      id: 3,
      title: 'Bridal Saree Selection Guide',
      date: 'November 20, 2025',
      author: 'AVIRA UDUPU',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=300&fit=crop',
      excerpt: 'Everything you need to know to choose the perfect bridal saree...',
      link: '/blog/bridal-saree-guide'
    }
  ];

  const trustBadges = [
    { id: 1, title: 'Express Delivery', desc: 'Fast & Reliable Shipping Worldwide', icon: '🚚' },
    { id: 2, title: 'Trusted By 10,000+ Customers', desc: 'Verified Customer Reviews', icon: '⭐' },
    { id: 3, title: 'Authentic Handpicked Fabrics', desc: 'Premium Quality Guaranteed', icon: '✅' },
    { id: 4, title: '100% Secure Payments', desc: 'Safe & Protected Transactions', icon: '🔒' }
  ];

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await fetch('/api/products?limit=8');
        const data = await response.json();
        setBestsellers(data.slice(0, 8));
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };
    fetchBestsellers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AVIRA UDUPU - Premium Sarees & Luxury Ethnic Wear</title>
        <meta name="description" content="Discover AVIRA UDUPU's exquisite collection of handcrafted sarees, featuring premium fabrics and timeless designs for every occasion." />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section - 5 banners */}
        <HeroSection />

        {/* AVIRA UDUPU COLLECTION - 12 round categories */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
                AVIRA UDUPU COLLECTION
              </h2>
              <p className="text-royal-blue text-lg">Explore our handpicked saree collections</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
              {aviraCollection.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="group text-center"
                >
                  {/* Circular Image */}
                  <div className="relative mx-auto mb-4 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 overflow-hidden rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-blue/70 via-royal-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white text-xs font-bold">→</span>
                    </div>
                  </div>
                  
                  {/* Name */}
                  <p className="font-serif font-semibold text-sm text-royal-blue group-hover:text-primary transition-colors duration-200">
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/product-collection-grid"
                className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                All Sarees
              </Link>
            </div>
          </div>
        </section>

        {/* BEST AT AVIRA UDUPU - best sellers */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
                BEST AT AVIRA UDUPU
              </h2>
              <p className="text-royal-blue text-lg">Discover our most loved collections</p>
            </div>

            {bestsellers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestsellers.map(product => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-200 h-64">
                      <img
                        src={product.image || '/assets/images/no_image.png'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Sale
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-playfair text-lg font-semibold text-primary mb-2 truncate">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-accent text-sm">★</span>
                        ))}
                        <span className="ml-2 text-royal-blue text-sm">(42 reviews)</span>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-primary">
                            ₹{product.salePrice || product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm line-through text-blue-800">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-gradient-to-r from-primary to-blue-900 hover:from-blue-900 hover:to-primary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:shadow-lg"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-royal-blue text-lg">Loading bestsellers...</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                to="/product-collection-grid"
                className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore All Collections
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT US - FOUNDER STORY */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-yellow-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <img
                  src="/assets/images/founder.jpg"
                  alt="About Avira Udupu – Our Founder's Story"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Content */}
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-6">
                  About Avira Udupu – Our Founder's Story
                </h2>
                <p className="text-royal-blue text-lg leading-relaxed mb-6 font-crimson">
                  Avira Udupu was born from a love for sarees and stories. Our founder's journey started with the warmth of traditional weaves, 
                  festival drapes, and heirloom sarees passed down through generations. Avira Udupu celebrates timeless craftsmanship and brings 
                  curated sarees that feel personal, elegant, and rooted in tradition.
                </p>
                <p className="text-royal-blue text-lg leading-relaxed mb-8 font-crimson">
                  Today, we continue this legacy by connecting artisans with customers who value authenticity, quality, and the stories woven 
                  into every thread of our sarees.
                </p>
                <Link
                  to="/about-us"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-blue-900 text-white font-semibold rounded-lg hover:from-blue-900 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* NEW AT AVIRA UDUPU - new arrivals */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
                NEW AT AVIRA UDUPU
              </h2>
              <p className="text-royal-blue text-lg">Discover our latest additions</p>
            </div>

            {bestsellers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {bestsellers.slice(0, 10).map(product => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative overflow-hidden bg-gray-200 aspect-[3/4]">
                      <img
                        src={product.image || '/assets/images/no_image.png'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          Sale
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-playfair text-sm font-semibold text-primary mb-2 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-primary">
                          ₹{product.salePrice || product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm line-through text-royal-blue">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary/90 transition-all duration-300"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-royal-blue text-lg">Loading new arrivals...</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                to="/product-collection-grid?filter=new"
                className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View all
              </Link>
            </div>
          </div>
        </section>

        {/* TRENDING SAREES */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
                TRENDING SAREES
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {trendingSarees.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="group relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-white font-playfair font-bold text-xl mb-2">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SUBSCRIBE TO OUR EMAILS */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-royal-blue to-blue-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              Subscribe to our emails
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Be the first to know about new collections and exclusive offers.
            </p>
            
            <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gold text-royal-blue font-bold rounded-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;