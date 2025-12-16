package com.eduprajna.service;

import com.eduprajna.entity.EmailLog;
import com.eduprajna.repository.EmailLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Mock email service for development/testing
 * Logs emails to console and database instead of sending real emails
 * Useful when SMTP is blocked or during local development
 */
@Service
public class MockEmailService {
    
    private static final Logger logger = LoggerFactory.getLogger(MockEmailService.class);
    
    @Autowired(required = false)
    private EmailLogRepository emailLogRepository;
    
    /**
     * Mock send password reset email - logs to console and database
     */
    public boolean sendPasswordResetEmail(String recipientEmail, String username, String resetLink) {
        try {
            String subject = "Avira Udupu - Password Reset Request";
            String body = buildPasswordResetEmailBody(username, resetLink, recipientEmail);
            
            logEmail(recipientEmail, subject, body, "MOCK", null);
            
            logger.info("\n" +
                "========== MOCK EMAIL (Password Reset) ==========\n" +
                "TO: {}\n" +
                "SUBJECT: {}\n" +
                "BODY:\n{}\n" +
                "RESET LINK: {}\n" +
                "================================================\n",
                recipientEmail, subject, body, resetLink);
            
            return true;
        } catch (Exception e) {
            logger.error("Error in mock password reset email", e);
            logEmail(recipientEmail, "Avira Udupu - Password Reset Request", "", "FAILED", e.getMessage());
            return false;
        }
    }
    
    /**
     * Mock send credentials email - logs to console and database
     */
    public boolean sendCredentialsEmail(String recipientEmail, String username, String password) {
        String subject = "Avira Udupu - Your Account Credentials";
        try {
            String body = "Hello " + username + ",\n\n" +
                         "Here are your account credentials:\n\n" +
                         "Email: " + recipientEmail + "\n" +
                         "Username: " + username + "\n" +
                         "Password: " + password + "\n\n" +
                         "Please keep these credentials secure and change your password after first login.\n\n" +
                         "Best regards,\n" +
                         "Avira Udupu Support Team";
            
            logEmail(recipientEmail, subject, body, "MOCK", null);
            
            logger.info("\n" +
                "========== MOCK EMAIL (Credentials) ==========\n" +
                "TO: {}\n" +
                "SUBJECT: {}\n" +
                "BODY:\n{}\n" +
                "============================================\n",
                recipientEmail, subject, body);
            
            return true;
        } catch (Exception e) {
            logger.error("Error in mock credentials email", e);
            logEmail(recipientEmail, subject, "", "FAILED", e.getMessage());
            return false;
        }
    }
    
    /**
     * Build password reset email body
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
     * Log email to database for debugging
     */
    private void logEmail(String recipientEmail, String subject, String body, String status, String errorMessage) {
        try {
            if (emailLogRepository != null) {
                EmailLog log = new EmailLog(recipientEmail, subject, body, status, errorMessage);
                emailLogRepository.save(log);
            }
        } catch (Exception e) {
            logger.warn("Could not log email to database", e);
        }
    }
}
