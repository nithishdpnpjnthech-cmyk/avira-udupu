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
  const [displayImage, setDisplayImage] = useState(product?.image || product?.imageUrl || '/assets/images/no_image.png');

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
    onAddToCart?.(product, selectedVariant, 1);
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
      className="group bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link to={`/product-detail-page/${product.id}`}>
        <div className="relative overflow-hidden">
          <div className="relative w-full aspect-[3/4]">
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <Icon name="Image" size={48} className="text-gray-300" />
              </div>
            )}
            <Image
              src={displayImage}
              alt={product?.name || 'Product'}
              className="w-full h-full object-cover"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
          </div>

          {/* Badges - Top Left */}
          {savings > 0 && (
            <div className="absolute top-2 left-2">
              <span className="bg-red-500 text-white px-2.5 py-1 rounded text-xs font-semibold">
                {savings}% OFF
              </span>
            </div>
          )}

          {/* Quick View Button - Center on Hover */}
          <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleQuickView(e);
              }}
              className="bg-royal-blue hover:bg-blue-800 text-white px-6 py-2 rounded font-semibold transition-colors"
            >
              Quick View
            </button>
          </div>

          {/* Wishlist Icon - Top Right */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleWishlistToggle(e);
            }}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow transition-colors ${
              isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Icon name="Heart" size={16} className={isInWishlist ? 'fill-current' : ''} />
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-3">
        {/* Product Name */}
        <Link to={`/product-detail-page/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-royal-blue transition-colors">
            {product?.name || 'Untitled Product'}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon 
              key={star} 
              name="Star" 
              size={12} 
              className={`${
                star <= (product?.rating || 4) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`} 
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product?.reviewCount || 0})
          </span>
        </div>

        {/* Color Label + Swatches on one line (wrap if overflow) */}
        {product?.variants && product.variants.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs text-gray-600">Color:</span>
            <div className="flex gap-1.5 flex-wrap">
            {product.variants.slice(0, 5).map((variant, index) => {
              const colorValue = variant?.color?.toLowerCase() || '';
              const colorMap = {
                'red': '#DC2626',
                'blue': '#2563EB',
                'green': '#16A34A',
                'yellow': '#EAB308',
                'pink': '#EC4899',
                'purple': '#9333EA',
                'black': '#000000',
                'white': '#FFFFFF',
                'gray': '#6B7280',
                'grey': '#6B7280',
                'orange': '#EA580C',
                'brown': '#92400E',
                'gold': '#D97706',
                'silver': '#94A3B8',
                'maroon': '#7F1D1D',
                'navy': '#1E3A8A',
                'beige': '#D4C5B9'
              };
              const bgColor = colorMap[colorValue] || variant?.color || '#D1D5DB';
              
              return (
                <button
                  key={variant?.id || index}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(variant);
                    // Update display image when color variant is clicked
                    const variantImage = variant?.mainImage || product?.image || product?.imageUrl || '/assets/images/no_image.png';
                    setDisplayImage(variantImage);
                    setIsImageLoading(true);
                  }}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedVariant?.id === variant?.id
                      ? 'border-royal-blue ring-2 ring-royal-blue ring-offset-1'
                      : 'border-gray-300 hover:border-royal-blue'
                  }`}
                  style={{ backgroundColor: bgColor }}
                  title={variant?.color || `Color ${index + 1}`}
                />
              );
            })}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{currentPrice.toFixed(2)}
          </span>
          {originalPrice > currentPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Savings Display */}
        {savings > 0 && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="bg-royal-blue/10 text-royal-blue px-2 py-0.5 rounded text-xs font-semibold">
                {savings}% OFF
              </span>
              <span className="text-royal-blue text-xs font-medium">
                You save ₹{(originalPrice - currentPrice).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full py-2.5 rounded font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
            inStock
              ? 'bg-royal-blue hover:bg-blue-800 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Icon name="ShoppingCart" size={16} />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
