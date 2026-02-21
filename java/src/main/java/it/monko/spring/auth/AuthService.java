package it.monko.spring.auth;

import it.monko.spring.auth.dto.LoginRequest;
import it.monko.spring.auth.dto.RegisterRequest;
import it.monko.spring.email.EmailService;
import it.monko.spring.email.VerificationCodeService;
import it.monko.spring.user.User;
import it.monko.spring.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserService userService;
    private final VerificationCodeService verificationCodeService;
    private final EmailService emailService;

    public AuthService(UserService userService,
            VerificationCodeService verificationCodeService,
            EmailService emailService) {
        this.userService = userService;
        this.verificationCodeService = verificationCodeService;
        this.emailService = emailService;
    }

    public void register(RegisterRequest request) {
        if (userService.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        User user = new User(
                null,
                request.username(),
                request.email(),
                request.password(),
                false);

        userService.save(user);
    }

    public boolean login(LoginRequest request) {
        User user = userService.findByEmail(request.email());
        if (user == null)
            return false;
        return user.getPassword().equals(request.password());
    }

    public void activateUser(String email) {
        User user = userService.findByEmail(email);
        if (user == null)
            return;
        user.setEnabled(true);
        userService.save(user);
    }

    public void forgotPassword(String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email not found");
        }

        String code = verificationCodeService.generateCode();
        verificationCodeService.saveCode(email, code);
        emailService.sendVerificationCode(email, code);
    }

    public boolean updatePassword(String email, String newPassword) {
        User user = userService.findByEmail(email);
        if (user == null)
            return false;

        user.setPassword(newPassword);
        userService.save(user);
        return true;
    }
}
