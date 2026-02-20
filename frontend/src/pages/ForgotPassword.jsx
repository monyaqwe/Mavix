import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        // Instant navigation with minimal state
        navigate('/reset-password', { state: { email } });

        // Fire-and-forget request to backend
        fetch("http://localhost:8080/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        }).catch(err => console.error("Background request failed:", err));
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

                <button type="submit" className="btn-primary">
                    <span>Send Reset Link</span>
                    <ArrowRight size={20} />
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
