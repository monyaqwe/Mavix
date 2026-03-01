import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

import { AUTH_ENDPOINTS, USER_API_BASE } from '../services/config';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/dashboard/projects', { replace: true });
        }
    }, [navigate]);

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
                setError("");
                try {
                    // Fetch user details immediately to store username
                    const userRes = await fetch(`${USER_API_BASE}/api/users/${email}`);
                    let userData = { email, username: email.split("@")[0] };

                    if (userRes.ok) {
                        const fetchedData = await userRes.json();
                        userData = {
                            username: fetchedData.username,
                            email: fetchedData.email
                        };
                    }

                    localStorage.setItem('user', JSON.stringify(userData));
                    // Keep these for backward compatibility if needed elsewhere temporarily
                    localStorage.setItem('username', userData.username);
                    localStorage.setItem('userEmail', userData.email);
                } catch (e) {
                    const fallbackData = { username: email.split("@")[0], email };
                    localStorage.setItem('user', JSON.stringify(fallbackData));
                    localStorage.setItem('username', fallbackData.username);
                    localStorage.setItem('userEmail', fallbackData.email);
                }

                // Redirect user to onboard if they are brand new?
                // Redirecting to projects page
                setTimeout(() => {
                    navigate('/dashboard/projects');
                }, 1000);
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
