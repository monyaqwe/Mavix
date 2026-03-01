import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, ArrowLeft, AlertCircle } from 'lucide-react';

import { AUTH_ENDPOINTS } from '../services/config';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        setGeneralError("");
        setLoading(true);

        try {
            const response = await fetch(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                // Navigate only on success
                navigate('/reset-password', { state: { email } });
            } else {
                try {
                    const text = await response.text();
                    const errorMsg = text ? JSON.parse(text).message || text : "Failed to send reset link.";
                    setGeneralError(errorMsg);
                } catch (e) {
                    setGeneralError("Failed to send reset link.");
                }
            }
        } catch (err) {
            console.error("Forgot password request failed:", err);
            setGeneralError("Network error. Please make sure the server is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="back-link">
                <Link to="/register">
                    <ArrowLeft size={16} />
                    <span>Back to sign up</span>
                </Link>
            </div>

            <div className="auth-header">
                <h1>Reset Password</h1>
                <p>Enter your email to receive a password reset link.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
                {generalError && (
                    <div className="error-message">
                        <AlertCircle size={20} />
                        <span>{generalError}</span>
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

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? (
                        <div className="loader-container" style={{ margin: 0, color: 'white' }}>
                            <span className="loader" style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderBottomColor: 'white' }}></span>
                            <span>Sending...</span>
                        </div>
                    ) : (
                        <>
                            <span>Send Reset Link</span>
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
