package it.monko.spring.contact.service;

import it.monko.spring.contact.model.ContactMessage;
import it.monko.spring.contact.repository.ContactRepository;

import it.monko.spring.contact.dto.ContactRequest;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContactService {
    private final ContactRepository contactRepository;
    private final ContactEmailService emailService;

    public ContactService(ContactRepository contactRepository, ContactEmailService emailService) {
        this.contactRepository = contactRepository;
        this.emailService = emailService;
    }

    public ContactMessage saveMessage(ContactRequest request) {
        ContactMessage message = new ContactMessage(
                request.name(),
                request.email(),
                request.subject(),
                request.message());
        ContactMessage savedMessage = contactRepository.save(message);

        // Send email notifications asynchronously
        new Thread(() -> {
            emailService.sendContactNotification(savedMessage);
            emailService.sendClientAutoReply(savedMessage);
        }).start();

        return savedMessage;
    }

    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAll();
    }

    public List<ContactMessage> getMessagesByEmail(String email) {
        return contactRepository.findByEmail(email);
    }

    public ContactMessage setPrice(Long id, Double amount) {
        ContactMessage message = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        message.setPrice(amount);
        message.setPaymentStatus("PENDING_PAYMENT");
        return contactRepository.save(message);
    }

    public ContactMessage payRequest(Long id) {
        ContactMessage message = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!"PENDING_PAYMENT".equals(message.getPaymentStatus())) {
            throw new RuntimeException("Request is not ready for payment");
        }

        message.setPaymentStatus("PAID");
        return contactRepository.save(message);
    }
}
