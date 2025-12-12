package com.eduprajna.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Map;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "http://localhost:3000",
        "https://avira-udupu.com",
        "https://avira-udupu.vercel.app"
    },
    allowCredentials = "true",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS}
)
public class EmailController {
    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);
    
    private final JavaMailSender mailSender;

    public EmailController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @PostMapping("/send-order-confirmation")
    public ResponseEntity<?> sendOrderConfirmation(@RequestBody Map<String, Object> emailData) {
        try {
            String recipientEmail = (String) emailData.get("to");
            Object orderDetailsObj = emailData.get("orderDetails");
            String customerName = (String) emailData.get("customerName");
            Long orderId = null;
            
            if (emailData.get("orderId") instanceof Number) {
                orderId = ((Number) emailData.get("orderId")).longValue();
            }
            
            if (recipientEmail == null || recipientEmail.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Recipient email is required"));
            }

            String htmlContent = buildOrderConfirmationHtml(orderId, customerName);
            String subject = "Order Confirmation - Avira Udupu #" + (orderId != null ? orderId : "Pending");
            
            try {
                sendHtmlEmail(recipientEmail, subject, htmlContent);
                logger.info("Order confirmation email sent to: {}", recipientEmail);
                return ResponseEntity.ok(Map.of("success", true, "message", "Email sent successfully"));
            } catch (MailException | MessagingException smtpEx) {
                logger.warn("SMTP send failed, attempting Resend API fallback", smtpEx);
                boolean fallbackSent = sendViaResend(recipientEmail, subject, htmlContent);
                if (fallbackSent) {
                    logger.info("Order confirmation sent via Resend fallback to: {}", recipientEmail);
                    return ResponseEntity.ok(Map.of("success", true, "message", "Email sent via fallback"));
                }
                logger.error("Resend API fallback failed");
                return ResponseEntity.status(500).body(Map.of("error", smtpEx.getMessage()));
            }
            
        } catch (Exception e) {
            logger.error("Failed to send order confirmation email", e);
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    private String buildOrderConfirmationHtml(Long orderId, String customerName) {
        String orderIdStr = orderId != null ? orderId.toString() : "N/A";
        String name = customerName != null ? customerName : "Valued Customer";
        
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>\n");
        html.append("<html lang=\"en\">\n");
        html.append("<head>\n");
        html.append("  <meta charset=\"UTF-8\">\n");
        html.append("  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n");
        html.append("  <title>Order Confirmation</title>\n");
        html.append("  <style>\n");
        html.append("    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }\n");
        html.append("    .container { max-width: 600px; margin: 20px auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }\n");
        html.append("    .header { background: linear-gradient(135deg, #C9A961 0%, #A0823E 100%); color: white; padding: 30px; text-align: center; }\n");
        html.append("    .header h1 { margin: 0; font-size: 28px; }\n");
        html.append("    .content { padding: 30px; }\n");
        html.append("    .greeting { font-size: 16px; color: #333; margin-bottom: 20px; }\n");
        html.append("    .order-id { background-color: #f9f9f9; border-left: 4px solid #C9A961; padding: 15px; margin: 20px 0; border-radius: 4px; }\n");
        html.append("    .order-id strong { color: #C9A961; }\n");
        html.append("    .order-number { font-size: 20px; color: #333; }\n");
        html.append("    .info-section { margin: 25px 0; padding: 15px; background-color: #fafafa; border-radius: 4px; }\n");
        html.append("    .info-section h3 { color: #C9A961; margin-top: 0; font-size: 16px; }\n");
        html.append("    .info-row { display: flex; justify-content: space-between; margin: 8px 0; padding: 8px 0; border-bottom: 1px solid #eee; }\n");
        html.append("    .info-row:last-child { border-bottom: none; }\n");
        html.append("    .info-label { font-weight: 600; color: #555; }\n");
        html.append("    .info-value { color: #333; }\n");
        html.append("    .next-steps { background-color: #e8f4f8; border-radius: 4px; padding: 15px; margin: 20px 0; }\n");
        html.append("    .next-steps h3 { color: #0066cc; margin-top: 0; font-size: 16px; }\n");
        html.append("    .next-steps ul { padding-left: 20px; margin: 10px 0; }\n");
        html.append("    .next-steps li { margin: 8px 0; color: #333; }\n");
        html.append("    .footer { background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; }\n");
        html.append("    .cta-button { display: inline-block; background-color: #C9A961; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 15px 0; font-weight: 600; }\n");
        html.append("    .status-badge { display: inline-block; background-color: #fff3cd; color: #856404; padding: 8px 12px; border-radius: 20px; font-size: 14px; font-weight: 600; }\n");
        html.append("  </style>\n");
        html.append("</head>\n");
        html.append("<body>\n");
        html.append("  <div class=\"container\">\n");
        html.append("    <div class=\"header\">\n");
        html.append("      <h1>Order Confirmed</h1>\n");
        html.append("      <p>Thank you for your order!</p>\n");
        html.append("    </div>\n");
        html.append("    <div class=\"content\">\n");
        html.append("      <div class=\"greeting\">Hello <strong>").append(name).append("</strong>,</div>\n");
        html.append("      <p>Your order has been successfully placed and we're excited to prepare it for delivery!</p>\n");
        html.append("      <div class=\"order-id\">\n");
        html.append("        <div class=\"order-number\">Order ID: <strong>#").append(orderIdStr).append("</strong></div>\n");
        html.append("        <p style=\"margin: 8px 0 0 0; color: #666; font-size: 14px;\">Payment Method: <strong>Cash on Delivery (COD)</strong></p>\n");
        html.append("      </div>\n");
        html.append("      <div class=\"info-section\">\n");
        html.append("        <h3>What's Next?</h3>\n");
        html.append("        <div class=\"next-steps\">\n");
        html.append("          <h3 style=\"color: #0066cc; margin-top: 0;\">Your Order Status:</h3>\n");
        html.append("          <div class=\"info-row\"><span class=\"info-label\">Current Status:</span><span class=\"status-badge\">Pending</span></div>\n");
        html.append("          <div class=\"info-row\"><span class=\"info-label\">Expected Delivery:</span><span class=\"info-value\">5-7 Business Days</span></div>\n");
        html.append("        </div>\n");
        html.append("      </div>\n");
        html.append("      <div class=\"info-section\">\n");
        html.append("        <h3>What Happens Now?</h3>\n");
        html.append("        <ul style=\"padding-left: 20px; margin: 10px 0;\">\n");
        html.append("          <li>We'll prepare your order with utmost care</li>\n");
        html.append("          <li>You'll receive a shipping notification with tracking details</li>\n");
        html.append("          <li>Our delivery partner will contact you before delivery</li>\n");
        html.append("          <li>Please have the exact payment amount ready for delivery</li>\n");
        html.append("          <li>You can track your order in your account dashboard</li>\n");
        html.append("        </ul>\n");
        html.append("      </div>\n");
        html.append("      <div class=\"info-section\">\n");
        html.append("        <h3>Customer Support</h3>\n");
        html.append("        <div class=\"info-row\"><span class=\"info-label\">Need Help?</span><span class=\"info-value\">Contact us anytime</span></div>\n");
        html.append("        <div class=\"info-row\"><span class=\"info-label\">Email:</span><span class=\"info-value\">support@avira-udupu.com</span></div>\n");
        html.append("        <div class=\"info-row\"><span class=\"info-label\">Phone:</span><span class=\"info-value\">+91 9845651468</span></div>\n");
        html.append("      </div>\n");
        html.append("      <center><a href=\"https://avira-udupu.com/user-account-dashboard?section=orders\" class=\"cta-button\">Track Your Order</a></center>\n");
        html.append("      <p style=\"margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;\">Thank you for choosing Avira Udupu. We appreciate your business!</p>\n");
        html.append("    </div>\n");
        html.append("    <div class=\"footer\">\n");
        html.append("      <p style=\"margin: 0 0 10px 0;\"><strong>Avira Udupu</strong> - Traditional & Organic Products</p>\n");
        html.append("      <p style=\"margin: 0;\">&copy; 2025 All rights reserved. | <a href=\"#\" style=\"color: #666;\">Privacy Policy</a> | <a href=\"#\" style=\"color: #666;\">Terms &amp; Conditions</a></p>\n");
        html.append("    </div>\n");
        html.append("  </div>\n");
        html.append("</body>\n");
        html.append("</html>\n");
        
        return html.toString();
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        helper.setFrom("keerthudarshu06@gmail.com");
        
        mailSender.send(message);
    }

    /**
     * Fallback sender using Resend HTTP API if RESEND_API_KEY is configured.
     */
    private boolean sendViaResend(String to, String subject, String htmlContent) {
        try {
            String apiKey = System.getenv("RESEND_API_KEY");
            if (apiKey == null || apiKey.isBlank()) {
                logger.warn("Resend API key not configured; skipping fallback");
                return false;
            }

            Map<String, Object> payload = new HashMap<>();
            payload.put("from", "Avira Udupu <no-reply@avira-udupu.com>");
            payload.put("to", new String[]{to});
            payload.put("subject", subject);
            payload.put("html", htmlContent);

            ObjectMapper mapper = new ObjectMapper();
            String body = mapper.writeValueAsString(payload);

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.resend.com/emails"))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                return true;
            }

            logger.error("Resend API error: status={} body={}", response.statusCode(), response.body());
            return false;
        } catch (Exception ex) {
            logger.error("Resend API call failed", ex);
            return false;
        }
    }
}
