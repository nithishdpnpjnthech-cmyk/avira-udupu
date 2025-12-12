package com.eduprajna.dto;

public class CartItemDTO {
  public Long id;
  public Long productId;
  public String name;
  public String imageUrl;
  public Integer quantity;
  public Double price;
  public Double lineTotal;
  
  // Variant fields
  public Long variantId;
  public String variantName;
  public String variantImage;
  public String variantColor;
  public Double weightValue;
  public String weightUnit;
}


