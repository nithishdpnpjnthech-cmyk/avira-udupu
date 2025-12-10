import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>About AVIRA UDUPU - Premium Handcrafted Sarees</title>
        <meta name="description" content="Discover the story behind AVIRA UDUPU - handcrafted luxury sarees blending traditional artistry with modern elegance." />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200&h=600&fit=crop"
            alt="AVIRA UDUPU Brand"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-900/70 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4">Our Story</h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto font-crimson">
                Where Tradition Meets Elegance
              </p>
            </div>
          </div>
        </section>

        {/* About Section 1 */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-6">
                  A Legacy of Craftsmanship
                </h2>
                <p className="text-royal-blue text-lg font-crimson mb-4 leading-relaxed">
                  In the heart of Udupi, where the gentle sea breeze carries whispers of ancient traditions, AVIRA UDUPU was born from a deep reverence for the art of handloom weaving. What started as a small workshop has blossomed into a celebration of South India's rich textile heritage.
                </p>
                <p className="text-royal-blue text-lg font-crimson mb-6 leading-relaxed">
                  Each saree in our collection tells a story – of skilled hands that have mastered their craft over generations, of threads that carry the dreams of artisans, and of designs that honor both tradition and the evolving taste of the modern woman.
                </p>
                <p className="text-royal-blue text-lg font-crimson mb-6 leading-relaxed">
                  We don't just create garments; we preserve a legacy. Every weave, every motif, and every finishing touch reflects our commitment to keeping the flame of traditional craftsmanship burning bright in an ever-changing world.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1595428777223-ef52624120d2?w=600&h=700&fit=crop"
                  alt="Model in Premium Saree"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-primary/20">
                  <p className="font-playfair font-bold text-primary text-lg">Handcrafted with Love</p>
                  <p className="text-royal-blue text-sm">Authentic Traditional Techniques</p>
                </div>
              </div>
            </div>
          </div>
        </section>





        {/* Founders Story */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-6">The Heart Behind AVIRA UDUPU</h2>
              <p className="text-royal-blue text-lg max-w-3xl mx-auto font-crimson">
                A story of passion, purpose, and an unshakeable belief in the power of traditional craftsmanship.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="/assets/images/founder.jpg"
                  alt="Founder of Avira Udupu"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-playfair font-bold text-primary mb-6">Threads of Destiny</h3>
                <p className="text-royal-blue text-lg mb-6 font-crimson leading-relaxed">
                  Mrs. Kamakshi Hegde's journey with textiles began in her grandmother's home, where she watched mesmerized as intricate patterns emerged from simple wooden looms. Those early memories planted a seed that would grow into AVIRA UDUPU.
                </p>
                <p className="text-royal-blue text-lg mb-6 font-crimson leading-relaxed">
                  In 1998, with a small team of master weavers and an unwavering commitment to quality, she established our first workshop. Her vision was simple yet profound: to ensure that the extraordinary skills of South Indian artisans would not only survive but thrive in the modern world.
                </p>
                <p className="text-royal-blue text-lg mb-6 font-crimson leading-relaxed">
                  Today, that vision continues to guide us. Every saree we create carries forward Mrs. Hegde's original intention—to honor the past while creating beauty for the future.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Process Section */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-16 text-center">
              The Journey of a Saree
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Inspiration', desc: 'Drawing from nature, culture, and timeless motifs that tell stories' },
                { step: 2, title: 'Preparation', desc: 'Selecting the finest threads and preparing the loom with care' },
                { step: 3, title: 'Creation', desc: 'Days of meticulous weaving, where each thread finds its place' },
                { step: 4, title: 'Perfection', desc: 'Careful inspection and finishing touches by experienced hands' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 text-center">
                  <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-royal-blue font-crimson text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary to-blue-900">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Begin Your Journey With Us
            </h2>
            <p className="text-lg md:text-xl mb-8 font-crimson max-w-2xl mx-auto">
              Discover the beauty of handcrafted sarees that carry stories, heritage, and the touch of master artisans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/product-collection-grid"
                className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Our Collections
              </Link>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Connect With Us
              </Link>
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
