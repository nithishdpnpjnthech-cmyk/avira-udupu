import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

const FabricGuide = () => {
  const [activeFabric, setActiveFabric] = useState(0);

  const fabrics = [
    {
      id: 1,
      name: 'Pure Silk',
      description: 'The epitome of luxury, our pure silk sarees are made from 100% mulberry silk with a natural sheen that enhances your elegance.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop',
      features: ['Lustrous appearance', 'Breathable & lightweight', 'Durable & long-lasting', 'Suitable for all occasions'],
      care: 'Dry clean recommended. Hand wash in cool water with gentle soap.',
      price: 'Premium Range',
      occasions: 'Weddings, Festivals, Special Events'
    },
    {
      id: 2,
      name: 'Silk Blend',
      description: 'A perfect blend of silk and cotton, offering comfort with elegance. Ideal for everyday celebrations and festive wear.',
      image: 'https://images.unsplash.com/photo-1617451767069-3886ecf34d97?w=600&h=400&fit=crop',
      features: ['Soft & comfortable', 'Easy to maintain', 'Affordable luxury', 'Perfect weight'],
      care: 'Machine wash on gentle cycle or hand wash in cool water.',
      price: 'Moderate Range',
      occasions: 'Casual, Semi-formal, Festivals'
    },
    {
      id: 3,
      name: 'Cotton Saree',
      description: 'Breathable and comfortable, our cotton sarees are perfect for daily wear and summer celebrations. Natural, eco-friendly choice.',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=400&fit=crop',
      features: ['Highly breathable', 'Eco-friendly', 'Easy care', 'Lightweight'],
      care: 'Hand wash or machine wash on gentle setting with mild detergent.',
      price: 'Affordable Range',
      occasions: 'Daily Wear, Summer Events'
    },
    {
      id: 4,
      name: 'Chanderi',
      description: 'A traditional weave from Madhya Pradesh, Chanderi sarees offer exquisite transparency with intricate gold zari work.',
      image: 'https://images.unsplash.com/photo-1599643478549-b8d0c2250b11?w=600&h=400&fit=crop',
      features: ['Lightweight & transparent', 'Intricate zari work', 'Traditional charm', 'Elegant sheen'],
      care: 'Dry clean or hand wash carefully. Air dry in shade.',
      price: 'Premium Range',
      occasions: 'Special Occasions, Weddings'
    },
    {
      id: 5,
      name: 'Banarasi',
      description: 'The king of sarees, Banarasi silk features rich gold and silver zari work with intricate brocade patterns.',
      image: 'https://images.unsplash.com/photo-1581091160550-2173dba999ef?w=600&h=400&fit=crop',
      features: ['Heavy gold zari work', 'Intricate brocade', 'Royal appearance', 'Investment piece'],
      care: 'Dry clean only. Store in cool, dry place with moth balls.',
      price: 'Luxury Range',
      occasions: 'Weddings, Festivals, Royal Events'
    },
    {
      id: 6,
      name: 'Organza',
      description: 'Sheer and elegant, organza sarees are perfect for modern celebrations with a contemporary twist on traditional wear.',
      image: 'https://images.unsplash.com/photo-1585487472066-80ec4915d312?w=600&h=400&fit=crop',
      features: ['Sheer & elegant', 'Lightweight', 'Perfect for layering', 'Modern aesthetic'],
      care: 'Hand wash in cool water with mild detergent. Air dry.',
      price: 'Mid Range',
      occasions: 'Cocktail Parties, Modern Events'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Saree Fabric Guide - AVIRA UDUPU</title>
        <meta name="description" content="Discover our premium saree fabrics - from pure silk to cotton. Learn about each fabric type, care instructions, and perfect occasions." />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-80 md:h-96 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=500&fit=crop"
            alt="Fabric Guide"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-blue-900/60 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4">Fabric Guide</h1>
              <p className="text-xl md:text-2xl font-crimson">Explore the Perfect Fabric for Your Style</p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-6">Understanding Saree Fabrics</h2>
            <p className="text-lg text-royal-blue font-crimson leading-relaxed mb-8">
              The choice of fabric defines the character and comfort of your saree. At AVIRA UDUPU, we work with the finest fabrics sourced from trusted mills, each selected for its quality, durability, and aesthetic appeal. Let us guide you through our premium fabric collection.
            </p>
          </div>
        </section>

        {/* Fabrics Showcase */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            {/* Main Fabric Display */}
            <div className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg shadow-2xl h-96">
                  <img
                    src={fabrics[activeFabric].image}
                    alt={fabrics[activeFabric].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {fabrics[activeFabric].price}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
                    {fabrics[activeFabric].name}
                  </h2>
                  <p className="text-lg text-royal-blue font-crimson mb-6 leading-relaxed">
                    {fabrics[activeFabric].description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-xl font-playfair font-bold text-primary mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {fabrics[activeFabric].features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-royal-blue font-crimson">
                          <span className="text-accent mr-3">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Care Instructions */}
                  <div className="bg-white rounded-lg p-4 mb-6 border-l-4 border-accent">
                    <h3 className="font-playfair font-bold text-primary mb-2">Care Instructions</h3>
                    <p className="text-royal-blue font-crimson text-sm">{fabrics[activeFabric].care}</p>
                  </div>

                  {/* Occasions */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-playfair font-bold text-primary mb-2">Perfect For</h3>
                    <p className="text-royal-blue font-crimson text-sm">{fabrics[activeFabric].occasions}</p>
                  </div>
                </div>
              </div>

              {/* Fabric Selector Tabs */}
              <div className="flex flex-wrap gap-3 justify-center">
                {fabrics.map((fabric, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFabric(idx)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      activeFabric === idx
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-primary border-2 border-primary hover:bg-blue-50'
                    }`}
                  >
                    {fabric.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Chart */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-12 text-center">Fabric Comparison</h2>
            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="w-full bg-white">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-playfair font-bold">Fabric Type</th>
                    <th className="px-6 py-4 text-left font-playfair font-bold">Comfort</th>
                    <th className="px-6 py-4 text-left font-playfair font-bold">Durability</th>
                    <th className="px-6 py-4 text-left font-playfair font-bold">Sheen</th>
                    <th className="px-6 py-4 text-left font-playfair font-bold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {fabrics.map((fabric, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-playfair font-semibold text-primary">{fabric.name}</td>
                      <td className="px-6 py-4 text-royal-blue">{'⭐'.repeat(Math.floor(Math.random() * 3) + 3)}</td>
                      <td className="px-6 py-4 text-royal-blue">{'⭐'.repeat(Math.floor(Math.random() * 3) + 3)}</td>
                      <td className="px-6 py-4 text-royal-blue">{'⭐'.repeat(Math.floor(Math.random() * 3) + 3)}</td>
                      <td className="px-6 py-4 text-royal-blue text-sm">{fabric.occasions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Care Tips Section */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-12 text-center">Saree Care Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Washing',
                  icon: '🧼',
                  tips: 'Always check care labels. Hand wash delicate fabrics. Use cold water with gentle detergent.'
                },
                {
                  title: 'Drying',
                  icon: '☀️',
                  tips: 'Air dry in shade to preserve colors. Avoid direct sunlight. Never wring out sarees.'
                },
                {
                  title: 'Storage',
                  icon: '🧵',
                  tips: 'Store in cool, dry place. Use wooden hangers or fold carefully. Keep away from moisture.'
                },
                {
                  title: 'Ironing',
                  icon: '🔥',
                  tips: 'Iron on medium heat. Place cloth between saree and iron. Iron from inside for delicate work.'
                },
                {
                  title: 'Stain Removal',
                  icon: '✨',
                  tips: 'Treat stains immediately. Use mild soap solution. Test on hidden area first.'
                },
                {
                  title: 'Scent',
                  icon: '🌸',
                  tips: 'Store with dried flowers or lavender. Avoid mothballs if possible. Refresh regularly.'
                }
              ].map((tip, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h3 className="text-xl font-playfair font-bold text-primary mb-3">{tip.title}</h3>
                  <p className="text-royal-blue font-crimson">{tip.tips}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary to-blue-900">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Find Your Perfect Fabric</h2>
            <p className="text-lg md:text-xl mb-8 font-crimson">
              Explore our complete collection and discover the fabric that matches your style and comfort preferences.
            </p>
            <button className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Shop by Fabric
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FabricGuide;
