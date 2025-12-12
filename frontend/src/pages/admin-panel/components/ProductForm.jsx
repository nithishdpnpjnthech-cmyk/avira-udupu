  import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/api';
import { X, Plus, Trash2 } from 'lucide-react';
import dataService from '../../../services/dataService';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    fabric: '',
    inStock: true
  });
  
  // Color variants array - each has price, originalPrice, color, stock, and 4 images
  const [colorVariants, setColorVariants] = useState([
    {
      id: Date.now(),
      price: '',
      originalPrice: '',
      color: '',
      stockQuantity: '',
      mainImage: null,
      subImage1: null,
      subImage2: null,
      subImage3: null,
      existingMainImage: '',
      existingSubImage1: '',
      existingSubImage2: '',
      existingSubImage3: ''
    }
  ]);
  
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [fabricSearch, setFabricSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resolveImageUrl = (candidate) => {
    if (!candidate) {
      return '';
    }
    
    // If it's already a full URL, return as-is
    if (candidate.startsWith('http://') || candidate.startsWith('https://') || candidate.startsWith('data:')) {
      return candidate;
    }
    
    // Backend serves uploads at http://localhost:8080/uploads/filename
    // Database stores paths as /uploads/filename
    const baseURL = 'http://localhost:8080';
    
    // If it starts with /uploads, just prepend baseURL
    if (candidate.startsWith('/uploads')) {
      return `${baseURL}${candidate}`;
    }
    
    // If it's just a filename, prepend /uploads/
    if (!candidate.startsWith('/')) {
      return `${baseURL}/uploads/${candidate}`;
    }
    
    // Fallback: treat as relative path from root
    return `${baseURL}${candidate}`;
  };

  useEffect(() => {
    if (product && typeof product === 'object') {
      console.log('ProductForm: Loading product details', {
        productId: product.id,
        name: product.name,
        hasVariants: !!product.variants,
        variantsCount: product.variants?.length || 0,
        variantsData: product.variants
      });

      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category ? (product.category.id || product.category) : '',
        subcategory: product.subcategory || '',
        fabric: product.fabric || '',
        inStock: typeof product.inStock === 'boolean' ? product.inStock : true
      });
      
      // Load existing variants or create from product-level data
      if (product.variants && product.variants.length > 0) {
        console.log('ProductForm: Loading variants from product.variants array');
        setColorVariants(product.variants.map((v, idx) => {
          const resolvedImages = {
            mainImage: resolveImageUrl(v.mainImage || ''),
            subImage1: resolveImageUrl(v.subImage1 || ''),
            subImage2: resolveImageUrl(v.subImage2 || ''),
            subImage3: resolveImageUrl(v.subImage3 || '')
          };
          console.log(`ProductForm: Mapping variant ${idx} (${v.color}):`, {
            id: v.id,
            color: v.color,
            price: v.price,
            originalPrice: v.originalPrice,
            stockQuantity: v.stockQuantity,
            rawImages: {
              mainImage: v.mainImage,
              subImage1: v.subImage1,
              subImage2: v.subImage2,
              subImage3: v.subImage3
            },
            resolvedImages
          });
          return {
            id: v.id || Date.now() + Math.random(),
            price: v.price ? v.price.toString() : '',
            originalPrice: v.originalPrice ? v.originalPrice.toString() : '',
            color: v.color || '',
            stockQuantity: v.stockQuantity ? v.stockQuantity.toString() : '',
            mainImage: null,
            subImage1: null,
            subImage2: null,
            subImage3: null,
            existingMainImage: resolvedImages.mainImage,
            existingSubImage1: resolvedImages.subImage1,
            existingSubImage2: resolvedImages.subImage2,
            existingSubImage3: resolvedImages.subImage3
          };
        }));
      } else {
        // Fallback: create variant from product-level data
        console.log('ProductForm: Creating variant from product-level data (no variants array)');
        setColorVariants([{
          id: Date.now(),
          price: product.price ? product.price.toString() : '',
          originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
          color: product.color || '',
          stockQuantity: product.stockQuantity ? product.stockQuantity.toString() : '',
          mainImage: null,
          subImage1: null,
          subImage2: null,
          subImage3: null,
          existingMainImage: resolveImageUrl(product.mainImage || product.imageUrl || ''),
          existingSubImage1: resolveImageUrl(product.subImage1 || ''),
          existingSubImage2: resolveImageUrl(product.subImage2 || ''),
          existingSubImage3: resolveImageUrl(product.subImage3 || '')
        }]);
      }
    } else {
      console.log('ProductForm: Resetting form for new product');
      setFormData({
        name: '',
        description: '',
        category: '',
        subcategory: '',
        fabric: '',
        ingredients: '',
        benefits: '',
        inStock: true
      });
      setColorVariants([{
        id: Date.now(),
        price: '',
        originalPrice: '',
        color: '',
        stockQuantity: '',
        mainImage: null,
        subImage1: null,
        subImage2: null,
        subImage3: null,
        existingMainImage: '',
        existingSubImage1: '',
        existingSubImage2: '',
        existingSubImage3: ''
      }]);
    }
  }, [product]);

  // Compress image before upload
  const compressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  // Handle image file selection for specific variant
  const handleImageUpload = async (e, variantId, imageType) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Check file size (limit to 5MB before compression)
        if (file.size > 5 * 1024 * 1024) {
          setError('Image file is too large. Please select an image smaller than 5MB.');
          return;
        }
        
        // Compress image if it's larger than 500KB
        let processedFile = file;
        if (file.size > 500 * 1024) {
          console.log('Compressing image from', (file.size / 1024).toFixed(2), 'KB');
          const compressedFile = await compressImage(file);
          processedFile = new File([compressedFile], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          console.log('Compressed to', (processedFile.size / 1024).toFixed(2), 'KB');
        }

        // Update the specific variant's image
        setColorVariants(prev => prev.map(variant => 
          variant.id === variantId 
            ? { ...variant, [imageType]: processedFile }
            : variant
        ));
      } catch (error) {
        console.error('Error processing image:', error);
        setError('Error processing image. Please try again.');
      }
    }
  };

  // Add a new color variant
  const addColorVariant = () => {
    setColorVariants(prev => [...prev, {
      id: Date.now(),
      price: '',
      originalPrice: '',
      color: '',
      stockQuantity: '',
      mainImage: null,
      subImage1: null,
      subImage2: null,
      subImage3: null,
      existingMainImage: '',
      existingSubImage1: '',
      existingSubImage2: '',
      existingSubImage3: ''
    }]);
  };

  // Remove a color variant
  const removeColorVariant = (variantId) => {
    if (colorVariants.length > 1) {
      setColorVariants(prev => prev.filter(v => v.id !== variantId));
    } else {
      setError('At least one color variant is required');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Update variant field
  const updateVariantField = (variantId, field, value) => {
    setColorVariants(prev => prev.map(variant =>
      variant.id === variantId
        ? { ...variant, [field]: value }
        : variant
    ));
  };

  useEffect(() => {
    // Fetch categories from backend
    async function fetchCategories() {
      try {
        const res = await dataService.getCategories();
        setCategories(res.data || res); // support both axios/fetch or mock
      } catch (err) {
        setError('Failed to load categories');
      }
    }
    // Fetch fabrics from backend
    async function fetchFabrics() {
      try {
        const res = await apiClient.get('/fabrics');
        setFabrics(res.data || []);
      } catch (err) {
        console.warn('Failed to load fabrics:', err);
        setFabrics([]);
      }
    }
    fetchCategories();
    fetchFabrics();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      fetchSubcategoriesByCategory(formData.category);
    } else {
      setSubcategories([]);
    }
  }, [formData.category]);

  const fetchSubcategoriesByCategory = async (categoryId) => {
    try {
      const res = await apiClient.get(`/subcategories?categoryId=${categoryId}`);
      setSubcategories(res.data || []);
    } catch (err) {
      console.warn('Failed to load subcategories:', err);
      setSubcategories([]);
    }
  };

  // Filter fabrics based on search
  const filteredFabrics = fabrics.filter(fabric =>
    fabric.name.toLowerCase().includes(fabricSearch.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required product fields
    if (!formData.name || !formData.description || !formData.category || !formData.fabric) {
      setError('Please fill all required product fields');
      setLoading(false);
      return;
    }

    // Validate each color variant
    for (let i = 0; i < colorVariants.length; i++) {
      const variant = colorVariants[i];
      if (!variant.price || !variant.originalPrice || !variant.color || !variant.stockQuantity) {
        setError(`Please fill all required fields for color variant ${i + 1}`);
        setLoading(false);
        return;
      }
      if (!product && !variant.mainImage && !variant.existingMainImage) {
        setError(`Please upload at least the main image for color variant ${i + 1}`);
        setLoading(false);
        return;
      }
    }

    try {
      const productData = {
        ...formData,
        category: formData.category,
        inStock: !!formData.inStock
      };

      // Create FormData for multipart upload
      const form = new FormData();
      form.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
      
      // Collect all variants then append once as JSON array
      const variantsPayload = [];
      colorVariants.forEach((variant, index) => {
        const variantData = {
          price: parseFloat(variant.price),
          originalPrice: parseFloat(variant.originalPrice),
          color: variant.color,
          stockQuantity: parseInt(variant.stockQuantity)
        };
        variantsPayload.push(variantData);

        if (variant.mainImage) form.append(`variant_${index}_mainImage`, variant.mainImage);
        if (variant.subImage1) form.append(`variant_${index}_subImage1`, variant.subImage1);
        if (variant.subImage2) form.append(`variant_${index}_subImage2`, variant.subImage2);
        if (variant.subImage3) form.append(`variant_${index}_subImage3`, variant.subImage3);
      });
      form.append('variants', new Blob([JSON.stringify(variantsPayload)], { type: 'application/json' }));

      if (product) {
        // Edit mode: update product with variants
        await dataService.updateProductWithImage(product.id, form);
      } else {
        // Add mode: create product with variants
        await dataService.addProduct(form, true);
      }
      onSave();
    } catch (err) {
      console.error('Error saving product:', err);
      
      // Handle specific error types
      if (err.message?.includes('413') || err.message?.includes('Content Too Large') || err.message?.includes('MaxUploadSizeExceededException')) {
        setError('Image file is too large. Please select a smaller image or try compressing it further.');
      } else if (err.message?.includes('Network Error') || err.message?.includes('ERR_NETWORK')) {
        setError('Network connection error. Please check your connection and try again.');
      } else if (err.message?.includes('500')) {
        setError('Server error. Please try again later or contact support.');
      } else {
        setError(err.message || 'Failed to save product. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-bold text-foreground">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Product Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Fabric *
              </label>
              <div className="relative">
                <Input
                  value={fabricSearch}
                  onChange={(e) => setFabricSearch(e.target.value)}
                  placeholder="Search fabrics..."
                  className="w-full"
                />
                {fabricSearch && filteredFabrics.length > 0 && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                    {filteredFabrics.map((fabric) => (
                      <div
                        key={fabric.id}
                        onClick={() => {
                          setFormData({ ...formData, fabric: fabric.name });
                          setFabricSearch('');
                        }}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {fabric.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {formData.fabric && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected: <span className="font-medium">{formData.fabric}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, fabric: '' });
                      setFabricSearch('');
                    }}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Category and Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
                disabled={categories.length === 0}
              >
                <option value="">{categories.length === 0 ? 'Loading categories...' : 'Select Category'}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Subcategory {subcategories.length > 0 ? '*' : ''}
              </label>
              {subcategories.length > 0 ? (
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  required={subcategories.length > 0}
                  className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcat) => (
                    <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
                  ))}
                </select>
              ) : (
                <Input
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  placeholder="Enter subcategory (no predefined ones available)"
                />
              )}
            </div>
          </div>

          {/* Color Variants Section */}
          <div className="border-t border-border pt-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Color Variants</h3>
              <Button 
                type="button" 
                onClick={addColorVariant}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add Color Variant
              </Button>
            </div>

            {colorVariants.map((variant, index) => (
              <div key={variant.id} className="mb-6 p-4 border border-border rounded-lg bg-muted/20">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-foreground">Variant {index + 1}</h4>
                  {colorVariants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeColorVariant(variant.id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  )}
                </div>

                {/* Variant Fields: Price, Original Price, Color, Stock */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Price *
                    </label>
                    <Input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariantField(variant.id, 'price', e.target.value)}
                      required
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Original Price *
                    </label>
                    <Input
                      type="number"
                      value={variant.originalPrice}
                      onChange={(e) => updateVariantField(variant.id, 'originalPrice', e.target.value)}
                      required
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Color *
                    </label>
                    <Input
                      value={variant.color}
                      onChange={(e) => updateVariantField(variant.id, 'color', e.target.value)}
                      required
                      placeholder="e.g., Red, Blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Stock *
                    </label>
                    <Input
                      type="number"
                      value={variant.stockQuantity}
                      onChange={(e) => updateVariantField(variant.id, 'stockQuantity', e.target.value)}
                      required
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Variant Images */}
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold text-foreground">Images for {variant.color || 'this variant'}</h5>
                  
                  {/* Main Image */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Main Image *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, variant.id, 'mainImage')}
                      className="w-full px-2 py-1.5 border border-border rounded-md bg-background text-foreground text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {variant.mainImage && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(variant.mainImage)}
                          alt="Main"
                          className="w-20 h-20 object-cover rounded-md border"
                          onError={(e) => { e.currentTarget.src = '/assets/images/no_image.png'; }}
                        />
                      </div>
                    )}
                    {!variant.mainImage && variant.existingMainImage && (
                      <div className="mt-2">
                        <img
                          src={variant.existingMainImage}
                          alt="Main"
                          className="w-20 h-20 object-cover rounded-md border"
                          onError={(e) => { 
                            console.warn('Failed to load main image from URL:', variant.existingMainImage);
                            e.currentTarget.src = '/assets/images/no_image.png'; 
                          }}
                        />
                        <p className="text-xs text-muted-foreground mt-1">Existing image</p>
                      </div>
                    )}
                    {!variant.mainImage && !variant.existingMainImage && (
                      <p className="text-xs text-muted-foreground mt-1">No image uploaded yet</p>
                    )}
                  </div>

                  {/* Sub Images Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Sub Image 1 */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Sub Image 1
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, variant.id, 'subImage1')}
                        className="w-full px-2 py-1 border border-border rounded-md bg-background text-foreground text-xs file:mr-1 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {(variant.subImage1 || variant.existingSubImage1) && (
                        <div className="mt-1">
                          <img
                            src={variant.subImage1 ? URL.createObjectURL(variant.subImage1) : variant.existingSubImage1}
                            alt="Sub 1"
                            className="w-16 h-16 object-cover rounded-md border"
                            onError={(e) => { e.currentTarget.src = '/assets/images/no_image.png'; }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Sub Image 2 */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Sub Image 2
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, variant.id, 'subImage2')}
                        className="w-full px-2 py-1 border border-border rounded-md bg-background text-foreground text-xs file:mr-1 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {variant.subImage2 && (
                        <div className="mt-1">
                          <img
                            src={URL.createObjectURL(variant.subImage2)}
                            alt="Sub 2"
                            className="w-16 h-16 object-cover rounded-md border"
                            onError={(e) => { e.currentTarget.src = '/assets/images/no_image.png'; }}
                          />
                        </div>
                      )}
                      {!variant.subImage2 && variant.existingSubImage2 && (
                        <div className="mt-1">
                          <img
                            src={variant.existingSubImage2}
                            alt="Sub 2"
                            className="w-16 h-16 object-cover rounded-md border"
                            onError={(e) => { 
                              console.warn('Failed to load sub image 2:', variant.existingSubImage2);
                              e.currentTarget.src = '/assets/images/no_image.png'; 
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Sub Image 3 */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Sub Image 3
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, variant.id, 'subImage3')}
                        className="w-full px-2 py-1 border border-border rounded-md bg-background text-foreground text-xs file:mr-1 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {variant.subImage3 && (
                        <div className="mt-1">
                          <img
                            src={URL.createObjectURL(variant.subImage3)}
                            alt="Sub 3"
                            className="w-16 h-16 object-cover rounded-md border"
                            onError={(e) => { e.currentTarget.src = '/assets/images/no_image.png'; }}
                          />
                        </div>
                      )}
                      {!variant.subImage3 && variant.existingSubImage3 && (
                        <div className="mt-1">
                          <img
                            src={variant.existingSubImage3}
                            alt="Sub 3"
                            className="w-16 h-16 object-cover rounded-md border"
                            onError={(e) => { 
                              console.warn('Failed to load sub image 3:', variant.existingSubImage3);
                              e.currentTarget.src = '/assets/images/no_image.png'; 
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Description * (You can include features here)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              placeholder="Enter product description and features. You can add 'Key Features:' followed by your feature list."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tip: Add features by writing "Key Features:" followed by your features in separate lines
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="w-4 h-4 text-primary border-border rounded"
            />
            <label className="text-sm font-medium text-foreground">
              In Stock
            </label>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;