package it.monko.spring.logicforregestration.regestration;


import it.monko.spring.logicforregestration.emailLogic.EmailService;
import it.monko.spring.logicforregestration.emailLogic.VerificationCodeService;
import it.monko.spring.logicforregestration.regestrato.LoginRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final VerificationCodeService verificationCodeService;
    private final EmailService emailService;

    public UserService(UserRepository userRepository,
                       VerificationCodeService verificationCodeService,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.verificationCodeService = verificationCodeService;
        this.emailService = emailService;
    }

    // -----------------------------
    // REGISTER
    // -----------------------------
    public void register(RegisterRequest request) {

        if (userRepository.findByEmail(request.email()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        UserDB user = new UserDB(
                null,
                request.username(),
                request.email(),
                request.password(),
                false
        );

        userRepository.save(user);
    }

    // -----------------------------
    // LOGIN
    // -----------------------------
    public boolean login(LoginRequest request) {
        UserDB user = userRepository.findByEmail(request.email());
        if (user == null) return false;
        return user.getPassword().equals(request.password());
    }

    // -----------------------------
    // ACTIVATE USER
    // -----------------------------
    public void activateUser(String email) {
        UserDB user = userRepository.findByEmail(email);
        if (user == null) return;
        user.setEnabled(true);
        userRepository.save(user);
    }

    // -----------------------------
    // FORGOT PASSWORD
    // -----------------------------
    public void forgotPassword(String email) {

        UserDB user = userRepository.findByEmail(email);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email not found");
        }

        String code = verificationCodeService.generateCode();
        verificationCodeService.saveCode(email, code);
        emailService.sendVerificationCode(email, code);
    }

    // -----------------------------
    // RESET PASSWORD
    // -----------------------------
    public boolean updatePassword(String email, String newPassword) {

        UserDB user = userRepository.findByEmail(email);

        if (user == null) return false;

        user.setPassword(newPassword);
        userRepository.save(user);

        return true;
    }
}
