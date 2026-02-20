import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './components/AuthPage';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import EmailVerification from './pages/EmailVerification';
import ResetPassword from './pages/ResetPassword';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import DashboardProjects from './pages/DashboardProjects';
import DashboardAnalytics from './pages/DashboardAnalytics';
import DashboardSettings from './pages/DashboardSettings';
import DashboardHelp from './pages/DashboardHelp';
import ServiceDetail from './pages/ServiceDetail';
import TestConnection from './components/TestConnection';

function App() {
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

        {/* Dashboard with nested sub-pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="projects" element={<DashboardProjects />} />
          <Route path="analytics" element={<DashboardAnalytics />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="help" element={<DashboardHelp />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
