import apiClient from './api';
import cache from './simpleCache';

const productApi = {
  async getAll(params = {}) {
    try {
      const { forceRefresh, ...query } = params;
      const cacheKey = `products:${JSON.stringify(query)}`;
      const fetchProducts = async () => {
  console.log('ProductAPI: Fetching all products with params:', query);
  const res = await import('./api').then(m => m.getWithRetry('/admin/products', { params: query }));
        console.log('ProductAPI: Successfully fetched products:', res.data?.length || 0);
        return res.data;
      };

      if (forceRefresh) {
        const fresh = await fetchProducts();
        cache.setCache(cacheKey, fresh, 30 * 1000, true);
        return fresh;
      }

      const { cached, fresh } = cache.staleWhileRevalidate(cacheKey, fetchProducts, 30 * 1000, true);

      if (cached) return cached;
      return await fresh;
    } catch (error) {
      console.error('ProductAPI: Failed to fetch products:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      // Provide meaningful error message
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to fetch products';
      
      throw new Error(`Unable to load products: ${errorMessage}`);
    }
  },

  async getById(productId, options = {}) {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      const { forceRefresh = false } = options;
      const cacheKey = `product:${productId}`;
      const fetchProduct = async () => {
  console.log('ProductAPI: Fetching product by ID:', productId);
  const res = await import('./api').then(m => m.getWithRetry(`/admin/products/${productId}`));
        console.log('ProductAPI: Successfully fetched product:', res.data?.name || res.data?.id);
        return res.data;
      };

      if (forceRefresh) {
        const fresh = await fetchProduct();
        cache.setCache(cacheKey, fresh, 30 * 1000, true);
        return fresh;
      }

      const { cached, fresh } = cache.staleWhileRevalidate(cacheKey, fetchProduct, 30 * 1000, true);

      if (cached) return cached;
      return await fresh;
    } catch (error) {
      console.error('ProductAPI: Failed to fetch product by ID:', productId, {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      if (error.response?.status === 404) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to fetch product';
      
      throw new Error(`Unable to load product: ${errorMessage}`);
    }
  },

  async add(productPayload) {
    try {
      if (!productPayload) {
        throw new Error('Product data is required');
      }
      
      console.log('ProductAPI: Adding new product:', productPayload.name || 'Unnamed Product');
      const res = await apiClient.post('/admin/products', productPayload);
      console.log('ProductAPI: Successfully added product:', res.data?.id);
      // Invalidate caches so subsequent fetches see the new product immediately
      cache.clearCache?.('products:{}');
      return res.data;
    } catch (error) {
      console.error('ProductAPI: Failed to add product:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        payload: productPayload
      });
      
      if (error.response?.status === 400) {
        const validationErrors = error.response?.data?.errors || error.response?.data?.message;
        throw new Error(`Invalid product data: ${validationErrors || 'Please check all required fields'}`);
      }
      
      if (error.response?.status === 403) {
        throw new Error('You do not have permission to add products');
      }
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to add product';
      
      throw new Error(`Unable to add product: ${errorMessage}`);
    }
  },

  async update(productId, productPayload) {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }
      if (!productPayload) {
        throw new Error('Product data is required');
      }
      
      console.log('ProductAPI: Updating product:', productId, productPayload.name || 'Unnamed Product');
      const res = await apiClient.put(`/admin/products/${productId}`, productPayload);
      console.log('ProductAPI: Successfully updated product:', productId);
      // Evict cached listings and the specific product to avoid stale variant stock
      cache.clearCache?.('products:{}');
      cache.clearCache?.(`product:${productId}`);
      return res.data;
    } catch (error) {
      console.error('ProductAPI: Failed to update product:', productId, {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        payload: productPayload
      });
      
      if (error.response?.status === 404) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      
      if (error.response?.status === 400) {
        const validationErrors = error.response?.data?.errors || error.response?.data?.message;
        throw new Error(`Invalid product data: ${validationErrors || 'Please check all required fields'}`);
      }
      
      if (error.response?.status === 403) {
        throw new Error('You do not have permission to update products');
      }
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to update product';
      
      throw new Error(`Unable to update product: ${errorMessage}`);
    }
  },

  async updateVariantStock(productId, variantId, stockQuantity) {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }
      if (!variantId) {
        throw new Error('Variant ID is required');
      }
      if (stockQuantity === undefined || stockQuantity === null) {
        throw new Error('Stock quantity is required');
      }

      console.log('ProductAPI: Updating variant stock:', { productId, variantId, stockQuantity });
      const res = await apiClient.put(`/admin/products/${productId}/variants/${variantId}/stock`, { stockQuantity });
      cache.clearCache?.('products:{}');
      cache.clearCache?.(`product:${productId}`);
      return res.data;
    } catch (error) {
      console.error('ProductAPI: Failed to update variant stock:', { productId, variantId, stockQuantity, error });
      const errorMessage = error.response?.data?.message ||
                          error.response?.data?.error ||
                          error.message ||
                          'Failed to update variant stock';
      throw new Error(`Unable to update variant stock: ${errorMessage}`);
    }
  },

  async remove(productId) {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }
      
      console.log('ProductAPI: Removing product:', productId);
      const res = await apiClient.delete(`/admin/products/${productId}`);
      console.log('ProductAPI: Successfully removed product:', productId);
      cache.clearCache?.('products:{}');
      cache.clearCache?.(`product:${productId}`);
      return res.data;
    } catch (error) {
      console.error('ProductAPI: Failed to remove product:', productId, {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      if (error.response?.status === 404) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      
      if (error.response?.status === 403) {
        throw new Error('You do not have permission to delete products');
      }
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to delete product';
      
      throw new Error(`Unable to delete product: ${errorMessage}`);
    }
  }
};

export default productApi;
