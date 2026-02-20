import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import mavxLogo from '../assets/mavx-logo.svg';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Navbar />

      {/* Animated background */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="grid-overlay"></div>

      {/* Centered form card */}
      <div className="auth-form-container">
        <div className="form-wrapper">
          <Outlet />
        </div>
      </div>

      <style>{`
        .auth-layout {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          overflow: hidden;
        }

        .auth-layout > .bg-orbs {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .auth-layout > .grid-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .auth-form-container {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          width: 100%;
          min-height: 100vh;
          padding-top: 6rem;
        }

        .form-wrapper {
          width: 100%;
          max-width: 440px;
          animation: fadeInUp 0.5s ease-out;
          background: rgba(12, 18, 37, 0.5);
          border: 1px solid rgba(79, 139, 255, 0.1);
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          backdrop-filter: blur(20px);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 80px rgba(79, 139, 255, 0.04);
        }

        @media (max-width: 480px) {
          .form-wrapper {
            padding: 1.5rem;
            border-radius: var(--radius-lg);
          }
          .auth-form-container {
            padding-top: 5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;
