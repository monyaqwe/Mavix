package it.monko.spring.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class AuthEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public AuthEventProducer(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendRegistration(String username, String email, String password) {
        Map<String, String> data = Map.of(
                "username", username,
                "email", email,
                "password", password);
        kafkaTemplate.send("user-registration", data);
    }

    public void sendActivation(String email) {
        kafkaTemplate.send("user-activation", email);
    }

    public void sendPasswordUpdate(String email, String password) {
        Map<String, String> data = Map.of(
                "email", email,
                "password", password);
        kafkaTemplate.send("password-reset", data);
    }
}
