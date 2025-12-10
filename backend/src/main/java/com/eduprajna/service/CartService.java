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

    public List<CartItem> getCart(User user) {
        return cartRepo.findByUser(user);
    }

    public CartItem addToCart(User user, Long productId, int quantity, Long variantId, String variantName, Double weightValue, String weightUnit, Double price) {
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
        Optional<CartItem> existing = cartRepo.findByUserAndProduct(user, product);
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
        return addToCart(user, productId, quantity, null, null, null, null, null);
    }
    
    public void removeItemByProductId(User user, Long productId) {
        List<CartItem> items = cartRepo.findByUser(user);
        for (CartItem item : items) {
            if (item.getProduct().getId().equals(productId)) {
                cartRepo.delete(item);
            }
        }
    }

    public CartItem updateQuantity(User user, Long productId, int quantity) {
        Product product = productRepo.findById(productId).orElseThrow();
        CartItem item = cartRepo.findByUserAndProduct(user, product).orElseThrow();
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

    public void removeItem(User user, Long productId) {
        Product product = productRepo.findById(productId).orElseThrow();
        cartRepo.findByUserAndProduct(user, product).ifPresent(ci -> cartRepo.deleteById(ci.getId()));
    }

    public void clearCart(User user) {
        cartRepo.deleteByUser(user);
    }
}
