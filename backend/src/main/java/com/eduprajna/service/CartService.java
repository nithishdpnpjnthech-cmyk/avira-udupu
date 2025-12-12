package com.eduprajna.service;

import com.eduprajna.entity.CartItem;
import com.eduprajna.entity.Product;
import com.eduprajna.entity.User;
import com.eduprajna.repository.CartItemRepository;
import com.eduprajna.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartItemRepository cartRepo;
    private final ProductRepository productRepo;

    public CartService(CartItemRepository cartRepo, ProductRepository productRepo) {
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }

    private Optional<CartItem> findExistingItem(User user, Product product, Long variantId, String variantName, String variantColor) {
        if (variantId != null) {
            return cartRepo.findByUserAndProductAndVariantId(user, product, variantId);
        }
        if (variantName != null && !variantName.isBlank()) {
            return cartRepo.findByUserAndProductAndVariantName(user, product, variantName);
        }
        if (variantColor != null && !variantColor.isBlank()) {
            return cartRepo.findByUserAndProductAndVariantColor(user, product, variantColor);
        }
        return cartRepo.findByUserAndProductAndVariantIdIsNull(user, product);
    }

    public List<CartItem> getCart(User user) {
        return cartRepo.findByUser(user);
    }

    public CartItem addToCart(User user, Long productId, int quantity, Long variantId, String variantName, String variantImage, String variantColor, Double weightValue, String weightUnit, Double price) {
        Product product = productRepo.findById(productId).orElseThrow();
        Integer stockQty = product.getStockQuantity();
        boolean explicitlyOutOfStock = product.getInStock() != null && !product.getInStock();
        if (explicitlyOutOfStock) {
            throw new IllegalStateException("Product is out of stock");
        }
        if (stockQty != null && stockQty <= 0) {
            throw new IllegalStateException("Product is out of stock");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be at least 1");
        }
        Optional<CartItem> existing = findExistingItem(user, product, variantId, variantName, variantColor);
        CartItem item = existing.orElseGet(() -> {
            CartItem ci = new CartItem();
            ci.setUser(user);
            ci.setProduct(product);
            // Use provided price if available, otherwise use product price
            ci.setPriceAtAdd(price != null ? price : (product.getPrice() != null ? product.getPrice().doubleValue() : 0.0));
            ci.setQuantity(0);
            // Store variant information
            ci.setVariantId(variantId);
            ci.setVariantName(variantName);
            ci.setVariantImage(variantImage);
            ci.setVariantColor(variantColor);
            ci.setWeightValue(weightValue);
            ci.setWeightUnit(weightUnit);
            return ci;
        });
        int current = item.getQuantity() == null ? 0 : item.getQuantity();
        int newQty = current + quantity;
        if (stockQty != null && newQty > stockQty) {
            throw new IllegalStateException("Stock limit exceeded. Available: " + stockQty);
        }
        item.setQuantity(Math.max(1, newQty));
        // Update price and variant info if provided
        if (price != null) {
            item.setPriceAtAdd(price);
        }
        if (variantName != null) {
            item.setVariantName(variantName);
        }
        if (variantId != null) {
            item.setVariantId(variantId);
        }
        if (variantImage != null) {
            item.setVariantImage(variantImage);
        }
        if (variantColor != null) {
            item.setVariantColor(variantColor);
        }
        if (weightValue != null) {
            item.setWeightValue(weightValue);
        }
        if (weightUnit != null) {
            item.setWeightUnit(weightUnit);
        }
        return cartRepo.save(item);
    }
    
    // Keep the old signature for backward compatibility
    public CartItem addToCart(User user, Long productId, int quantity) {
        return addToCart(user, productId, quantity, null, null, null, null, null, null, null);
    }

    public CartItem updateQuantity(User user, Long productId, int quantity, Long variantId, String variantName, String variantColor) {
        Product product = productRepo.findById(productId).orElseThrow();
        CartItem item = findExistingItem(user, product, variantId, variantName, variantColor)
            .orElseThrow();
        Integer stockQty = product.getStockQuantity();
        boolean explicitlyOutOfStock = product.getInStock() != null && !product.getInStock();
        if (explicitlyOutOfStock) {
            throw new IllegalStateException("Product is out of stock");
        }
        if (stockQty != null && stockQty <= 0) {
            throw new IllegalStateException("Product is out of stock");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be at least 1");
        }
        if (stockQty != null && quantity > stockQty) {
            throw new IllegalStateException("Stock limit exceeded. Available: " + stockQty);
        }
        item.setQuantity(quantity);
        return cartRepo.save(item);
    }

    // Backward-compatible signature without variant details
    public CartItem updateQuantity(User user, Long productId, int quantity) {
        return updateQuantity(user, productId, quantity, null, null, null);
    }

    public void removeItem(User user, Long productId, Long variantId, String variantName, String variantColor) {
        Product product = productRepo.findById(productId).orElseThrow();
        findExistingItem(user, product, variantId, variantName, variantColor)
            .ifPresent(ci -> cartRepo.deleteById(ci.getId()));
    }

    public void removeItem(User user, Long productId) {
        removeItem(user, productId, null, null, null);
    }

    public void clearCart(User user) {
        cartRepo.deleteByUser(user);
    }
}
