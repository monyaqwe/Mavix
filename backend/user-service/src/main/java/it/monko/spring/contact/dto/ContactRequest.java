package it.monko.spring.contact.dto;

public record ContactRequest(
        String name,
        String email,
        String subject,
        String message) {
}
