package it.monko.spring.auth;

import it.monko.spring.auth.dto.*;
import it.monko.spring.email.EmailService;
import it.monko.spring.email.VerificationCodeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final VerificationCodeService verificationCodeService;
    private final EmailService emailService;

    public AuthController(AuthService authService,
            VerificationCodeService verificationCodeService,
            EmailService emailService) {
        this.authService = authService;
        this.verificationCodeService = verificationCodeService;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest) {
        authService.register(registerRequest);

        String code = verificationCodeService.generateCode();
        verificationCodeService.saveCode(registerRequest.email(), code);
        emailService.sendVerificationCode(registerRequest.email(), code);

        return ResponseEntity.ok("Verification email sent");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest request) {
        boolean ok = authService.login(request);
        if (ok)
            return ResponseEntity.ok("Login success");
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request.getEmail());
        return ResponseEntity.ok("Reset email sent");
    }

    @PostMapping("/verify-reset")
    public ResponseEntity<String> verifyReset(@RequestBody VerifyRequest request) {
        boolean ok = verificationCodeService.verifyCode(request.email(), request.code());
        if (!ok) {
            return ResponseEntity.status(400).body("Invalid or expired code");
        }
        return ResponseEntity.ok("Code verified");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean ok = authService.updatePassword(request.getEmail(), request.getNewPassword());
        if (!ok) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }
        return ResponseEntity.ok("Password updated");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody VerifyRequest request) {
        boolean ok = verificationCodeService.verifyCode(request.email(), request.code());
        if (ok) {
            authService.activateUser(request.email());
            return ResponseEntity.ok("Email verified successfully");
        }
        return ResponseEntity.status(400).body("Invalid or expired code");
    }
}
