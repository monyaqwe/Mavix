import { Outlet } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      {/* Left Side - Hero Section */}
      <div className="auth-hero">
        <div className="hero-content">
          <div className="logo-container">
            <ShieldCheck size={40} className="logo-icon" />
            <h1 className="logo-text">SecureWait</h1>
          </div>
          <div className="hero-text">
            <h2>Join the exclusive community.</h2>
            <p>Experience the next generation of secure platform access.</p>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </div>

      {/* Right Side - Form Section */}
      <div className="auth-form-container">
        <div className="form-wrapper">
          <Outlet />
        </div>
      </div>

      <style>{`
        .auth-layout {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }

        .auth-hero {
          display: none;
          position: relative;
          width: 50%;
          background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          flex-direction: column;
          justify-content: space-between;
          padding: 4rem;
          color: white;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.8));
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .logo-icon {
          color: var(--accent-primary);
        }

        .hero-text h2 {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-text p {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 80%;
        }

        .auth-form-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-primary);
          padding: 2rem;
        }

        .form-wrapper {
          width: 100%;
          max-width: 440px;
          animation: fadeIn 0.5s ease-out;
        }

        @media (min-width: 1024px) {
          .auth-hero {
            display: flex;
          }
          .auth-form-container {
            width: 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;
