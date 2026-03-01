package it.monko.spring.contact.controller;

import it.monko.spring.contact.model.ContactMessage;
import it.monko.spring.contact.service.ContactService;

import it.monko.spring.contact.dto.ContactRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submitMessage(@RequestBody ContactRequest request) {
        return ResponseEntity.ok(contactService.saveMessage(request));
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<ContactMessage>> getMyRequests(@RequestParam String email) {
        return ResponseEntity.ok(contactService.getMessagesByEmail(email));
    }

    @PostMapping("/{id}/set-price")
    public ResponseEntity<ContactMessage> setPrice(@PathVariable Long id, @RequestParam Double amount) {
        return ResponseEntity.ok(contactService.setPrice(id, amount));
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<ContactMessage> payRequest(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.payRequest(id));
    }
}
