import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, AlertCircle } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateForm = (username, email, password) => {
        const errors = {};
        if (!username.trim()) errors.username = "Name is required";

        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Please enter a valid email address (e.g., user@example.com)";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Custom Validation
        const errors = validateForm(username, email, password);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        // Clear errors if valid
        setFieldErrors({});
        setGeneralError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const text = await response.text();
            console.log("Server response:", text);

            if (response.ok) {
                navigate('/verify-email', { state: { email } });
            } else {
                let errorMessage = "Registration failed. Please try again.";
                try {
                    const data = JSON.parse(text);
                    errorMessage = data.message || data.error || errorMessage;
                } catch (e) {
                    if (text && text.trim().length > 0) errorMessage = text;
                }

                if (errorMessage === "Internal Server Error" || errorMessage.includes("Email already exists")) {
                    setFieldErrors({ email: "Email already exists" });
                } else {
                    setGeneralError(errorMessage);
                }
                console.error("Registration failed:", text);
            }

        } catch (err) {
            console.error("Error:", err);
            setGeneralError("Connection error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-header">
                <h1>Create an account</h1>
                <p>Start your 30-day free trial. No credit card required.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
                {generalError && (
                    <div className="error-message">
                        <AlertCircle size={20} />
                        <span>{generalError}</span>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="username">Full Name</label>
                    <div className="input-wrapper">
                        <User className="input-icon" size={20} />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your name"
                            className={fieldErrors.username ? "input-error" : ""}
                        />
                    </div>
                    {fieldErrors.username && (
                        <div className="field-error-tooltip">
                            <AlertCircle size={14} />
                            {fieldErrors.username}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <div className="input-wrapper">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className={fieldErrors.email ? "input-error" : ""}
                        />
                    </div>
                    {fieldErrors.email && (
                        <div className="field-error-tooltip">
                            <AlertCircle size={14} />
                            {fieldErrors.email}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-wrapper">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            className={fieldErrors.password ? "input-error" : ""}
                        />
                    </div>
                    {fieldErrors.password && (
                        <div className="field-error-tooltip">
                            <AlertCircle size={14} />
                            {fieldErrors.password}
                        </div>
                    )}
                    <p className="hint">Must be at least 8 characters</p>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? (
                        <div className="loader-container" style={{ margin: 0, color: 'white' }}>
                            <span className="loader" style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderBottomColor: 'white' }}></span>
                            <span>Creating account...</span>
                        </div>
                    ) : (
                        <>
                            <span>Get Started</span>
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div className="auth-footer">
                <p>Already have an account? <Link to="/login" className="link-primary">Sign in</Link></p>
            </div>
        </div>
    );
};

export default Register;
