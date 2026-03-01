package it.monko.spring.auth.service;

import it.monko.spring.auth.model.AuthUser;
import it.monko.spring.auth.repository.AuthUserRepository;
import it.monko.spring.auth.dto.LoginRequest;
import it.monko.spring.auth.dto.RegisterRequest;
import it.monko.spring.email.service.EmailService;
import it.monko.spring.email.service.VerificationCodeService;
import it.monko.spring.kafka.AuthEventProducer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final AuthUserRepository userRepository;
    private final AuthEventProducer eventProducer;
    private final VerificationCodeService verificationCodeService;
    private final EmailService emailService;

    public AuthService(AuthUserRepository userRepository,
            AuthEventProducer eventProducer,
            VerificationCodeService verificationCodeService,
            EmailService emailService) {
        this.userRepository = userRepository;
        this.eventProducer = eventProducer;
        this.verificationCodeService = verificationCodeService;
        this.emailService = emailService;
    }

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        AuthUser user = new AuthUser(request.email(), request.password());
        userRepository.save(user);

        // Send event to user-service asynchronously to prevent blocking
        new Thread(() -> {
            try {
                eventProducer.sendRegistration(request.username(), request.email(), request.password());
            } catch (Exception e) {
                System.err.println("Failed to send Kafka registration event: " + e.getMessage());
            }
        }).start();
    }

    public boolean login(LoginRequest request) {
        AuthUser user = userRepository.findByEmail(request.email());
        if (user == null)
            return false;
        return user.getPassword().equals(request.password());
    }

    public void activateUser(String email) {
        // Send activation event to user-service asynchronously
        new Thread(() -> {
            try {
                eventProducer.sendActivation(email);
            } catch (Exception e) {
                System.err.println("Failed to send Kafka activation event: " + e.getMessage());
            }
        }).start();
    }

    public void forgotPassword(String email) {
        if (!userRepository.existsByEmail(email)) {
            // Silently return instead of throwing 400 Bad Request to prevent errors on the
            // frontend
            // and prevent email enumeration attacks.
            return;
        }

        String code = verificationCodeService.generateCode();
        verificationCodeService.saveCode(email, code);
        System.out.println("=========================================");
        System.out.println("FORGOT PASSWORD CODE FOR " + email + ": " + code);
        System.out.println("=========================================");
        // emailService.sendVerificationCode(email, code);
    }

    public boolean updatePassword(String email, String newPassword) {
        AuthUser user = userRepository.findByEmail(email);
        if (user == null)
            return false;

        user.setPassword(newPassword);
        userRepository.save(user);

        // Send update event to user-service asynchronously
        new Thread(() -> {
            try {
                eventProducer.sendPasswordUpdate(email, newPassword);
            } catch (Exception e) {
                System.err.println("Failed to send Kafka password update event: " + e.getMessage());
            }
        }).start();
        return true;
    }
}
