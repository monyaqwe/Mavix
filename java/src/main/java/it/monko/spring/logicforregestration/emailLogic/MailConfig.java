package it.monko.spring.logicforregestration.emailLogic;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    // Считываем имя пользователя из настроек
    @Value("${spring.mail.username}")
    private String mailUsername;

    // Считываем пароль приложения из настроек
    @Value("${spring.mail.password}")
    private String mailPassword;

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        // Основные настройки SMTP сервера Gmail
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        // Используем переменные вместо жестко прописанных строк
        mailSender.setUsername(mailUsername);
        mailSender.setPassword(mailPassword);

        // Настройка дополнительных свойств протокола
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        // В продакшене (деплое) лучше ставить false, чтобы не засорять логи
        props.put("mail.debug", "true");

        return mailSender;
    }
}