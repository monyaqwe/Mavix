package it.monko.spring.kafka;

import it.monko.spring.activity.service.ActivityService;
import it.monko.spring.user.model.User;
import it.monko.spring.user.service.UserService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class UserEventConsumer {

    private final UserService userService;
    private final ActivityService activityService;

    public UserEventConsumer(UserService userService, ActivityService activityService) {
        this.userService = userService;
        this.activityService = activityService;
    }

    @KafkaListener(topics = "user-registration", groupId = "user-group")
    public void handleRegistration(Map<String, String> data) {
        User user = new User(
                data.get("username"),
                data.get("email"),
                data.get("password"),
                false);
        userService.save(user);
        activityService.logActivity("User Registered", user.getEmail(), "Success");
    }

    @KafkaListener(topics = "user-activation", groupId = "user-group")
    public void handleActivation(String email) {
        User user = userService.findByEmail(email);
        if (user != null) {
            user.setEnabled(true);
            userService.save(user);
            activityService.logActivity("Account Activated", email, "Success");
        }
    }

    @KafkaListener(topics = "password-reset", groupId = "user-group")
    public void handlePasswordReset(Map<String, String> data) {
        User user = userService.findByEmail(data.get("email"));
        if (user != null) {
            user.setPassword(data.get("password"));
            userService.save(user);
            activityService.logActivity("Password Reset", data.get("email"), "Success");
        }
    }
}
