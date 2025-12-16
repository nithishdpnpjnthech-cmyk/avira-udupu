package com.eduprajna.config;

import com.eduprajna.service.EmailService;
import com.eduprajna.service.MockEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Email service configuration to conditionally use MockEmailService or real EmailService
 * Uses a wrapper to decide at runtime based on app.mock-email property
 */
@Component
@Primary
public class EmailServiceConfig extends EmailService {
    
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceConfig.class);
    
    @Autowired
    private EmailService realEmailService;
    
    @Autowired
    private MockEmailService mockEmailService;
    
    @Value("${app.mock-email:false}")
    private boolean mockEmailEnabled;
    
    @Override
    public boolean sendPasswordResetEmail(String recipientEmail, String username, String resetLink) {
        if (mockEmailEnabled) {
            logger.info("Using MOCK email service for password reset");
            return mockEmailService.sendPasswordResetEmail(recipientEmail, username, resetLink);
        } else {
            return realEmailService.sendPasswordResetEmail(recipientEmail, username, resetLink);
        }
    }
    
    @Override
    public boolean sendCredentialsEmail(String recipientEmail, String username, String password) {
        if (mockEmailEnabled) {
            logger.info("Using MOCK email service for credentials");
            return mockEmailService.sendCredentialsEmail(recipientEmail, username, password);
        } else {
            return realEmailService.sendCredentialsEmail(recipientEmail, username, password);
        }
    }
}
