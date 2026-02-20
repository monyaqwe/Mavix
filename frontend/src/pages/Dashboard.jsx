import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    LogOut, User, Settings, Bell, Home, FolderOpen, CreditCard, BarChart3,
    HelpCircle, ChevronRight, Clock, CheckCircle2, AlertCircle, ArrowUpRight,
    Plus, Shield, Eye, Menu, X, Sparkles
} from 'lucide-react';
import mavxLogo from '../assets/mavx-logo.svg';

const Dashboard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        navigate('/login');
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
                    <span className="dash__nav-label">Main</span>
                    <a href="#" className="dash__nav-item dash__nav-item--active">
                        <Home size={18} />
                        <span>Overview</span>
                    </a>
                    <a href="#" className="dash__nav-item">
                        <FolderOpen size={18} />
                        <span>Projects</span>
                    </a>
                    <a href="#" className="dash__nav-item">
                        <BarChart3 size={18} />
                        <span>Analytics</span>
                    </a>
                    <a href="#" className="dash__nav-item">
                        <CreditCard size={18} />
                        <span>Billing</span>
                    </a>

                    <span className="dash__nav-label">Account</span>
                    <a href="#" className="dash__nav-item">
                        <Settings size={18} />
                        <span>Settings</span>
                    </a>
                    <a href="#" className="dash__nav-item">
                        <HelpCircle size={18} />
                        <span>Help & Support</span>
                    </a>
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
                        <input type="text" placeholder="Search projects, invoices..." className="dash__search-input" />
                    </div>
                    <div className="dash__topbar-actions">
                        <button className="dash__icon-btn dash__notif-btn">
                            <Bell size={19} />
                            <span className="dash__notif-dot"></span>
                        </button>
                        <div className="dash__user">
                            <div className="dash__avatar">JD</div>
                            <div className="dash__user-info">
                                <span className="dash__user-name">John Doe</span>
                                <span className="dash__user-role">Professional</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <div className="dash__content">
                    {/* Welcome */}
                    <div className="dash__welcome">
                        <div>
                            <h1 className="dash__welcome-title">Welcome back, <span className="text-gradient">John!</span></h1>
                            <p className="dash__welcome-sub">Here's an overview of your projects and account activity.</p>
                        </div>
                        <Link to="/register" className="dash__new-project-btn">
                            <Plus size={18} />
                            <span>New Project</span>
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="dash__stats-row">
                        <div className="dash__stat">
                            <div className="dash__stat-icon dash__stat-icon--blue"><FolderOpen size={20} /></div>
                            <div>
                                <span className="dash__stat-value">3</span>
                                <span className="dash__stat-label">Active Projects</span>
                            </div>
                        </div>
                        <div className="dash__stat">
                            <div className="dash__stat-icon dash__stat-icon--green"><CheckCircle2 size={20} /></div>
                            <div>
                                <span className="dash__stat-value">12</span>
                                <span className="dash__stat-label">Tasks Completed</span>
                            </div>
                        </div>
                        <div className="dash__stat">
                            <div className="dash__stat-icon dash__stat-icon--purple"><Clock size={20} /></div>
                            <div>
                                <span className="dash__stat-value">5</span>
                                <span className="dash__stat-label">Pending Reviews</span>
                            </div>
                        </div>
                        <div className="dash__stat">
                            <div className="dash__stat-icon dash__stat-icon--orange"><Eye size={20} /></div>
                            <div>
                                <span className="dash__stat-value">2.4k</span>
                                <span className="dash__stat-label">Site Visitors</span>
                            </div>
                        </div>
                    </div>

                    {/* Projects + Activity grid */}
                    <div className="dash__grid">
                        {/* Projects */}
                        <div className="dash__card dash__card--projects">
                            <div className="dash__card-header">
                                <h3>Active Projects</h3>
                                <button className="dash__card-link">View All <ChevronRight size={14} /></button>
                            </div>
                            <div className="dash__project-list">
                                <div className="dash__project">
                                    <div className="dash__project-color" style={{ background: 'linear-gradient(135deg, #4f8bff, #7c5cfc)' }}></div>
                                    <div className="dash__project-info">
                                        <span className="dash__project-name">E-Commerce Redesign</span>
                                        <span className="dash__project-meta">Started Jan 15 · 65% complete</span>
                                    </div>
                                    <div className="dash__project-progress">
                                        <div className="dash__progress-bar"><div className="dash__progress-fill" style={{ width: '65%' }}></div></div>
                                    </div>
                                </div>
                                <div className="dash__project">
                                    <div className="dash__project-color" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}></div>
                                    <div className="dash__project-info">
                                        <span className="dash__project-name">Brand Landing Page</span>
                                        <span className="dash__project-meta">Started Feb 2 · 40% complete</span>
                                    </div>
                                    <div className="dash__project-progress">
                                        <div className="dash__progress-bar"><div className="dash__progress-fill" style={{ width: '40%', background: 'linear-gradient(90deg, #a855f7, #ec4899)' }}></div></div>
                                    </div>
                                </div>
                                <div className="dash__project">
                                    <div className="dash__project-color" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}></div>
                                    <div className="dash__project-info">
                                        <span className="dash__project-name">SEO Optimization</span>
                                        <span className="dash__project-meta">Started Feb 10 · 20% complete</span>
                                    </div>
                                    <div className="dash__project-progress">
                                        <div className="dash__progress-bar"><div className="dash__progress-fill" style={{ width: '20%', background: 'linear-gradient(90deg, #10b981, #06b6d4)' }}></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="dash__card dash__card--activity">
                            <div className="dash__card-header">
                                <h3>Recent Activity</h3>
                                <button className="dash__card-link">View All <ChevronRight size={14} /></button>
                            </div>
                            <div className="dash__activity-list">
                                <div className="dash__activity">
                                    <div className="dash__activity-dot dash__activity-dot--green"></div>
                                    <div className="dash__activity-body">
                                        <p>Design mockups approved for <strong>E-Commerce Redesign</strong></p>
                                        <span className="dash__activity-time">2 hours ago</span>
                                    </div>
                                </div>
                                <div className="dash__activity">
                                    <div className="dash__activity-dot dash__activity-dot--blue"></div>
                                    <div className="dash__activity-body">
                                        <p>New revision requested on <strong>Brand Landing Page</strong></p>
                                        <span className="dash__activity-time">5 hours ago</span>
                                    </div>
                                </div>
                                <div className="dash__activity">
                                    <div className="dash__activity-dot dash__activity-dot--purple"></div>
                                    <div className="dash__activity-body">
                                        <p>Invoice #INV-0042 paid — <strong>$599.00</strong></p>
                                        <span className="dash__activity-time">1 day ago</span>
                                    </div>
                                </div>
                                <div className="dash__activity">
                                    <div className="dash__activity-dot dash__activity-dot--orange"></div>
                                    <div className="dash__activity-body">
                                        <p>SEO audit report ready for <strong>SEO Optimization</strong></p>
                                        <span className="dash__activity-time">2 days ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom row: Quick actions + Security */}
                    <div className="dash__grid">
                        <div className="dash__card">
                            <div className="dash__card-header">
                                <h3>Quick Actions</h3>
                            </div>
                            <div className="dash__quick-actions">
                                <a href="#" className="dash__quick-action">
                                    <FolderOpen size={20} />
                                    <span>Request New Project</span>
                                    <ArrowUpRight size={14} className="dash__qa-arrow" />
                                </a>
                                <a href="#" className="dash__quick-action">
                                    <CreditCard size={20} />
                                    <span>View Invoices</span>
                                    <ArrowUpRight size={14} className="dash__qa-arrow" />
                                </a>
                                <a href="#" className="dash__quick-action">
                                    <HelpCircle size={20} />
                                    <span>Contact Support</span>
                                    <ArrowUpRight size={14} className="dash__qa-arrow" />
                                </a>
                            </div>
                        </div>

                        <div className="dash__card">
                            <div className="dash__card-header">
                                <h3>Security</h3>
                            </div>
                            <div className="dash__security">
                                <div className="dash__security-item">
                                    <div className="dash__security-icon dash__security-icon--ok"><CheckCircle2 size={18} /></div>
                                    <div>
                                        <span className="dash__security-label">Email Verified</span>
                                        <span className="dash__security-value">john@example.com</span>
                                    </div>
                                </div>
                                <div className="dash__security-item">
                                    <div className="dash__security-icon dash__security-icon--warn"><AlertCircle size={18} /></div>
                                    <div>
                                        <span className="dash__security-label">Two-Factor Auth</span>
                                        <span className="dash__security-value">Not enabled</span>
                                    </div>
                                    <button className="dash__enable-btn">
                                        <Shield size={14} />
                                        <span>Enable</span>
                                    </button>
                                </div>
                                <div className="dash__security-item">
                                    <div className="dash__security-icon dash__security-icon--ok"><CheckCircle2 size={18} /></div>
                                    <div>
                                        <span className="dash__security-label">Last Login</span>
                                        <span className="dash__security-value">Today, 10:45 AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
