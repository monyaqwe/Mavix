package it.monko.spring.contact.service;

import it.monko.spring.contact.model.ContactMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class ContactEmailService {

    private final JavaMailSender mailSender;

    public ContactEmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactNotification(ContactMessage message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String rawSubject = message.getSubject();
            String category = "General";
            String budget = "Not specified";
            String timeline = "Not specified";

            // Parse: "[E-commerce] Budget: $1,000 - $5,000, Timeline: 3-6 months"
            if (rawSubject != null && rawSubject.startsWith("[")) {
                int endBracket = rawSubject.indexOf("]");
                if (endBracket != -1) {
                    category = rawSubject.substring(1, endBracket);
                    String remainder = rawSubject.substring(endBracket + 1).trim();
                    String[] parts = remainder.split(", Timeline:");
                    if (parts.length == 2) {
                        budget = parts[0].replace("Budget:", "").trim();
                        timeline = parts[1].trim();
                    } else {
                        budget = remainder;
                    }
                }
            }

            // Define the HTML styling for the email
            String htmlMsg = String.format(
                    "<div style=\"font-family: 'Inter', Arial, sans-serif; padding: 30px; color: #1a1a1a; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);\">"
                            +
                            "<h2 style=\"color: #4f8bff; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px; margin-top: 0;\">New Project Lead</h2>"
                            +
                            "<p style=\"font-size: 16px;\"><strong>Client Data:</strong></p>" +
                            "<ul style=\"background-color: #f8fafc; padding: 20px 20px 20px 40px; border-radius: 8px; border: 1px solid #e2e8f0; line-height: 1.6;\">"
                            +
                            "<li><strong>Name:</strong> %s</li>" +
                            "<li><strong>Email:</strong> %s</li>" +
                            "<li><strong>Project Type:</strong> <span style=\"background-color: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 12px; font-size: 14px;\">%s</span></li>"
                            +
                            "<li><strong>Budget:</strong> %s</li>" +
                            "<li><strong>Timeline:</strong> %s</li>" +
                            "</ul>" +
                            "<p style=\"font-size: 16px; margin-top: 25px;\"><strong>Additional Details Provided:</strong></p>"
                            +
                            "<div style=\"background-color: #ffffff; padding: 20px; border-left: 4px solid #4f8bff; border: 1px solid #e2e8f0; border-left-width: 4px; border-radius: 4px; margin-bottom: 25px; white-space: pre-wrap; font-size: 15px; color: #334155; line-height: 1.5;\">%s</div>"
                            +
                            "<p style=\"font-size: 13px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 15px; text-align: center;\">Sent from your Mavix Platform.</p>"
                            +
                            "</div>",
                    message.getName(), message.getEmail(), category, budget, timeline, message.getMessage());

            helper.setText(htmlMsg, true);
            helper.setTo("makarprogramm@gmail.com");
            helper.setSubject("New Mavix Lead: " + category + " Project");
            helper.setFrom("makarprogramm@gmail.com");

            mailSender.send(mimeMessage);
            System.out.println("Email successfully sent to makarprogramm@gmail.com");
        } catch (MessagingException e) {
            System.err.println("Failed to send admin email: " + e.getMessage());
        }
    }

    public void sendClientAutoReply(ContactMessage message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String htmlMsg = String.format(
                    "<div style=\"font-family: 'Inter', Arial, sans-serif; padding: 30px; color: #1a1a1a; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);\">"
                            +
                            "<h2 style=\"color: #4f8bff; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px; margin-top: 0;\">Request Received!</h2>"
                            +
                            "<p style=\"font-size: 16px;\">Hi <strong>%s</strong>,</p>" +
                            "<p style=\"font-size: 16px; line-height: 1.6;\">Thank you for submitting your project request to The Mavix! We have successfully received your details.</p>"
                            +
                            "<p style=\"font-size: 16px; line-height: 1.6;\">Our team will carefully review your requirements. Within the next 24-48 hours, a manager will evaluate the scope and assign a formal quote to your request.</p>"
                            +
                            "<p style=\"font-size: 16px; line-height: 1.6;\">You can track the status of your request and proceed with payment directly from your <a href=\"http://localhost:5175/dashboard/invoices\" style=\"color: #4f8bff; text-decoration: none; font-weight: bold;\">Client Dashboard</a>.</p>"
                            +
                            "<div style=\"margin-top: 30px; padding-top: 20px; border-top: 1px solid #f0f0f0;\">" +
                            "<p style=\"font-size: 14px; color: #64748b;\">Best regards,<br>The Mavix Team</p>" +
                            "</div>" +
                            "<p style=\"font-size: 12px; color: #94a3b8; text-align: center; margin-top: 20px;\">This is an automated message. Please do not reply.</p>"
                            +
                            "</div>",
                    message.getName());

            helper.setText(htmlMsg, true);
            helper.setTo(message.getEmail());
            helper.setSubject("We received your project request!");
            helper.setFrom("makarprogramm@gmail.com");

            mailSender.send(mimeMessage);
            System.out.println("Auto-reply sent successfully to " + message.getEmail());
        } catch (MessagingException e) {
            System.err.println("Failed to send auto-reply email: " + e.getMessage());
        }
    }
}
