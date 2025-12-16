package com.eduprajna.Controller;

import com.eduprajna.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for testing email functionality
 */
@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "http://localhost:3000")
public class EmailTestController {
    
    private static final Logger logger = LoggerFactory.getLogger(EmailTestController.class);
    
    @Autowired
    private EmailService emailService;
    
    /**
     * POST /api/email/test
     * Send a test email to verify SMTP configuration
     * 
     * Body: { "email": "test@example.com" }
     * Response: { "success": true, "message": "Test email sent successfully" }
     */
    @PostMapping("/test")
    public ResponseEntity<?> sendTestEmail(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(createResponse(false, "Email address is required"));
            }
            
            boolean sent = emailService.sendTestEmail(email);
            
            if (sent) {
                logger.info("Test email sent successfully to: {}", email);
                return ResponseEntity.ok(createResponse(true, 
                    "Test email sent successfully to " + email + ". Please check your inbox."));
            } else {
                logger.error("Failed to send test email to: {}", email);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createResponse(false, "Failed to send test email. Please check server logs."));
            }
        } catch (Exception e) {
            logger.error("Error in sendTestEmail endpoint", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createResponse(false, "An error occurred: " + e.getMessage()));
        }
    }
    
    /**
     * POST /api/email/order-confirmation
     * Send order confirmation email (for testing)
     * 
     * Body: { "email": "customer@example.com", "name": "John Doe", "orderId": "ORD123", "total": "2500" }
     */
    @PostMapping("/order-confirmation")
    public ResponseEntity<?> sendOrderConfirmation(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String name = request.get("name");
            String orderId = request.get("orderId");
            String total = request.get("total");
            
            if (email == null || name == null || orderId == null || total == null) {
                return ResponseEntity.badRequest()
                    .body(createResponse(false, "Missing required fields: email, name, orderId, total"));
            }
            
            boolean sent = emailService.sendOrderConfirmationEmail(email, name, orderId, total);
            
            if (sent) {
                logger.info("Order confirmation email sent to: {} for order: {}", email, orderId);
                return ResponseEntity.ok(createResponse(true, "Order confirmation email sent successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createResponse(false, "Failed to send order confirmation email"));
            }
        } catch (Exception e) {
            logger.error("Error in sendOrderConfirmation endpoint", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createResponse(false, "An error occurred: " + e.getMessage()));
        }
    }
    
    /**
     * POST /api/email/order-status
     * Send order status update email (for testing)
     * 
     * Body: { "email": "customer@example.com", "name": "John Doe", "orderId": "ORD123", "status": "SHIPPED" }
     */
    @PostMapping("/order-status")
    public ResponseEntity<?> sendOrderStatus(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String name = request.get("name");
            String orderId = request.get("orderId");
            String status = request.get("status");
            
            if (email == null || name == null || orderId == null || status == null) {
                return ResponseEntity.badRequest()
                    .body(createResponse(false, "Missing required fields: email, name, orderId, status"));
            }
            
            boolean sent = emailService.sendOrderStatusEmail(email, name, orderId, status);
            
            if (sent) {
                logger.info("Order status email sent to: {} for order: {} with status: {}", email, orderId, status);
                return ResponseEntity.ok(createResponse(true, "Order status email sent successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createResponse(false, "Failed to send order status email"));
            }
        } catch (Exception e) {
            logger.error("Error in sendOrderStatus endpoint", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createResponse(false, "An error occurred: " + e.getMessage()));
        }
    }
    
    /**
     * Helper method to create response
     */
    private Map<String, Object> createResponse(boolean success, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", message);
        return response;
    }
}
