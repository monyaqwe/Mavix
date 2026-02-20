package it.monko.spring.logicforregestration.emailLogic;



import org.springframework.stereotype.Service;

import java.time.LocalDateTime;



import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VerificationCodeService {

    private final VerificationCodeRepository repo;

    public VerificationCodeService(VerificationCodeRepository repo) {
        this.repo = repo;
    }

    public String generateCode() {
        return String.valueOf((int)(Math.random() * 900000) + 100000);
    }

    public void saveCode(String email, String code) {
        // удаляем старый код, если есть
        VerificationCode old = repo.findByEmail(email);
        if (old != null) repo.delete(old);

        // сохраняем новый
        repo.save(new VerificationCode(email, code));
    }

    public boolean verifyCode(String email, String code) {
        VerificationCode entity = repo.findByEmail(email);

        if (entity == null) return false;

        // TTL 5 минут
        if (entity.getCreatedAt() == null ||
                entity.getCreatedAt().isBefore(LocalDateTime.now().minusMinutes(5))) {
            repo.delete(entity);
            return false;
        }

        // безопасное сравнение
        if (entity.getCode() == null) return false;

        boolean ok = code.equals(entity.getCode());

        if (ok) repo.delete(entity);

        return ok;
    }

}
