package com.eduprajna.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

/**
 * Service for sending emails
 */
@Service
public class EmailService {
    
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.host:smtp.gmail.com}")
    private String mailHost;
    
    @Value("${spring.mail.username:}")
    private String mailUsername;
    
    @Value("${spring.mail.password:}")
    private String mailPassword;
    
    /**
     * Send password reset email with reset link
     * 
     * @param recipientEmail User's email address
     * @param username User's username
     * @param resetLink Link containing reset token
     * @return true if email sent successfully, false otherwise
     */
    public boolean sendPasswordResetEmail(String recipientEmail, String username, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            // Use the authenticated Gmail sender to avoid SPF/DMARC rejections
            message.setFrom("keerthudarshu06@gmail.com");
            message.setTo(recipientEmail);
            message.setSubject("Avira Udupu - Password Reset Request");
            
            String emailBody = buildPasswordResetEmailBody(username, resetLink, recipientEmail);
            message.setText(emailBody);
            
            if (!sendWithFallback(message)) {
                throw new MailSendException("Primary and fallback SMTP send failed");
            }
            logger.info("Password reset email sent successfully to: {}", recipientEmail);
            return true;
            
        } catch (Exception e) {
            logger.error("Failed to send password reset email to: {}. Error: {} | Cause: {}", 
                recipientEmail, e.getMessage(), e.getCause() != null ? e.getCause().getMessage() : "No cause", e);
            return false;
        }
    }
    
    
    
    
    
    /**
     * Build the email body for password reset
     */
    private String buildPasswordResetEmailBody(String username, String resetLink, String email) {
        return "Hello " + username + ",\n\n" +
               "We received a request to reset your password. Click the link below to reset your password:\n\n" +
               resetLink + "\n\n" +
               "This link will expire in 24 hours.\n\n" +
               "Your Account Details:\n" +
               "- Username: " + username + "\n" +
               "- Email: " + email + "\n\n" +
               "If you did not request a password reset, please ignore this email.\n\n" +
               "Best regards,\n" +
               "Avira Udupu Support Team";
    }
    
    /**
     * Send account credentials via email
     * 
     * @param recipientEmail User's email
     * @param username User's username
     * @param password User's password
     * @return true if email sent successfully
     */
    public boolean sendCredentialsEmail(String recipientEmail, String username, String password) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            // Use the authenticated Gmail sender to avoid SPF/DMARC rejections
            message.setFrom("keerthudarshu06@gmail.com");
            message.setTo(recipientEmail);
            message.setSubject("Avira Udupu - Your Account Credentials");
            
            String emailBody = "Hello " + username + ",\n\n" +
                             "Here are your account credentials:\n\n" +
                             "Email: " + recipientEmail + "\n" +
                             "Username: " + username + "\n" +
                             "Password: " + password + "\n\n" +
                             "Please keep these credentials secure and change your password after first login.\n\n" +
                             "Best regards,\n" +
                             "Avira Udupu Support Team";
            
            message.setText(emailBody);
            if (!sendWithFallback(message)) {
                throw new MailSendException("Primary and fallback SMTP send failed");
            }
            logger.info("Credentials email sent successfully to: {}", recipientEmail);
            return true;
            
        } catch (Exception e) {
            logger.error("Failed to send credentials email to: {}. Error: {} | Cause: {}", 
                recipientEmail, e.getMessage(), e.getCause() != null ? e.getCause().getMessage() : "No cause", e);
            return false;
        }
    }
    /**
     * Send order confirmation email
     */
    public boolean sendOrderConfirmationEmail(String recipientEmail, String customerName, String orderId, String orderTotal) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("keerthudarshu06@gmail.com");
            message.setTo(recipientEmail);
            message.setSubject("Avira Udupu - Order Confirmation #" + orderId);
            
            String emailBody = "Dear " + customerName + ",\n\n" +
                             "Thank you for your order! We're excited to confirm that we've received your order.\n\n" +
                             "Order Details:\n" +
                             "Order ID: #" + orderId + "\n" +
                             "Order Total: ₹" + orderTotal + "\n\n" +
                             "We'll send you another email when your order has been shipped.\n\n" +
                             "You can track your order status anytime by logging into your account.\n\n" +
                             "Thank you for shopping with Avira Udupu!\n\n" +
                             "Best regards,\n" +
                             "Avira Udupu Team";
            
            message.setText(emailBody);
            if (!sendWithFallback(message)) {
                throw new MailSendException("Primary and fallback SMTP send failed");
            }
            logger.info("Order confirmation email sent successfully to: {} for order: {}", recipientEmail, orderId);
            return true;
            
        } catch (Exception e) {
            logger.error("Failed to send order confirmation email to: {}. Error: {} | Cause: {}", 
                recipientEmail, e.getMessage(), e.getCause() != null ? e.getCause().getMessage() : "No cause", e);
            return false;
        }
    }

    /**
     * Send order status update email
     */
    public boolean sendOrderStatusEmail(String recipientEmail, String customerName, String orderId, String status) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("keerthudarshu06@gmail.com");
            message.setTo(recipientEmail);
            message.setSubject("Avira Udupu - Order Status Update #" + orderId);
            
            String statusMessage = getStatusMessage(status);
            
            String emailBody = "Dear " + customerName + ",\n\n" +
                             "Your order status has been updated.\n\n" +
                             "Order ID: #" + orderId + "\n" +
                             "New Status: " + status + "\n\n" +
                             statusMessage + "\n\n" +
                             "You can track your order status anytime by logging into your account.\n\n" +
                             "Thank you for shopping with Avira Udupu!\n\n" +
                             "Best regards,\n" +
                             "Avira Udupu Team";
            
            message.setText(emailBody);
            if (!sendWithFallback(message)) {
                throw new MailSendException("Primary and fallback SMTP send failed");
            }
            logger.info("Order status email sent successfully to: {} for order: {} with status: {}", recipientEmail, orderId, status);
            return true;
            
        } catch (Exception e) {
            logger.error("Failed to send order status email to: {}. Error: {} | Cause: {}", 
                recipientEmail, e.getMessage(), e.getCause() != null ? e.getCause().getMessage() : "No cause", e);
            return false;
        }
    }

    /**
     * Send test email to verify SMTP configuration
     */
    public boolean sendTestEmail(String recipientEmail) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("keerthudarshu06@gmail.com");
            message.setTo(recipientEmail);
            message.setSubject("Avira Udupu - Test Email");
            
            String emailBody = "This is a test email from Avira Udupu.\n\n" +
                             "If you're receiving this, your email configuration is working correctly!\n\n" +
                             "Gmail SMTP is properly configured and emails are being sent successfully.\n\n" +
                             "Best regards,\n" +
                             "Avira Udupu Team";
            
            message.setText(emailBody);
            if (!sendWithFallback(message)) {
                throw new MailSendException("Primary and fallback SMTP send failed");
            }
            logger.info("Test email sent successfully to: {}", recipientEmail);
            return true;
            
        } catch (Exception e) {
            logger.error("Failed to send test email to: {}. Error: {} | Cause: {}", 
                recipientEmail, e.getMessage(), e.getCause() != null ? e.getCause().getMessage() : "No cause", e);
            return false;
        }
    }

    /**
     * Try primary mail sender (typically STARTTLS:587). If it fails due to connectivity,
     * attempt a fallback sender configured for SSL on port 465.
     */
    private boolean sendWithFallback(SimpleMailMessage message) {
        try {
            mailSender.send(message);
            return true;
        } catch (Exception primaryEx) {
            logger.warn("Primary SMTP send failed: {}. Trying SSL/465 fallback...", primaryEx.getMessage());
            try {
                JavaMailSenderImpl fallback = new JavaMailSenderImpl();
                fallback.setHost(mailHost);
                fallback.setPort(465);
                fallback.setUsername(mailUsername);
                fallback.setPassword(mailPassword);
                Properties props = fallback.getJavaMailProperties();
                props.put("mail.smtp.auth", "true");
                props.put("mail.smtp.ssl.enable", "true");
                props.put("mail.smtp.starttls.enable", "false");
                props.put("mail.smtp.connectiontimeout", "10000");
                props.put("mail.smtp.timeout", "10000");
                props.put("mail.smtp.writetimeout", "10000");
                fallback.send(message);
                return true;
            } catch (Exception fallbackEx) {
                logger.error("Fallback SSL/465 SMTP send failed: {}", fallbackEx.getMessage(), fallbackEx);
                return false;
            }
        }
    }

    /**
     * Get status-specific message
     */
    private String getStatusMessage(String status) {
        return switch (status.toUpperCase()) {
            case "PLACED" -> "We've received your order and are processing it.";
            case "CONFIRMED" -> "Your order has been confirmed and will be shipped soon.";
            case "SHIPPED" -> "Great news! Your order has been shipped and is on its way to you.";
            case "OUT_FOR_DELIVERY" -> "Your order is out for delivery and will arrive soon.";
            case "DELIVERED" -> "Your order has been delivered. We hope you enjoy your purchase!";
            case "CANCELLED" -> "Your order has been cancelled. If you have any questions, please contact our support team.";
            default -> "Your order status has been updated to: " + status;
        };
    }
}
