package it.monko.spring.logicforregestration.regestration;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserDB, Long> {
    UserDB findByEmail(String email);
}
//
// Hibernate.
// мост между твоим Java‑кодом и PostgreSQL
