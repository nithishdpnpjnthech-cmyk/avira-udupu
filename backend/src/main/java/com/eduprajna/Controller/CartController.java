package com.eduprajna.Controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eduprajna.dto.CartItemDTO;
import com.eduprajna.entity.CartItem;
import com.eduprajna.entity.User;
import com.eduprajna.service.CartService;
import com.eduprajna.service.UserService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"}, allowCredentials = "true")
public class CartController {
    private static final Logger logger = LoggerFactory.getLogger(CartController.class);
    
    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    private User requireUser(String email) { 
        return userService.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found: " + email)); 
    }
    
    private CartItemDTO toDTO(CartItem ci) {
        CartItemDTO dto = new CartItemDTO();
        dto.id = ci.getId();
        dto.productId = ci.getProduct().getId();
        dto.name = ci.getProduct().getName();
        dto.imageUrl = ci.getVariantImage() != null ? ci.getVariantImage() : ci.getProduct().getImageUrl();
        dto.quantity = ci.getQuantity();
        dto.price = ci.getPriceAtAdd();
        dto.lineTotal = (ci.getPriceAtAdd() != null ? ci.getPriceAtAdd() : 0.0) * ci.getQuantity();
        
        // Include variant information
        dto.variantId = ci.getVariantId();
        dto.variantName = ci.getVariantName();
        dto.variantImage = ci.getVariantImage();
        dto.variantColor = ci.getVariantColor();
        dto.weightValue = ci.getWeightValue();
        dto.weightUnit = ci.getWeightUnit();
        
        return dto;
    }

    @GetMapping
    public ResponseEntity<?> getCart(@RequestParam("email") String email) {
        try {
            logger.debug("Getting cart for user: {}", email);
            
            if (email == null || email.trim().isEmpty()) {
                logger.warn("Empty email provided for cart request");
                return ResponseEntity.badRequest().body("Email is required");
            }
            
            // Get or create user
            User user;
            try {
                user = requireUser(email);
            } catch (RuntimeException e) {
                logger.debug("User not found: {}, returning empty cart", email);
                // Return empty cart for new users instead of error
                return ResponseEntity.ok(List.of());
            }
            
            List<CartItemDTO> items = cartService.getCart(user).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
            
            logger.debug("Retrieved {} cart items for user: {}", items.size(), email);
            return ResponseEntity.ok(items);
        } catch (RuntimeException e) {
            logger.error("User not found for cart request: {}", email, e);
            return ResponseEntity.ok(List.of()); // Return empty cart instead of error
        } catch (Exception e) {
            logger.error("Error getting cart for user: {}", email, e);
            return ResponseEntity.status(500).body("Internal server error while getting cart");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestParam("email") String email, @RequestBody Map<String, Object> body) {
        try {
            logger.debug("Adding item to cart for user: {}", email);
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            
            if (body.get("productId") == null) {
                return ResponseEntity.badRequest().body("Product ID is required");
            }
            
            // Handle both numeric and string product IDs
            Long productId;
            Long inferredVariantId = null;
            Object productIdObj = body.get("productId");
            if (productIdObj instanceof Number) {
                productId = ((Number) productIdObj).longValue();
            } else if (productIdObj instanceof String) {
                String productIdStr = (String) productIdObj;
                String[] parts = productIdStr.split("-");
                String numericPart = parts[0];
                productId = Long.parseLong(numericPart);
                if (parts.length > 1) {
                    try {
                        inferredVariantId = Long.parseLong(parts[1]);
                    } catch (NumberFormatException ignored) {}
                }
            } else {
                return ResponseEntity.badRequest().body("Invalid product ID format");
            }
            
            int quantity = body.get("quantity") == null ? 1 : ((Number) body.get("quantity")).intValue();
            
            // Extract variant information if provided
            Long variantId = body.get("variantId") != null
                ? Long.valueOf(((Number) body.get("variantId")).longValue())
                : inferredVariantId;
            String variantName = body.get("variant") != null ? (String) body.get("variant") : null;
            String variantImage = body.get("variantImage") != null ? (String) body.get("variantImage") : null;
            String variantColor = body.get("variantColor") != null ? (String) body.get("variantColor") : null;
            Double weightValue = body.get("weightValue") != null ? ((Number) body.get("weightValue")).doubleValue() : null;
            String weightUnit = body.get("weightUnit") != null ? (String) body.get("weightUnit") : null;
            Double price = body.get("price") != null ? ((Number) body.get("price")).doubleValue() : null;
            
            // Get or create user
            User user;
            try {
                user = requireUser(email);
            } catch (RuntimeException e) {
                logger.warn("User not found: {}, creating new user", email);
                user = userService.createUserIfNotExists(email);
            }
            
            CartItem ci = cartService.addToCart(user, productId, quantity, variantId, variantName, variantImage, variantColor, weightValue, weightUnit, price);
            
            logger.info("Added product {} to cart for user: {}", productId, email);
            return ResponseEntity.ok(toDTO(ci));
        } catch (IllegalArgumentException e) {
            logger.warn("Bad request while adding to cart: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            logger.warn("Validation failed while adding to cart: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (java.util.NoSuchElementException e) {
            logger.error("Product not found: {}", e.getMessage());
            return ResponseEntity.status(404).body("Product not found");
        } catch (RuntimeException e) {
            logger.error("Error adding to cart for user: {}, error: {}", email, e.getMessage(), e);
            return ResponseEntity.status(404).body("Product not found or out of stock");
        } catch (Exception e) {
            logger.error("Error adding to cart for user: {}", email, e);
            return ResponseEntity.status(500).body("Internal server error while adding to cart");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateQuantity(@RequestParam("email") String email, @RequestBody Map<String, Object> body) {
        try {
            logger.debug("Updating cart quantity for user: {}", email);
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            
            if (body.get("productId") == null || body.get("quantity") == null) {
                return ResponseEntity.badRequest().body("Product ID and quantity are required");
            }

            Object productIdObj = body.get("productId");
            Long productId;
            Long inferredVariantId = null;
            if (productIdObj instanceof Number) {
                productId = ((Number) productIdObj).longValue();
            } else if (productIdObj instanceof String) {
                String productIdStr = (String) productIdObj;
                String[] parts = productIdStr.split("-");
                productId = Long.parseLong(parts[0]);
                if (parts.length > 1) {
                    try {
                        inferredVariantId = Long.parseLong(parts[1]);
                    } catch (NumberFormatException ignored) {}
                }
            } else {
                return ResponseEntity.badRequest().body("Invalid product ID format");
            }

            int quantity = ((Number) body.get("quantity")).intValue();
            Long variantId = body.get("variantId") != null
                ? Long.valueOf(((Number) body.get("variantId")).longValue())
                : inferredVariantId;
            String variantName = body.get("variant") != null ? (String) body.get("variant") : null;
            String variantColor = body.get("variantColor") != null ? (String) body.get("variantColor") : null;
            
            User user = requireUser(email);
            CartItem ci = cartService.updateQuantity(user, productId, quantity, variantId, variantName, variantColor);
            
            logger.info("Updated cart item quantity for product {} for user: {}", productId, email);
            return ResponseEntity.ok(toDTO(ci));
        } catch (IllegalArgumentException e) {
            logger.warn("Bad request while updating cart: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            logger.warn("Validation failed while updating cart: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            logger.error("Error updating cart for user: {}", email, e);
            return ResponseEntity.status(404).body("User, product, or cart item not found");
        } catch (Exception e) {
            logger.error("Error updating cart for user: {}", email, e);
            return ResponseEntity.status(500).body("Internal server error while updating cart");
        }
    }

    @PostMapping("/remove")
    public ResponseEntity<?> remove(@RequestParam("email") String email, @RequestBody Map<String, Object> body) {
        try {
            logger.debug("Removing item from cart for user: {}", email);
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            
            if (body.get("productId") == null) {
                return ResponseEntity.badRequest().body("Product ID is required");
            }

            Object productIdObj = body.get("productId");
            Long productId;
            Long inferredVariantId = null;
            if (productIdObj instanceof Number) {
                productId = ((Number) productIdObj).longValue();
            } else if (productIdObj instanceof String) {
                String productIdStr = (String) productIdObj;
                String[] parts = productIdStr.split("-");
                productId = Long.parseLong(parts[0]);
                if (parts.length > 1) {
                    try {
                        inferredVariantId = Long.parseLong(parts[1]);
                    } catch (NumberFormatException ignored) {}
                }
            } else {
                return ResponseEntity.badRequest().body("Invalid product ID format");
            }

            Long variantId = body.get("variantId") != null ? ((Number) body.get("variantId")).longValue() : inferredVariantId;
            String variantName = body.get("variant") != null ? (String) body.get("variant") : null;
            String variantColor = body.get("variantColor") != null ? (String) body.get("variantColor") : null;
            User user = requireUser(email);
            cartService.removeItem(user, productId, variantId, variantName, variantColor);
            
            logger.info("Removed product {} from cart for user: {}", productId, email);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            logger.error("Error removing from cart for user: {}", email, e);
            return ResponseEntity.status(404).body("User or product not found");
        } catch (Exception e) {
            logger.error("Error removing from cart for user: {}", email, e);
            return ResponseEntity.status(500).body("Internal server error while removing from cart");
        }
    }
}
