import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LogOut, Settings, Bell, Home, FolderOpen, BarChart3,
    HelpCircle, Menu, X, Sparkles, ShieldCheck, CreditCard
} from 'lucide-react';
import mavxLogo from '../../assets/mavx-logo.svg';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifCount, setNotifCount] = useState(3);
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setUsername(user.username || 'User');
                // Admin check
                if (user.email === 'makarprogramm@gmail.com') {
                    setIsAdmin(true);
                }
            } else {
                const legacyUsername = localStorage.getItem('username') || 'User';
                const legacyEmail = localStorage.getItem('userEmail');
                setUsername(legacyUsername);
                if (legacyEmail === 'makarprogramm@gmail.com') {
                    setIsAdmin(true);
                }
            }
        } catch (e) {
            setUsername('User');
        }
    }, []);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            navigate('/login');
        }
    };

    const clearNotifs = () => {
        setNotifCount(0);
        alert('All notifications cleared.');
    };

    const navItems = [
        {
            label: 'Marketplace', items: [
                { icon: FolderOpen, text: 'Service Catalog', path: '/dashboard/projects' },
            ]
        },
        {
            label: 'Payments', items: [
                { icon: CreditCard, text: 'My Requests', path: '/dashboard/invoices' },
            ]
        },
        {
            label: 'Administration', items: [
                { icon: ShieldCheck, text: 'Admin Cabinet', path: '/dashboard/admin' },
            ]
        },
        {
            label: 'Account', items: [
                { icon: Settings, text: 'Settings', path: '/dashboard/settings' },
            ]
        }
    ];

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    return (
        <div className="dash">
            {/* Sidebar */}
            <aside className={`dash__sidebar ${sidebarOpen ? 'dash__sidebar--open' : ''}`}>
                <div className="dash__sidebar-header">
                    <Link to="/" className="dash__logo">
                        <img src={mavxLogo} alt="The Mavx" className="dash__logo-img" />
                        <span className="dash__logo-text">The Mavx</span>
                    </Link>
                    <button className="dash__sidebar-close" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="dash__nav">
                    {navItems.map((group, gi) => {
                        // Skip Administration if not admin
                        if (group.label === 'Administration' && !isAdmin) return null;

                        return (
                            <div key={gi}>
                                <span className="dash__nav-label">{group.label}</span>
                                {group.items.map((item, ii) => (
                                    <Link
                                        key={ii}
                                        to={item.path}
                                        className={`dash__nav-item ${isActive(item.path) ? 'dash__nav-item--active' : ''}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <item.icon size={18} />
                                        <span>{item.text}</span>
                                    </Link>
                                ))}
                            </div>
                        );
                    })}
                </nav>

                <div className="dash__sidebar-footer">
                    <button onClick={handleLogout} className="dash__logout-btn">
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Backdrop for mobile sidebar */}
            {sidebarOpen && <div className="dash__backdrop" onClick={() => setSidebarOpen(false)}></div>}

            {/* Main content */}
            <div className="dash__main">
                {/* Top bar */}
                <header className="dash__topbar">
                    <button className="dash__burger" onClick={() => setSidebarOpen(true)}>
                        <Menu size={22} />
                    </button>
                    <div style={{ flex: 1 }}></div>
                    <div className="dash__topbar-actions">
                        <button className="dash__icon-btn dash__notif-btn" onClick={clearNotifs}>
                            <Bell size={19} />
                            {notifCount > 0 && <span className="dash__notif-dot"></span>}
                        </button>
                        <div className="dash__user">
                            <Link to="/dashboard/settings" className="dash__avatar">
                                {username ? username.substring(0, 2).toUpperCase() : 'U'}
                            </Link>
                            <div className="dash__user-info">
                                <span className="dash__user-name">{username}</span>
                                <span className="dash__user-role">Professional</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content — rendered by child routes */}
                <div className="dash__content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
