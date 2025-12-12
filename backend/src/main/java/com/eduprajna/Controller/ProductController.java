package com.eduprajna.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.eduprajna.entity.Product;
import com.eduprajna.entity.ProductVariant;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.eduprajna.service.ProductService;
import com.eduprajna.service.StorageService;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"}, allowCredentials = "true")

public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private StorageService storageService;

    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        Product p = productService.getById(id);
        if (p == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(p);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Product> create(
            @RequestPart("product") Product p,
            @RequestParam(required = false) Map<String, MultipartFile> allFiles,
            @RequestPart(value = "variants", required = false) String variantsJson
    ) throws IOException {
        // Handle variants if provided
        if (variantsJson != null && !variantsJson.isBlank()) {
            List<ProductVariant> variants = new ObjectMapper().readValue(variantsJson, new TypeReference<List<ProductVariant>>() {});
            for (int i = 0; i < variants.size(); i++) {
                ProductVariant variant = variants.get(i);

                if (allFiles != null) {
                    MultipartFile variantMainImage = allFiles.get("variant_" + i + "_mainImage");
                    MultipartFile variantSubImage1 = allFiles.get("variant_" + i + "_subImage1");
                    MultipartFile variantSubImage2 = allFiles.get("variant_" + i + "_subImage2");
                    MultipartFile variantSubImage3 = allFiles.get("variant_" + i + "_subImage3");

                    if (variantMainImage != null && !variantMainImage.isEmpty()) {
                        variant.setMainImage(storageService.store(variantMainImage));
                    }
                    if (variantSubImage1 != null && !variantSubImage1.isEmpty()) {
                        variant.setSubImage1(storageService.store(variantSubImage1));
                    }
                    if (variantSubImage2 != null && !variantSubImage2.isEmpty()) {
                        variant.setSubImage2(storageService.store(variantSubImage2));
                    }
                    if (variantSubImage3 != null && !variantSubImage3.isEmpty()) {
                        variant.setSubImage3(storageService.store(variantSubImage3));
                    }
                }

                p.addVariant(variant);
            }
        }

        Product saved = productService.save(p);
        return ResponseEntity.ok(saved);
    }

    @PutMapping(value = "/{id}", consumes = {"application/json"})
    public ResponseEntity<Product> updateJson(
            @PathVariable Long id,
            @RequestBody Product p
    ) {
        p.setId(id);
        
        System.out.println("=== JSON Update for Product ID: " + id + " ===");
        System.out.println("Incoming variants count: " + (p.getVariants() != null ? p.getVariants().size() : 0));
        if (p.getVariants() != null) {
            for (int i = 0; i < p.getVariants().size(); i++) {
                com.eduprajna.entity.ProductVariant v = p.getVariants().get(i);
                System.out.println("Incoming Variant " + i + ": ID=" + v.getId() + ", Color=" + v.getColor() + ", Stock=" + v.getStockQuantity());
            }
        }
        
        // Fetch existing product to merge variants properly
        Product existing = productService.getById(id);
        if (existing != null && existing.getVariants() != null && !existing.getVariants().isEmpty()) {
            System.out.println("Existing variants count: " + existing.getVariants().size());
            for (int i = 0; i < existing.getVariants().size(); i++) {
                com.eduprajna.entity.ProductVariant v = existing.getVariants().get(i);
                System.out.println("Existing Variant " + i + ": ID=" + v.getId() + ", Color=" + v.getColor() + ", Stock=" + v.getStockQuantity());
            }
            
            // If incoming product has variants, update them by ID or replace
            if (p.getVariants() != null && !p.getVariants().isEmpty()) {
                // Create a map of existing variants by ID for quick lookup
                java.util.Map<Long, com.eduprajna.entity.ProductVariant> existingVariantsMap = 
                    new java.util.HashMap<>();
                for (com.eduprajna.entity.ProductVariant v : existing.getVariants()) {
                    if (v.getId() != null) {
                        existingVariantsMap.put(v.getId(), v);
                    }
                }
                
                System.out.println("Existing variants map size: " + existingVariantsMap.size());
                
                // Create a map of incoming variants by ID
                java.util.Map<Long, com.eduprajna.entity.ProductVariant> incomingVariantsMap = 
                    new java.util.HashMap<>();
                java.util.List<com.eduprajna.entity.ProductVariant> newVariants = 
                    new java.util.ArrayList<>();
                
                for (com.eduprajna.entity.ProductVariant incomingVariant : p.getVariants()) {
                    if (incomingVariant.getId() != null) {
                        incomingVariantsMap.put(incomingVariant.getId(), incomingVariant);
                    } else {
                        newVariants.add(incomingVariant);
                    }
                }
                
                System.out.println("Incoming variants map size: " + incomingVariantsMap.size());
                System.out.println("New variants: " + newVariants.size());
                
                // Preserve all existing variants and update only those present in incoming
                java.util.List<com.eduprajna.entity.ProductVariant> finalVariants = 
                    new java.util.ArrayList<>();
                
                for (com.eduprajna.entity.ProductVariant existingVariant : existing.getVariants()) {
                    if (incomingVariantsMap.containsKey(existingVariant.getId())) {
                        System.out.println("Updating variant ID: " + existingVariant.getId());
                        // Update this variant with incoming data
                        com.eduprajna.entity.ProductVariant incomingVariant = incomingVariantsMap.get(existingVariant.getId());
                        
                        if (incomingVariant.getPrice() != null) {
                            existingVariant.setPrice(incomingVariant.getPrice());
                        }
                        if (incomingVariant.getOriginalPrice() != null) {
                            existingVariant.setOriginalPrice(incomingVariant.getOriginalPrice());
                        }
                        if (incomingVariant.getStockQuantity() != null) {
                            existingVariant.setStockQuantity(incomingVariant.getStockQuantity());
                            System.out.println("Updated stock for variant ID " + existingVariant.getId() + " to " + existingVariant.getStockQuantity());
                        }
                        if (incomingVariant.getInStock() != null) {
                            existingVariant.setInStock(incomingVariant.getInStock());
                        }
                        if (incomingVariant.getColor() != null) {
                            existingVariant.setColor(incomingVariant.getColor());
                        }
                    } else {
                        System.out.println("Keeping variant ID: " + existingVariant.getId() + " unchanged");
                    }
                    finalVariants.add(existingVariant);
                }
                
                // Add any new variants
                finalVariants.addAll(newVariants);
                
                System.out.println("Final variants count: " + finalVariants.size());
                
                p.setVariants(finalVariants);
            } else {
                // No variants in incoming, keep existing
                p.setVariants(existing.getVariants());
            }
        }
        
        return ResponseEntity.ok(productService.save(p));
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Product> updateMultipart(
            @PathVariable Long id,
            @RequestPart("product") Product p,
            @RequestParam(required = false) Map<String, MultipartFile> allFiles,
            @RequestPart(value = "variants", required = false) String variantsJson
    ) throws IOException {
        p.setId(id);

        // Handle variants if provided
        if (variantsJson != null && !variantsJson.isBlank()) {
            List<ProductVariant> variants = new ObjectMapper().readValue(variantsJson, new TypeReference<List<ProductVariant>>() {});
            // Clear existing variants
            p.getVariants().clear();
            
                // Add new variants
                for (int i = 0; i < variants.size(); i++) {
                    ProductVariant variant = variants.get(i);

                if (allFiles != null) {
                    MultipartFile variantMainImage = allFiles.get("variant_" + i + "_mainImage");
                    MultipartFile variantSubImage1 = allFiles.get("variant_" + i + "_subImage1");
                    MultipartFile variantSubImage2 = allFiles.get("variant_" + i + "_subImage2");
                    MultipartFile variantSubImage3 = allFiles.get("variant_" + i + "_subImage3");

                    if (variantMainImage != null && !variantMainImage.isEmpty()) {
                        variant.setMainImage(storageService.store(variantMainImage));
                    }
                    if (variantSubImage1 != null && !variantSubImage1.isEmpty()) {
                        variant.setSubImage1(storageService.store(variantSubImage1));
                    }
                    if (variantSubImage2 != null && !variantSubImage2.isEmpty()) {
                        variant.setSubImage2(storageService.store(variantSubImage2));
                    }
                    if (variantSubImage3 != null && !variantSubImage3.isEmpty()) {
                        variant.setSubImage3(storageService.store(variantSubImage3));
                    }
                }

                p.addVariant(variant);
            }
        }
        
        return ResponseEntity.ok(productService.save(p));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // Load product to delete variant images before deleting DB row
        try {
            Product existing = productService.getById(id);
            if (existing != null && existing.getVariants() != null) {
                for (com.eduprajna.entity.ProductVariant variant : existing.getVariants()) {
                    // Delete all variant images
                    if (variant.getMainImage() != null) {
                        String filename = storageService.extractFilenameFromUrl(variant.getMainImage());
                        if (filename != null) storageService.delete(filename);
                    }
                    if (variant.getSubImage1() != null) {
                        String filename = storageService.extractFilenameFromUrl(variant.getSubImage1());
                        if (filename != null) storageService.delete(filename);
                    }
                    if (variant.getSubImage2() != null) {
                        String filename = storageService.extractFilenameFromUrl(variant.getSubImage2());
                        if (filename != null) storageService.delete(filename);
                    }
                    if (variant.getSubImage3() != null) {
                        String filename = storageService.extractFilenameFromUrl(variant.getSubImage3());
                        if (filename != null) storageService.delete(filename);
                    }
                }
            }
        } catch (Exception ignored) {
            // Ignore errors during image deletion; proceed to delete DB row
        }
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Serve uploaded images via API so frontend can display them
    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        // If filename contains path separators, extract just the filename
        if (filename.contains("/")) {
            filename = filename.substring(filename.lastIndexOf('/') + 1);
        }
        Resource resource = storageService.loadAsResource(filename);
        MediaType contentType = storageService.probeMediaType(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CACHE_CONTROL, "max-age=86400, public")
                .contentType(contentType)
                .body(resource);
    }

    // List all stored image filenames (or absolute URLs)
    @GetMapping("/images")
    public ResponseEntity<List<String>> listImages() {
        List<String> files = storageService.listAll();
        // Convert filenames to API URLs for convenience
        List<String> urls = files.stream()
                .map(name -> "/api/admin/products/images/" + name)
                .collect(Collectors.toList());
        return ResponseEntity.ok(urls);
    }
}