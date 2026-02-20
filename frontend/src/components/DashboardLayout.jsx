import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LogOut, Settings, Bell, Home, FolderOpen, BarChart3,
    HelpCircle, Menu, X, Sparkles, ShieldCheck
} from 'lucide-react';
import mavxLogo from '../assets/mavx-logo.svg';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notifCount, setNotifCount] = useState(3);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            navigate('/login');
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            alert(`Searching for: ${searchQuery}`);
            setSearchQuery('');
        }
    };

    const clearNotifs = () => {
        setNotifCount(0);
        alert('All notifications cleared.');
    };

    const navItems = [
        {
            label: 'Main', items: [
                { icon: Home, text: 'Overview', path: '/dashboard' },
                { icon: FolderOpen, text: 'Projects', path: '/dashboard/projects' },
                { icon: BarChart3, text: 'Analytics', path: '/dashboard/analytics' },
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
                { icon: HelpCircle, text: 'Help & Support', path: '/dashboard/help' },
            ]
        }
    ];

    const isActive = (path) => {
        if (path === '/dashboard') return location.pathname === '/dashboard';
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
                    {navItems.map((group, gi) => (
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
                    ))}
                </nav>

                <div className="dash__sidebar-footer">
                    <div className="dash__plan-card">
                        <Sparkles size={16} className="dash__plan-icon" />
                        <p className="dash__plan-title">Professional Plan</p>
                        <p className="dash__plan-desc">Upgrade to Enterprise for unlimited projects</p>
                        <button className="dash__plan-btn">Upgrade Plan</button>
                    </div>
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
                    <div className="dash__search">
                        <input
                            type="text"
                            placeholder="Search projects, invoices..."
                            className="dash__search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                    <div className="dash__topbar-actions">
                        <button className="dash__icon-btn dash__notif-btn" onClick={clearNotifs}>
                            <Bell size={19} />
                            {notifCount > 0 && <span className="dash__notif-dot"></span>}
                        </button>
                        <div className="dash__user">
                            <Link to="/dashboard/settings" className="dash__avatar">JD</Link>
                            <div className="dash__user-info">
                                <span className="dash__user-name">John Doe</span>
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
