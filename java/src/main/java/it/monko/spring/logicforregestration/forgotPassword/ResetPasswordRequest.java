package it.monko.spring.logicforregestration.forgotPassword;

public class ResetPasswordRequest {
    private String email;
    private String newPassword;

    public String getEmail() {
        return email;
    }

    public String getNewPassword() {
        return newPassword;
    }
}
