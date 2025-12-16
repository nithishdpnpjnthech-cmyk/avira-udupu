package com.eduprajna.repository;

import com.eduprajna.entity.EmailLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for EmailLog entity to track sent/attempted emails
 */
@Repository
public interface EmailLogRepository extends JpaRepository<EmailLog, Long> {
    
    /**
     * Find all logs for a specific email address
     */
    List<EmailLog> findByRecipientEmail(String recipientEmail);
    
    /**
     * Find logs by status (SUCCESS, FAILED, MOCK)
     */
    List<EmailLog> findByStatus(String status);

    /**
     * Find the latest log for a recipient by sent time
     */
    EmailLog findTopByRecipientEmailOrderBySentAtDesc(String recipientEmail);
}
