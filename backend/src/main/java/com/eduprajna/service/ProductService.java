package com.eduprajna.service;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eduprajna.entity.Product;
import com.eduprajna.repository.CartItemRepository;
import com.eduprajna.repository.OrderItemRepository;
import com.eduprajna.repository.ProductRepository;
import com.eduprajna.repository.WishlistItemRepository;

@Service
public class ProductService {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private WishlistItemRepository wishlistItemRepository;
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(ProductService.class);

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Transactional
    public com.eduprajna.entity.ProductVariant updateVariantStock(Long productId, Long variantId, Integer stockQuantity) {
        if (stockQuantity == null) {
            throw new IllegalArgumentException("stockQuantity is required");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        com.eduprajna.entity.ProductVariant variant = product.getVariants().stream()
                .filter(v -> v.getId().equals(variantId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException(
                        "Variant not found with id: " + variantId + " for product " + productId));

        variant.setStockQuantity(stockQuantity);
        variant.setInStock(stockQuantity > 0);

        // Update product-level availability flag based on any variant
        boolean anyInStock = product.getVariants().stream().anyMatch(v -> {
            Integer qty = v.getStockQuantity();
            Boolean explicit = v.getInStock();
            return (qty != null && qty > 0) || Boolean.TRUE.equals(explicit);
        });
        product.setInStock(anyInStock);

        productRepository.save(product);
        entityManager.flush();
        return variant;
    }

    @Transactional
    public Product updateProduct(Long id, Product incomingProduct) {
        // Fetch the existing managed product
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Update product-level fields
        if (incomingProduct.getName() != null)
            existing.setName(incomingProduct.getName());
        if (incomingProduct.getDescription() != null)
            existing.setDescription(incomingProduct.getDescription());
        if (incomingProduct.getCategory() != null)
            existing.setCategory(incomingProduct.getCategory());
        if (incomingProduct.getSubcategory() != null)
            existing.setSubcategory(incomingProduct.getSubcategory());
        if (incomingProduct.getFabric() != null)
            existing.setFabric(incomingProduct.getFabric());
        if (incomingProduct.getInStock() != null)
            existing.setInStock(incomingProduct.getInStock());
        if (incomingProduct.getIsActive() != null)
            existing.setIsActive(incomingProduct.getIsActive());

        // Update variants if provided. Prefer ID match, fall back to color to handle
        // payloads
        // that omit variant IDs (common in older clients) so stock updates still
        // persist.
        if (incomingProduct.getVariants() != null && !incomingProduct.getVariants().isEmpty()) {
            for (com.eduprajna.entity.ProductVariant incomingVariant : incomingProduct.getVariants()) {
                com.eduprajna.entity.ProductVariant target = null;

                log.info("Variant update request: product={}, incomingId={}, color={}, stock={}, price={}",
                        id,
                        incomingVariant.getId(),
                        incomingVariant.getColor(),
                        incomingVariant.getStockQuantity(),
                        incomingVariant.getPrice());

                // 1) Primary match on ID
                if (incomingVariant.getId() != null) {
                    for (com.eduprajna.entity.ProductVariant existingVariant : existing.getVariants()) {
                        if (existingVariant.getId().equals(incomingVariant.getId())) {
                            target = existingVariant;
                            break;
                        }
                    }
                }

                // 2) Fallback match on color (case-insensitive) when ID is missing
                if (target == null && incomingVariant.getColor() != null) {
                    final String incomingColor = incomingVariant.getColor().trim().toLowerCase();
                    for (com.eduprajna.entity.ProductVariant existingVariant : existing.getVariants()) {
                        final String existingColor = existingVariant.getColor() == null ? ""
                                : existingVariant.getColor().trim().toLowerCase();
                        if (!existingColor.isEmpty() && existingColor.equals(incomingColor)) {
                            target = existingVariant;
                            log.info("Matched variant by color: product={}, color={}, existingId={}", id, incomingColor,
                                    existingVariant.getId());
                            break;
                        }
                    }
                }

                // 3) If still not found, attach as a new variant to keep payload and DB in sync
                if (target == null) {
                    target = new com.eduprajna.entity.ProductVariant();
                    target.setProduct(existing);
                    existing.getVariants().add(target);
                    log.info("No match found; creating new variant for product={}, color={}, incomingId={}", id,
                            incomingVariant.getColor(), incomingVariant.getId());
                }

                // Update all variant fields when provided in payload
                if (incomingVariant.getPrice() != null) {
                    target.setPrice(incomingVariant.getPrice());
                }
                if (incomingVariant.getOriginalPrice() != null) {
                    target.setOriginalPrice(incomingVariant.getOriginalPrice());
                }
                if (incomingVariant.getStockQuantity() != null) {
                    target.setStockQuantity(incomingVariant.getStockQuantity());
                }
                if (incomingVariant.getInStock() != null) {
                    target.setInStock(incomingVariant.getInStock());
                }
                if (incomingVariant.getColor() != null) {
                    target.setColor(incomingVariant.getColor());
                }
                if (incomingVariant.getWeightValue() != null) {
                    target.setWeightValue(incomingVariant.getWeightValue());
                }
                if (incomingVariant.getWeightUnit() != null) {
                    target.setWeightUnit(incomingVariant.getWeightUnit());
                }
                if (incomingVariant.getMainImage() != null) {
                    target.setMainImage(incomingVariant.getMainImage());
                }
                if (incomingVariant.getSubImage1() != null) {
                    target.setSubImage1(incomingVariant.getSubImage1());
                }
                if (incomingVariant.getSubImage2() != null) {
                    target.setSubImage2(incomingVariant.getSubImage2());
                }
                if (incomingVariant.getSubImage3() != null) {
                    target.setSubImage3(incomingVariant.getSubImage3());
                }

                log.info("Variant persisted: product={}, targetId={}, color={}, stock={}",
                        id,
                        target.getId(),
                        target.getColor(),
                        target.getStockQuantity());
            }
        }

        // Save and flush to ensure changes are persisted immediately
        Product saved = productRepository.save(existing);
        entityManager.flush();
        return saved;
    }

    @Transactional
    public Product save(Product p) {
        if (p.getVariants() != null) {
            for (com.eduprajna.entity.ProductVariant v : p.getVariants()) {
                v.setProduct(p);
            }
            // Only set product-level fields from first variant if this is a NEW product
            // with single variant
            // Don't do this for existing products with multiple variants
            if (!p.getVariants().isEmpty() && (p.getId() == null || p.getVariants().size() == 1)) {
                com.eduprajna.entity.ProductVariant first = p.getVariants().get(0);
                if (p.getId() == null) { // Only set on new products
                    p.setPrice(first.getPrice());
                    p.setOriginalPrice(first.getOriginalPrice());
                    p.setStockQuantity(first.getStockQuantity());
                }
            }
        }
        Product saved = productRepository.save(p);
        entityManager.flush();
        return saved;
    }

    @Transactional
    public void delete(Long id) {
        // First find the product
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            // Delete all related entities first to avoid foreign key constraint violations
            cartItemRepository.deleteByProduct(product);
            orderItemRepository.deleteByProduct(product);
            wishlistItemRepository.deleteByProduct(product);

            // Now delete the product itself
            productRepository.deleteById(id);
        }
    }

    public Product getById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

}