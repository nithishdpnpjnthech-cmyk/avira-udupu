import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ 
  product, 
  onQuickView, 
  onAddToCart, 
  onAddToWishlist, 
  isInWishlist = false 
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [isHovered, setIsHovered] = useState(false);

  // Stock handling
  const rawStock = (selectedVariant?.stock ?? product?.stockQuantity);
  const hasExplicitStock = rawStock !== undefined && rawStock !== null;
  const availableStock = hasExplicitStock ? Math.max(0, parseInt(rawStock, 10) || 0) : Number.POSITIVE_INFINITY;
  const inStock = (product?.inStock !== false) && (hasExplicitStock ? availableStock > 0 : true);

  const calculateSavings = (originalPrice, salePrice) => {
    if (!originalPrice || !salePrice || originalPrice <= salePrice) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  const currentPrice = parseFloat(selectedVariant?.salePrice || selectedVariant?.price || product?.salePrice || product?.price) || 0;
  const originalPrice = parseFloat(selectedVariant?.originalPrice || product?.originalPrice) || 0;
  const savings = calculateSavings(originalPrice, currentPrice);

  // Handle Add to Cart for products with variants
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!inStock || availableStock <= 0) {
      alert('This product is out of stock');
      return;
    }
    const cartItem = {
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      variant: 'Default',
      category: product.category,
      brand: product.brand,
    };
    onAddToCart?.(cartItem);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    onAddToWishlist?.(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <div 
      className="group saree-card bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-premium"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative zoom-hover">
        <Link to={`/product-detail-page/${product.id}`}>
          <div className="relative w-full h-80 lg:h-96 overflow-hidden">
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <Icon name="Image" size={48} className="text-blue-300" />
              </div>
            )}
            <Image
              src={product?.image || product?.imageUrl || '/assets/images/no_image.png'}
              alt={product?.name || 'Product'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {!inStock && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-serif font-semibold">
              Out of Stock
            </span>
          )}
          {savings > 0 && (
            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-serif font-semibold">
              {savings}% OFF
            </span>
          )}
          {product?.isNew && (
            <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-serif font-semibold">
              New
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button
            onClick={handleWishlistToggle}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
              isInWishlist 
                ? 'bg-accent text-white' 
                : 'bg-white text-royal-blue hover:bg-accent hover:text-white'
            }`}
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Icon name="Heart" size={16} className={isInWishlist ? 'fill-current' : ''} />
          </button>
          
          <button
            onClick={handleQuickView}
            className="w-10 h-10 bg-white text-royal-blue rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all duration-300"
            title="Quick View"
          >
            <Icon name="Eye" size={16} />
          </button>
        </div>

        {/* Add to Cart Button - Overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`w-full font-serif font-semibold py-3 rounded-full transition-all duration-300 ${
              inStock 
                ? 'premium-gradient text-white hover:shadow-gold-lg transform hover:scale-105' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 lg:p-6">
        {/* Category/Fabric */}
        <div className="mb-2">
          <span className="text-xs text-primary font-serif font-semibold uppercase tracking-wide">
            {product?.fabric || product?.category || 'Premium Saree'}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-serif font-semibold text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          <Link to={`/product-detail-page/${product.id}`} className="hover:underline">
            {product?.name || 'Untitled Product'}
          </Link>
        </h3>

        {/* Brand */}
        {product?.brand && (
          <p className="text-sm text-blue-800 font-serif mb-2">
            by {product.brand}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-serif font-bold text-secondary">
            ₹{currentPrice.toLocaleString()}
          </span>
          {originalPrice > currentPrice && (
            <span className="text-sm text-blue-800 line-through font-serif">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon 
              key={star} 
              name="Star" 
              size={14} 
              className={`${
                star <= (product?.rating || 4.5) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`} 
            />
          ))}
          <span className="text-xs text-blue-800 ml-1 font-serif">
            ({product?.reviewCount || '4.8'})
          </span>
        </div>

        {/* Stock Status */}
        {hasExplicitStock && (
          <div className="mb-3">
            {availableStock > 0 ? (
              <span className="text-xs text-green-600 font-serif font-semibold">
                {availableStock <= 5 ? `Only ${availableStock} left!` : 'In Stock'}
              </span>
            ) : (
              <span className="text-xs text-red-600 font-serif font-semibold">
                Out of Stock
              </span>
            )}
          </div>
        )}

        {/* Features/Highlights */}
        {product?.features && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.features.slice(0, 2).map((feature, index) => (
              <span 
                key={index}
                className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-serif"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
