import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProductInfo = ({ product, onAddToCart, onAddToWishlist, isInWishlist, onVariantChange }) => {
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
  const [quantity, setQuantity] = useState(1);

  // Determine available stock from selected variant
  const availableStock = selectedVariant?.stock ?? 0;
  const inStock = availableStock > 0;

  const handleVariantChange = (variant) => {
    if (variant) {
      setSelectedVariant(variant);
      // Notify parent component about variant change for image update
      if (onVariantChange) {
        onVariantChange(variant);
      }
      // Reset quantity when variant changes to avoid accidentally adding wrong counts
      setQuantity(1);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    // Cap quantity between 1 and available stock
    if (newQuantity >= 1 && newQuantity <= Math.max(availableStock, 0)) {
      setQuantity(newQuantity);
    } else if (newQuantity > availableStock) {
      alert('Stock limit exceeded');
      setQuantity(Math.max(availableStock, 1));
    }
  };

  const handleAddToCart = () => {
    if (!inStock || availableStock <= 0) {
      alert('This product is out of stock');
      return;
    }
    if (quantity > availableStock) {
      alert('Stock limit exceeded');
      return;
    }
    
    console.log('ProductInfo - Selected Variant:', {
      id: selectedVariant?.id,
      color: selectedVariant?.color,
      price: selectedVariant?.price,
      mainImage: selectedVariant?.mainImage,
      stock: selectedVariant?.stock
    });
    
    // Provide enough info for both logged-in (server) and guest (local) carts
    onAddToCart({
      id: product?.id,
      productId: product?.id,
      name: product?.name,
      price: parseFloat(selectedVariant?.price ?? product?.variants?.[0]?.price ?? 0) || 0,
      originalPrice: parseFloat(selectedVariant?.originalPrice ?? product?.variants?.[0]?.originalPrice ?? selectedVariant?.price ?? product?.variants?.[0]?.price ?? 0) || 0,
      image: selectedVariant?.mainImage || product?.images?.[0] || product?.imageUrl || product?.image,
      variant: selectedVariant?.color || selectedVariant?.weight || 'Default',
      color: selectedVariant?.color,
      stockQuantity: availableStock,
      variantId: selectedVariant?.id,
      quantity: quantity
    });
  };

  const discountPercentage = Math.round(
    selectedVariant?.originalPrice
      ? ((selectedVariant?.originalPrice - selectedVariant?.price) / selectedVariant?.originalPrice) * 100
      : 0
  );

  // Numeric prices
  const unitPrice = parseFloat(selectedVariant?.price) || 0;
  const totalPrice = unitPrice * (parseInt(quantity) || 1);

  const variantOptions = product?.variants?.map(variant => ({
    value: variant?.id,
    label: `${variant?.weight} - ₹${variant?.price?.toFixed(2)}`
  }));

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
          {product?.name}
        </h1>
        <p className="font-body text-muted-foreground">
          {product?.shortDescription}
        </p>
      </div>

      {/* Product Badges */}
      <div className="flex flex-wrap gap-2">
        {product?.badges?.map((badge, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-caption font-medium bg-accent/10 text-accent border border-accent/20"
          >
            {badge}
          </span>
        ))}
      </div>
      {/* Pricing */}
        <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-2xl text-foreground">
            ₹{unitPrice.toFixed(2)}
          </span>
          {selectedVariant?.originalPrice > selectedVariant?.price && (
            <>
              <span className="font-data text-lg text-muted-foreground line-through">
                ₹{(parseFloat(selectedVariant?.originalPrice) || 0).toFixed(2)}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium bg-success/10 text-success">
                Save {Math.round(discountPercentage)}%
              </span>
            </>
          )}
        </div>
        <p className="font-caption text-sm text-muted-foreground">
          Inclusive of all taxes
        </p>

        {quantity > 1 && (
          <p className="font-heading font-semibold text-lg text-foreground">
            Total: ₹{totalPrice.toFixed(2)}
          </p>
        )}
      </div>
      {/* Color Variant Selection */}
      {product?.variants && product?.variants?.length > 0 && (
        <div className="space-y-3">
          <label className="font-body font-semibold text-foreground">
            Select Color:
          </label>
          <div className="flex flex-wrap gap-3">
            {product?.variants?.map((variant, index) => {
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
                  onClick={() => handleVariantChange(variant)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    selectedVariant?.id === variant?.id
                      ? 'border-royal-blue ring-2 ring-royal-blue ring-offset-2'
                      : 'border-gray-300 hover:border-royal-blue'
                  }`}
                  style={{ backgroundColor: bgColor }}
                  title={variant?.color || `Color ${index + 1}`}
                />
              );
            })}
          </div>
          {selectedVariant?.color && (
            <p className="text-sm text-muted-foreground">
              Selected: <span className="font-medium text-foreground">{selectedVariant.color}</span>
            </p>
          )}
        </div>
      )}
      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="font-body font-medium text-foreground">Quantity:</span>
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="w-12 text-center font-data font-medium">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= availableStock}
              className="w-10 h-10 flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="default"
            onClick={handleAddToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            className="flex-1"
            disabled={!inStock}
          >
            {`Add to Cart - ₹${((parseFloat(selectedVariant?.price) || 0) * (quantity || 1)).toFixed(2)}`}
          </Button>
          <Button
            variant="outline"
            onClick={onAddToWishlist}
            iconName={isInWishlist ? "Heart" : "Heart"}
            size="icon"
            className={isInWishlist ? "text-destructive" : ""}
          >
          </Button>
        </div>
      </div>
      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-success' : 'bg-destructive'}`}></div>
        {inStock ? (
          <span className="font-caption text-sm text-success font-medium">
            In Stock ({availableStock} units available)
          </span>
        ) : (
          <span className="font-caption text-sm text-destructive font-medium">
            Out of Stock
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;