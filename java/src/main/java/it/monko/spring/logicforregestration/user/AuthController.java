package it.monko.spring.logicforregestration.user;





import it.monko.spring.logicforregestration.emailLogic.EmailService;
import it.monko.spring.logicforregestration.emailLogic.VerificationCodeService;
import it.monko.spring.logicforregestration.emailLogic.VerifyRequest;
import it.monko.spring.logicforregestration.forgotPassword.ForgotPasswordRequest;
import it.monko.spring.logicforregestration.forgotPassword.ResetPasswordRequest;
import it.monko.spring.logicforregestration.regestration.RegisterRequest;
import it.monko.spring.logicforregestration.regestration.UserService;
import it.monko.spring.logicforregestration.regestrato.LoginRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService service;
    private final VerificationCodeService verificationCodeService;
    private final EmailService emailService;

    public AuthController(UserService service,
                          VerificationCodeService verificationCodeService,
                          EmailService emailService) {
        this.service = service;
        this.verificationCodeService = verificationCodeService;
        this.emailService = emailService;
    }

    // -----------------------------
    // REGISTER
    // -----------------------------
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest) {

        service.register(registerRequest);

        String code = verificationCodeService.generateCode();
        verificationCodeService.saveCode(registerRequest.email(), code);

        emailService.sendVerificationCode(registerRequest.email(), code);

        return ResponseEntity.ok("Verification email sent");
    }

    // -----------------------------
    // LOGIN
    // -----------------------------
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest request) {
        boolean ok = service.login(request);
        if (ok) return ResponseEntity.ok("Login success");
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    // -----------------------------
    // FORGOT PASSWORD — send code
    // -----------------------------
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        service.forgotPassword(request.getEmail());
        return ResponseEntity.ok("Reset email sent");
    }


    // -----------------------------
    // VERIFY RESET CODE
    // -----------------------------
    @PostMapping("/verify-reset")
    public ResponseEntity<String> verifyReset(@RequestBody VerifyRequest request) {

        boolean ok = verificationCodeService.verifyCode(request.getEmail(), request.getCode());

        if (!ok) {
            return ResponseEntity.status(400).body("Invalid or expired code");
        }

        return ResponseEntity.ok("Code verified");
    }

    // -----------------------------
    // RESET PASSWORD
    // -----------------------------
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {

        boolean ok = service.updatePassword(request.getEmail(), request.getNewPassword());

        if (!ok) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        return ResponseEntity.ok("Password updated");
    }

    // -----------------------------
    // VERIFY EMAIL (registration)
    // -----------------------------
    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody VerifyRequest request) {

        boolean ok = verificationCodeService.verifyCode(request.getEmail(), request.getCode());

        if (ok) {
            service.activateUser(request.getEmail());
            return ResponseEntity.ok("Email verified successfully");
        }

        return ResponseEntity.status(400).body("Invalid or expired code");
    }
}
