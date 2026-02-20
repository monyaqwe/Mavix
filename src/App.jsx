import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthModal from './components/AuthModal';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import EmailVerification from './pages/EmailVerification';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import TestConnection from './components/TestConnection';

function App() {
  return (
    <Router>
      <Routes>

        {/* Home layout — always renders the landing page */}
        <Route path="/" element={<Home />}>
          {/* Auth modals overlay on top of Home */}
          <Route path="register" element={<AuthModal><Register /></AuthModal>} />
          <Route path="login" element={<AuthModal><Login /></AuthModal>} />
          <Route path="forgot-password" element={<AuthModal><ForgotPassword /></AuthModal>} />
          <Route path="verify-email" element={<AuthModal><EmailVerification /></AuthModal>} />
          <Route path="reset-password" element={<AuthModal><ResetPassword /></AuthModal>} />
          <Route path="test" element={<AuthModal><TestConnection /></AuthModal>} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
