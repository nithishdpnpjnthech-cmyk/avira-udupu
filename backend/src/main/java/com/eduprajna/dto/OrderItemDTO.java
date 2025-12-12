package com.eduprajna.dto;

import com.eduprajna.entity.OrderItem;
import com.eduprajna.entity.Product;
import com.eduprajna.entity.ProductVariant;

/**
 * Data Transfer Object for OrderItem entity
 * Prevents circular references and lazy loading issues in JSON serialization
 */
public class OrderItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productImage;
    private Double productPrice;
    private Integer quantity;
    private Double price; // Price at time of order
    private Long variantId; // ID of the selected variant
    private String variantName; // Name of the selected variant

    // Default constructor
    public OrderItemDTO() {}

    // Constructor from OrderItem entity
    public OrderItemDTO(OrderItem orderItem) {
        this.id = orderItem.getId();
        this.quantity = orderItem.getQuantity();
        this.price = orderItem.getPrice();
        this.variantId = orderItem.getVariantId();
        this.variantName = orderItem.getVariantName();
        
        // Handle product information safely
        if (orderItem.getProduct() != null) {
            Product product = orderItem.getProduct();
            this.productId = product.getId();
            this.productName = product.getName();

            // Prefer the selected variant's image; fall back to product image
            String imageUrl = product.getImageUrl();
            if (orderItem.getVariantId() != null && product.getVariants() != null) {
                ProductVariant variant = product.getVariants().stream()
                    .filter(v -> v.getId() != null && v.getId().equals(orderItem.getVariantId()))
                    .findFirst()
                    .orElse(null);
                if (variant != null) {
                    String variantImage = firstNonEmpty(
                        variant.getMainImage(),
                        variant.getSubImage1(),
                        variant.getSubImage2(),
                        variant.getSubImage3()
                    );
                    if (variantImage != null && !variantImage.isBlank()) {
                        imageUrl = variantImage;
                    }
                }
            }
            this.productImage = imageUrl;

            this.productPrice = product.getPrice() != null ? product.getPrice().doubleValue() : 0.0;
        }
    }

    private String firstNonEmpty(String... candidates) {
        if (candidates == null) return null;
        for (String candidate : candidates) {
            if (candidate != null && !candidate.isBlank()) {
                return candidate;
            }
        }
        return null;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    
    public String getProductImage() { return productImage; }
    public void setProductImage(String productImage) { this.productImage = productImage; }
    
    public Double getProductPrice() { return productPrice; }
    public void setProductPrice(Double productPrice) { this.productPrice = productPrice; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public Long getVariantId() { return variantId; }
    public void setVariantId(Long variantId) { this.variantId = variantId; }
    
    public String getVariantName() { return variantName; }
    public void setVariantName(String variantName) { this.variantName = variantName; }
}
