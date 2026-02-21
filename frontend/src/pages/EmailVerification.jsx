import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Key, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

import { AUTH_ENDPOINTS } from '../api/config';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize email from location state if available
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

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

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch(AUTH_ENDPOINTS.VERIFY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Instant navigation with success message for the next page
        navigate('/login', { state: { message: "Email verified successfully! Please log in." } });
        return; // Prevent further state updates on unmounted component
      } else {
        const text = await response.text();
        setMessage(text || "Invalid or expired code");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
      setIsSuccess(false);
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setTimer(30);
    setMessage("");

    // Fire-and-forget resend request
    fetch(AUTH_ENDPOINTS.RESEND_VERIFICATION, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }).then(res => {
      if (res.ok) {
        setMessage("Verification code resent!");
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
        <h1>Verify Email</h1>
        <p>Enter the verification code sent to your email.</p>
      </div>

      <form onSubmit={handleVerify} className="auth-form">
        {/* Loader - Level 2 Optimization */}
        {loading && (
          <div className="loader-container">
            <span className="loader"></span>
            <span>Verifying code...</span>
          </div>
        )}

        {message && !loading && (
          <div className={`error-message ${isSuccess ? 'success-message' : ''}`}
            style={isSuccess ? { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.2)' } : {}}>
            {isSuccess ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <div className="input-wrapper">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="code">Verification Code</label>
          <div className="input-wrapper">
            <Key className="input-icon" size={20} />
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          <span>{loading ? "Verifying..." : "Verify Email"}</span>
          {!loading && <ArrowRight size={20} />}
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
    </div>
  );
};

export default EmailVerification;
