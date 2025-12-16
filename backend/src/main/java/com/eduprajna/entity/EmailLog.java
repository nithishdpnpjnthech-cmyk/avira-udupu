package com.eduprajna.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity to store logs of sent/attempted emails for testing and debugging
 */
@Entity
@Table(name = "email_logs")
public class EmailLog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String recipientEmail;
    
    @Column(nullable = false)
    private String subject;
    
    @Column(columnDefinition = "LONGTEXT")
    private String body;
    
    @Column(nullable = false)
    private String status; // SUCCESS, FAILED, MOCK
    
    @Column
    private String errorMessage;
    
    @Column(nullable = false)
    private LocalDateTime sentAt;
    
    public EmailLog() {
    }
    
    public EmailLog(String recipientEmail, String subject, String body, String status, String errorMessage) {
        this.recipientEmail = recipientEmail;
        this.subject = subject;
        this.body = body;
        this.status = status;
        this.errorMessage = errorMessage;
        this.sentAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getRecipientEmail() {
        return recipientEmail;
    }
    
    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }
    
    public String getSubject() {
        return subject;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }
    
    public String getBody() {
        return body;
    }
    
    public void setBody(String body) {
        this.body = body;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getErrorMessage() {
        return errorMessage;
    }
    
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
    
    public LocalDateTime getSentAt() {
        return sentAt;
    }
    
    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }
}
