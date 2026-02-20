package it.monko.spring.logicforregestration.emailLogic;

import org.springframework.data.jpa.repository.JpaRepository;




public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    VerificationCode findByEmail(String email);
}

