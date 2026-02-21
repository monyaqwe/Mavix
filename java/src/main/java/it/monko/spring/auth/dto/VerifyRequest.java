package it.monko.spring.auth.dto;

public record VerifyRequest(
        String email,
        String code) {
}
