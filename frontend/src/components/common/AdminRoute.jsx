import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import AdminDashboard from '../../pages/AdminDashboard';

const AdminRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem('adminAuth') === 'true'
    );
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');

    const userStr = localStorage.getItem('user');
    let email = '';
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            email = user.email || '';
        } catch (_) { }
    }
    const isAdmin = email === 'makarprogramm@gmail.com';

    if (!isAdmin) {
        return <Navigate to="/dashboard/projects" replace />;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple hardcoded admin password for extra security layer, as requested
        if (passwordInput === 'admin123') {
            sessionStorage.setItem('adminAuth', 'true');
            setIsAuthenticated(true);
        } else {
            setError('Incorrect admin password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-secondary)' }}>
                <form onSubmit={handleLogin} style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#f59e0b' }}>
                        <Lock size={28} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Access Required</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Please enter the admin password to view this dashboard.</p>

                    {error && <div style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>}

                    <input
                        type="password"
                        placeholder="Admin Password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', marginBottom: '1rem', boxSizing: 'border-box' }}
                    />

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', fontWeight: 700 }}>
                        Unlock Dashboard
                    </button>
                    <button type="button" onClick={() => window.location.href = '/dashboard/projects'} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                        Return to Projects
                    </button>
                </form>
            </div>
        );
    }

    return <AdminDashboard />;
};

export default AdminRoute;
