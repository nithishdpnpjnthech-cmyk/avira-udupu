package com.eduprajna.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "product")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    @Column(length = 100)
    private String category;
    
    @Column(length = 100)
    private String subcategory;

    @Column(length = 50)
    private String fabric;
    
    private Boolean inStock;
    
    @Column(nullable = false)
    private Boolean isActive = true;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<com.eduprajna.entity.ProductVariant> variants = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public String getFabric() {
        return fabric;
    }

    public void setFabric(String fabric) {
        this.fabric = fabric;
    }

    public Boolean getInStock() {
        return inStock;
    }

    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public List<com.eduprajna.entity.ProductVariant> getVariants() {
        return variants;
    }

    public void setVariants(List<com.eduprajna.entity.ProductVariant> variants) {
        this.variants = variants;
    }

    public void addVariant(com.eduprajna.entity.ProductVariant variant) {
        if (variant == null) return;
        variant.setProduct(this);
        this.variants.add(variant);
    }

    public void removeVariant(com.eduprajna.entity.ProductVariant variant) {
        if (variant == null) return;
        variant.setProduct(null);
        this.variants.remove(variant);
    }

    // Helper methods for backward compatibility - get data from first variant
    public Double getPrice() {
        if (variants != null && !variants.isEmpty()) {
            return variants.get(0).getPrice();
        }
        return null;
    }

    public Double getOriginalPrice() {
        if (variants != null && !variants.isEmpty()) {
            return variants.get(0).getOriginalPrice();
        }
        return null;
    }

    public Integer getStockQuantity() {
        if (variants != null && !variants.isEmpty()) {
            return variants.get(0).getStockQuantity();
        }
        return 0;
    }

    public String getImageUrl() {
        if (variants != null && !variants.isEmpty()) {
            return variants.get(0).getMainImage();
        }
        return null;
    }

    public String getColor() {
        if (variants != null && !variants.isEmpty()) {
            return variants.get(0).getColor();
        }
        return null;
    }

    public void setStockQuantity(Integer stockQuantity) {
        if (variants != null && !variants.isEmpty()) {
            variants.get(0).setStockQuantity(stockQuantity);
        }
    }

    public void setPrice(Double price) {
        if (variants != null && !variants.isEmpty()) {
            variants.get(0).setPrice(price);
        }
    }

    public void setOriginalPrice(Double originalPrice) {
        if (variants != null && !variants.isEmpty()) {
            variants.get(0).setOriginalPrice(originalPrice);
        }
    }
}
