package com.eduprajna.Controller;

import com.eduprajna.entity.EmailLog;
import com.eduprajna.repository.EmailLogRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dev/email")
public class DevEmailLogController {

    private final EmailLogRepository emailLogRepository;

    @Value("${app.mock-email:false}")
    private boolean mockEnabled;

    public DevEmailLogController(EmailLogRepository emailLogRepository) {
        this.emailLogRepository = emailLogRepository;
    }

    @GetMapping("/latest")
    public ResponseEntity<?> getLatest(@RequestParam("to") String to) {
        if (!mockEnabled) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        EmailLog log = emailLogRepository.findTopByRecipientEmailOrderBySentAtDesc(to);
        if (log == null) {
            return ResponseEntity.notFound().build();
        }
        Map<String, Object> res = new HashMap<>();
        res.put("recipientEmail", log.getRecipientEmail());
        res.put("subject", log.getSubject());
        res.put("body", log.getBody());
        res.put("status", log.getStatus());
        res.put("sentAt", log.getSentAt());
        return ResponseEntity.ok(res);
    }
}
