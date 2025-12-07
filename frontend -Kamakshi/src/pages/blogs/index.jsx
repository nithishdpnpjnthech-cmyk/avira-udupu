import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const Blogs = () => {
  // Sample blog data - in a real app this would come from an API
  const blogPosts = [
    {
      id: 1,
      title: 'Trending Festive Saree Styles for 2025',
      excerpt: 'Discover the latest saree trends that are making waves this festive season. From contemporary designs to traditional classics, we\'ve got you covered.',
      date: 'December 03, 2025',
      author: 'AVIRA UDUPU Team',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop',
      category: 'Fashion Trends',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'How to Identify Authentic Handloom Sarees',
      excerpt: 'Learn the key indicators of genuine handloom craftsmanship and distinguish authentic sarees from machine-made replicas.',
      date: 'November 28, 2025',
      author: 'AVIRA UDUPU Team',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=400&fit=crop',
      category: 'Saree Guide',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Bridal Saree Selection Guide',
      excerpt: 'Everything you need to know to choose the perfect bridal saree that complements your skin tone, body type, and wedding theme.',
      date: 'November 20, 2025',
      author: 'AVIRA UDUPU Team',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=400&fit=crop',
      category: 'Bridal',
      readTime: '8 min read'
    },
    {
      id: 4,
      title: 'The Art of Saree Draping: 5 Regional Styles',
      excerpt: 'Explore five beautiful regional draping styles from different parts of India and learn how to master them.',
      date: 'November 15, 2025',
      author: 'AVIRA UDUPU Team',
      image: 'https://images.unsplash.com/photo-1617627231000-5b5a146ff323?w=600&h=400&fit=crop',
      category: 'Styling Tips',
      readTime: '6 min read'
    },
    {
      id: 5,
      title: 'Caring for Your Silk Sarees: Expert Tips',
      excerpt: 'Preserve the beauty and longevity of your precious silk sarees with these professional care techniques.',
      date: 'November 10, 2025',
      author: 'AVIRA UDUPU Team',
      image: 'https://images.unsplash.com/photo-1583391733981-e8c9e2240e97?w=600&h=400&fit=crop',
      category: 'Saree Care',
      readTime: '4 min read'
    },
    {
      id: 6,
      title: 'The History and Evolution of Banarasi Weaves',
      excerpt: 'Journey through centuries of craftsmanship and discover the fascinating evolution of Banarasi silk sarees.',
      date: 'November 05, 2025',
      author: 'AVIRA UDUPU Team',
      image: 'https://images.unsplash.com/photo-1617627231465-3064f75fd2b7?w=600&h=400&fit=crop',
      category: 'Heritage',
      readTime: '9 min read'
    }
  ];

  const categories = [
    'All Posts',
    'Fashion Trends',
    'Saree Guide',
    'Bridal',
    'Styling Tips',
    'Saree Care',
    'Heritage'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Blog - AVIRA UDUPU</title>
        <meta name="description" content="Discover style tips, saree guides, and fashion insights from AVIRA UDUPU." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              AVIRA Stories
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Discover style tips, saree guides, and fashion insights to elevate your ethnic wear journey
            </p>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Categories Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    index === 0
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-royal-blue border border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-blue-800">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair font-bold text-xl text-primary mb-3 group-hover:text-gold transition-colors duration-200">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-royal-blue text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-xs text-blue-800">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-lg">
              Load More Articles
            </button>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Stay Updated with Our Latest Stories
            </h3>
            <p className="text-blue-100 mb-6">
              Subscribe to receive our latest blog posts and style guides directly in your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-royal-blue focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button className="px-6 py-3 bg-gold text-royal-blue font-semibold rounded-lg hover:bg-gold/90 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blogs;
