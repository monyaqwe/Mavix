import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

import { AUTH_ENDPOINTS } from '../api/config';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(location.state?.message || "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const text = await response.text();
            console.log("Server response:", text);

            if (response.ok) {
                setError(""); // Clear error
                navigate('/dashboard');
            } else {
                setError("Incorrect email or password");
            }

        } catch (err) {
            console.error("Error:", err);
            setError("Connection error. Please try again later.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-header">
                <h1>Welcome back</h1>
                <p>Enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
                {error && (
                    <div className="error-message">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}
                {successMessage && !error && (
                    <div className="error-message" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.2)' }}>
                        <CheckCircle size={20} />
                        <span>{successMessage}</span>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <div className="input-wrapper">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-wrapper">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="forgot-password-link">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                </div>

                <button type="submit" className="btn-primary">
                    <span>Sign In</span>
                    <ArrowRight size={20} />
                </button>
            </form>

            <div className="auth-footer">
                <p>Don't have an account? <Link to="/register" className="link-primary">Sign up</Link></p>
            </div>
        </div>
    );
};

export default Login;
