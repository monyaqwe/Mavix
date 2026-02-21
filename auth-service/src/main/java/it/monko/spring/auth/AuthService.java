package it.monko.spring.auth;

import it.monko.spring.auth.dto.LoginRequest;
import it.monko.spring.auth.dto.RegisterRequest;
import it.monko.spring.email.EmailService;
import it.monko.spring.email.VerificationCodeService;
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

        // Send event to user-service
        eventProducer.sendRegistration(request.username(), request.email(), request.password());
    }

    public boolean login(LoginRequest request) {
        AuthUser user = userRepository.findByEmail(request.email());
        if (user == null)
            return false;
        return user.getPassword().equals(request.password());
    }

    public void activateUser(String email) {
        // Send activation event to user-service
        eventProducer.sendActivation(email);
    }

    public void forgotPassword(String email) {
        if (!userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email not found");
        }

        String code = verificationCodeService.generateCode();
        verificationCodeService.saveCode(email, code);
        emailService.sendVerificationCode(email, code);
    }

    public boolean updatePassword(String email, String newPassword) {
        AuthUser user = userRepository.findByEmail(email);
        if (user == null)
            return false;

        user.setPassword(newPassword);
        userRepository.save(user);

        // Send update event to user-service
        eventProducer.sendPasswordUpdate(email, newPassword);
        return true;
    }
}
