import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EmptyCart = () => {
  const sareeCollections = [
    {
      name: 'Mul Cotton Sarees',
      path: '/product-collection-grid?category=mul-cotton-sarees',
      image: 'https://images.unsplash.com/photo-1530023367847-a683933f4177?w=600&h=400&fit=crop',
      description: 'Airy, soft drapes for everyday ease'
    },
    {
      name: 'Linen Sarees',
      path: '/product-collection-grid?category=linen-sarees',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop',
      description: 'Breathable elegance for warm days'
    },
    {
      name: 'Tissue Silk Sarees',
      path: '/product-collection-grid?category=tissue-silk-sarees',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&h=400&fit=crop',
      description: 'Lustrous shimmer with a delicate fall'
    },
    {
      name: 'Kanchipuram Inspired Sarees',
      path: '/product-collection-grid?category=kanchipuram-inspired-sarees',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop',
      description: 'Classic motifs and grand zari borders'
    },
    {
      name: 'Party Wear Sarees',
      path: '/product-collection-grid?category=party-wear-sarees',
      image: 'https://images.unsplash.com/photo-1542293779-9b0b0f2c4e1c?w=600&h=400&fit=crop',
      description: 'Statement drapes for celebrations'
    },
    {
      name: 'Office Wear Sarees',
      path: '/product-collection-grid?category=office-wear-sarees',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop',
      description: 'Polished, lightweight, all-day comfort'
    },
    {
      name: 'Wedding Edit Sarees',
      path: '/product-collection-grid?category=wedding-edit-sarees',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
      description: 'Opulent picks for the big day'
    },
    {
      name: 'Festive Collection',
      path: '/product-collection-grid?category=festive-collection',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop',
      description: 'Vibrant hues for every celebration'
    },
    {
      name: 'Handloom Classics',
      path: '/product-collection-grid?category=handloom-classics',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&h=400&fit=crop',
      description: 'Heritage weaves with timeless charm'
    },
    {
      name: 'Everyday Drapes',
      path: '/product-collection-grid?category=everyday-drapes',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&h=400&fit=crop',
      description: 'Easy-care sarees for daily wear'
    },
    {
      name: 'Signature Collection',
      path: '/product-collection-grid?category=signature-collection',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=400&fit=crop',
      description: 'Distinctive designs exclusive to Avira'
    },
    {
      name: 'Pastel Dreams',
      path: '/product-collection-grid?category=pastel-dreams',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop',
      description: 'Soft palettes with graceful drape'
    }
  ];

  return (
    <div className="text-center py-12">
      {/* Empty Cart Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
        </div>
        <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="font-body text-muted-foreground max-w-md mx-auto">
          Discover the Avira Udupu Collection and find the saree that suits every occasion.
        </p>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Link to="/homepage">
          <Button variant="default" size="lg" iconName="Home" iconPosition="left">
            Go to Homepage
          </Button>
        </Link>
        <Link to="/product-collection-grid">
          <Button variant="outline" size="lg" iconName="Search" iconPosition="left">
            Browse Products
          </Button>
        </Link>
      </div>
      {/* Saree Collections */}
      <div className="mb-12">
        <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
          Avira Udupu Collection
        </h3>
        <p className="font-body text-muted-foreground mb-6">Explore our handpicked saree collections</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sareeCollections?.map((category, index) => (
            <Link
              key={index}
              to={category?.path}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-warm-md transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-body font-semibold text-foreground mb-1">
                  {category?.name}
                </h4>
                <p className="font-caption text-sm text-muted-foreground">
                  {category?.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;