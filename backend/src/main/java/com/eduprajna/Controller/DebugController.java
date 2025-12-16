package com.eduprajna.Controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eduprajna.entity.Product;
import com.eduprajna.entity.ProductVariant;
import com.eduprajna.repository.ProductRepository;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    private final ProductRepository productRepository;

    public DebugController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/products")
    public List<Map<String, Object>> listProducts() {
        return productRepository.findAll().stream()
            .map(this::toSummary)
            .collect(Collectors.toList());
    }

    private Map<String, Object> toSummary(Product p) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", p.getId());
        map.put("name", p.getName());
        map.put("inStock", p.getInStock());
        map.put("category", p.getCategory());
        map.put("variants", p.getVariants().stream().map(this::variantSummary).collect(Collectors.toList()));
        return map;
    }

    private Map<String, Object> variantSummary(ProductVariant v) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", v.getId());
        map.put("price", v.getPrice());
        map.put("originalPrice", v.getOriginalPrice());
        map.put("stockQuantity", v.getStockQuantity());
        map.put("inStock", v.getInStock());
        map.put("color", v.getColor());
        map.put("weightValue", v.getWeightValue());
        map.put("weightUnit", v.getWeightUnit());
        map.put("mainImage", v.getMainImage());
        return map;
    }
}
