import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Key, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get email from location state
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        } else {
            // Redirect back to forgot password if no email is present
            navigate('/forgot-password');
        }
    }, [location.state, navigate]);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setIsSuccess(false);

        try {
            const response = await fetch("http://localhost:8080/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code, newPassword }),
            });

            if (response.ok) {
                setIsSuccess(true);
                // Instant navigation with success message
                navigate('/login', { state: { message: "Password reset successfully! Please log in with your new password." } });
                return;
            } else {
                const text = await response.text();
                setMessage(text || "Failed to reset password. Please try again.");
                setIsSuccess(false);
            }
        } catch (error) {
            setMessage("Server error. Please try again later.");
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setCanResend(false);
        setTimer(30);
        setMessage("");

        // Fire-and-forget resend request (using forgot-password endpoint)
        fetch("http://localhost:8080/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        }).then(res => {
            if (res.ok) {
                setMessage("Reset code resent via email!");
                setIsSuccess(true);
            } else {
                setMessage("Failed to resend code.");
                setIsSuccess(false);
            }
        }).catch(() => {
            setMessage("Connection error.");
            setIsSuccess(false);
        });
    };

    return (
        <div className="auth-page">
            <div className="auth-header">
                <h1>Set new password</h1>
                <p>Enter the code sent to <strong>{email}</strong> and your new password.</p>
            </div>

            <form onSubmit={handleReset} className="auth-form">
                {message && !loading && (
                    <div className={`error-message ${isSuccess ? 'success-message' : ''}`}
                        style={isSuccess ? { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.2)' } : {}}>
                        {isSuccess ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span>{message}</span>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="code">Verification Code</label>
                    <div className="input-wrapper">
                        <Key className="input-icon" size={20} />
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter 6-digit code"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="input-wrapper">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            minLength={8}
                        />
                    </div>
                    <p className="hint">Must be at least 8 characters</p>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? (
                        <div className="loader-container" style={{ margin: 0, color: 'white' }}>
                            <span className="loader" style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderBottomColor: 'white' }}></span>
                            <span>Resetting password...</span>
                        </div>
                    ) : (
                        <>
                            <span>Reset Password</span>
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <button
                        type="button"
                        onClick={handleResend}
                        className="btn-secondary"
                        disabled={!canResend}
                        style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', border: 'none', color: canResend ? 'var(--accent-primary)' : 'var(--text-muted)' }}
                    >
                        {canResend ? "Resend Verification Code" : `Resend code in ${timer}s`}
                    </button>
                </div>
            </form>

            <div className="auth-footer">
                <p>Remember your password? <Link to="/login" className="link-primary">Sign in</Link></p>
            </div>
        </div>
    );
};

export default ResetPassword;
