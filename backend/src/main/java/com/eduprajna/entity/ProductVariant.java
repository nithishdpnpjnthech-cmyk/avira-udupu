package com.eduprajna.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "product_variants")
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double price;
    private Double originalPrice;
    private Integer stockQuantity;

    @Column(length = 50)
    private String color;

    @Column(length = 500)
    private String mainImage;

    @Column(length = 500)
    private String subImage1;

    @Column(length = 500)
    private String subImage2;

    @Column(length = 500)
    private String subImage3;

    private Double weightValue;

    @Column(length = 50)
    private String weightUnit;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getMainImage() { return mainImage; }
    public void setMainImage(String mainImage) { this.mainImage = mainImage; }

    public String getSubImage1() { return subImage1; }
    public void setSubImage1(String subImage1) { this.subImage1 = subImage1; }

    public String getSubImage2() { return subImage2; }
    public void setSubImage2(String subImage2) { this.subImage2 = subImage2; }

    public String getSubImage3() { return subImage3; }
    public void setSubImage3(String subImage3) { this.subImage3 = subImage3; }

    public Double getWeightValue() { return weightValue; }
    public void setWeightValue(Double weightValue) { this.weightValue = weightValue; }

    public String getWeightUnit() { return weightUnit; }
    public void setWeightUnit(String weightUnit) { this.weightUnit = weightUnit; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
}
