import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import AuthPage from './components/auth/AuthPage';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import EmailVerification from './pages/EmailVerification';
import ResetPassword from './pages/ResetPassword';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import DashboardProjects from './pages/DashboardProjects';
import DashboardAnalytics from './pages/DashboardAnalytics';
import DashboardSettings from './pages/DashboardSettings';
import DashboardInvoices from './pages/DashboardInvoices';
import DashboardHelp from './pages/DashboardHelp';
import ServiceDetail from './pages/ServiceDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/common/AdminRoute';
import Cart from './pages/Cart';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import TestConnection from './components/common/TestConnection';

function App() {
  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  }, []);

  return (
    <Router>
      <Routes>

        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Auth — full pages with Navbar + animated background */}
        <Route path="/register" element={<AuthPage><Register /></AuthPage>} />
        <Route path="/login" element={<AuthPage><Login /></AuthPage>} />
        <Route path="/forgot-password" element={<AuthPage><ForgotPassword /></AuthPage>} />
        <Route path="/verify-email" element={<AuthPage><EmailVerification /></AuthPage>} />
        <Route path="/reset-password" element={<AuthPage><ResetPassword /></AuthPage>} />
        <Route path="/test" element={<AuthPage><TestConnection /></AuthPage>} />

        {/* Service detail pages */}
        <Route path="/services/:slug" element={<ServiceDetail />} />

        {/* Legal pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Dashboard with nested sub-pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/projects" replace />} />
          <Route path="projects" element={<DashboardProjects />} />
          <Route path="analytics" element={<DashboardAnalytics />} />
          <Route path="invoices" element={<DashboardInvoices />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="help" element={<DashboardHelp />} />
          <Route path="admin" element={<AdminRoute />} />
          <Route path="cart" element={<Cart />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
