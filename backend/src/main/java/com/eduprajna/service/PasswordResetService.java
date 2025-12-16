package com.eduprajna.service;

import com.eduprajna.entity.PasswordResetToken;
import com.eduprajna.entity.User;
import com.eduprajna.repository.PasswordResetTokenRepository;
import com.eduprajna.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

/**
 * Service for handling password reset functionality
 */
@Service
public class PasswordResetService {

    private static final Logger logger = LoggerFactory.getLogger(PasswordResetService.class);
    private static final long TOKEN_EXPIRY_HOURS = 24; // Token valid for 24 hours
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.frontend-base-url:http://localhost:3000}")
    private String frontendBaseUrl;

    /**
     * Generate password reset token and send email with a secure URL-safe token.
     */
    public String generatePasswordResetToken(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            logger.warn("Password reset requested for non-existent email: {}", email);
            return null;
        }

        User user = userOpt.get();

        cleanupExpiredTokens();
        invalidateExistingTokens(email);

        String rawToken = generateSecureToken();
        String tokenHash = hashToken(rawToken);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiryTime = now.plusHours(TOKEN_EXPIRY_HOURS);

        PasswordResetToken resetToken = new PasswordResetToken(tokenHash, email, now, expiryTime);
        tokenRepository.save(resetToken);

        logger.info("Password reset token generated for email: {}", email);

        String resetLink = buildResetLink(rawToken);
        boolean sent = emailService.sendPasswordResetEmail(email, user.getName(), resetLink);
        if (!sent) {
            logger.error("Failed to send password reset email to {}", email);
        }

        return rawToken;
    }

    /**
     * Validate reset token by comparing the hash and ensuring expiry/usage rules.
     */
    public boolean validateResetToken(String token) {
        String tokenHash = hashToken(token);
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByTokenHash(tokenHash);

        if (tokenOpt.isEmpty()) {
            logger.warn("Invalid reset token provided");
            return false;
        }

        PasswordResetToken resetToken = tokenOpt.get();

        if (!resetToken.isValid()) {
            if (resetToken.getIsUsed()) {
                logger.warn("Reset token already used: {}", tokenHash);
            } else {
                logger.warn("Reset token expired: {}", tokenHash);
            }
            return false;
        }

        return true;
    }

    /**
     * Reset password using a valid token and mark it as used.
     */
    public boolean resetPassword(String token, String newPassword) {
        if (!validateResetToken(token)) {
            return false;
        }

        if (newPassword == null || newPassword.trim().isEmpty()) {
            logger.warn("Cannot reset password with empty password");
            return false;
        }

        String tokenHash = hashToken(token);
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByTokenHash(tokenHash);
        if (tokenOpt.isEmpty()) {
            return false;
        }

        PasswordResetToken resetToken = tokenOpt.get();
        String email = resetToken.getEmail();

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            logger.error("User not found for email: {}", email);
            return false;
        }

        User user = userOpt.get();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        resetToken.setIsUsed(true);
        tokenRepository.save(resetToken);

        logger.info("Password successfully reset for user: {}", email);
        return true;
    }

    /**
     * Send a temporary password for forgotten credentials.
     */
    public boolean sendForgottenCredentials(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            logger.warn("Forgotten credentials requested for non-existent email: {}", email);
            return false;
        }

        User user = userOpt.get();

        String temporaryPassword = generateTemporaryPassword();
        user.setPasswordHash(passwordEncoder.encode(temporaryPassword));
        userRepository.save(user);

        boolean emailSent = emailService.sendCredentialsEmail(email, user.getName(), temporaryPassword);

        if (emailSent) {
            logger.info("Forgotten credentials sent to email: {}", email);
            return true;
        } else {
            logger.error("Failed to send forgotten credentials to: {}", email);
            return false;
        }
    }

    private void invalidateExistingTokens(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            tokenRepository.findByEmail(email).forEach(token -> {
                if (!token.getIsUsed()) {
                    token.setIsUsed(true);
                    tokenRepository.save(token);
                }
            });
        });
    }

    private String buildResetLink(String token) {
        String base = frontendBaseUrl != null && !frontendBaseUrl.isBlank() ? frontendBaseUrl.trim() : "http://localhost:3000";
        if (base.endsWith("/")) {
            base = base.substring(0, base.length() - 1);
        }
        return base + "/reset-password?token=" + token;
    }

    private String generateTemporaryPassword() {
        String uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowercase = "abcdefghijklmnopqrstuvwxyz";
        String digits = "0123456789";
        String all = uppercase + lowercase + digits;

        StringBuilder password = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            password.append(all.charAt((int) (Math.random() * all.length())));
        }
        return password.toString();
    }

    private String generateSecureToken() {
        byte[] bytes = new byte[32];
        SECURE_RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String hashToken(String rawToken) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawToken.getBytes());
            StringBuilder hex = new StringBuilder(hash.length * 2);
            for (byte b : hash) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 algorithm not available", e);
        }
    }

    private void cleanupExpiredTokens() {
        tokenRepository.deleteByExpiryTimeBefore(LocalDateTime.now());
    }
}
