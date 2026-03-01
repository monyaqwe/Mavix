package it.monko.spring.auth.dto;

public record RegisterRequest(String username, String email, String password) {
}
