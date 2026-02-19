import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, Bell } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear tokens/session logic here if needed
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <div className="nav-logo">
                    <h2>SecureWait</h2>
                </div>
                <div className="nav-actions">
                    <button className="icon-btn"><Bell size={20} /></button>
                    <button className="icon-btn"><Settings size={20} /></button>
                    <div className="user-profile">
                        <div className="avatar">
                            <User size={20} />
                        </div>
                        <span>John Doe</span>
                    </div>
                </div>
            </nav>

            <main className="dashboard-content">
                <header className="content-header">
                    <h1>Welcome back, John!</h1>
                    <p>Here's what's happening with your account today.</p>
                </header>

                <div className="dashboard-cards">
                    <div className="card">
                        <h3>Account Status</h3>
                        <div className="status-indicator active">Active</div>
                        <p>Your subscription is valid until Dec 2026.</p>
                    </div>
                    <div className="card">
                        <h3>Recent Activity</h3>
                        <p>No recent login attempts detected from new devices.</p>
                    </div>
                    <div className="card">
                        <h3>Security</h3>
                        <p>2FA is currently disabled. Enable it for better protection.</p>
                        <button className="btn-text">Enable 2FA &rarr;</button>
                    </div>
                </div>

                <div className="dashboard-actions">
                    <button onClick={handleLogout} className="btn-logout">
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </main>

            <style>{`
                .dashboard-container {
                    min-height: 100vh;
                    background-color: var(--bg-primary);
                    color: var(--text-primary);
                }

                .dashboard-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    background-color: var(--bg-secondary);
                    border-bottom: 1px solid var(--border-color);
                }

                .nav-logo h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .icon-btn {
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: color 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .icon-btn:hover {
                    color: var(--text-primary);
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .avatar {
                    width: 36px;
                    height: 36px;
                    background: var(--accent-gradient);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }

                .dashboard-content {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 3rem 2rem;
                    animation: fadeIn 0.5s ease-out;
                }

                .content-header {
                    margin-bottom: 3rem;
                }

                .content-header h1 {
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(to right, #fff, #94a3b8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .content-header p {
                    color: var(--text-secondary);
                    font-size: 1.1rem;
                }

                .dashboard-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                .card {
                    background-color: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: 2rem;
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lg);
                    border-color: var(--text-secondary);
                }

                .card h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                }

                .card p {
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                    line-height: 1.6;
                }

                .status-indicator {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    margin-bottom: 1rem;
                }

                .status-indicator.active {
                    background-color: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }

                .btn-text {
                    background: none;
                    border: none;
                    color: var(--accent-primary);
                    font-weight: 600;
                    cursor: pointer;
                    padding: 0;
                }

                .btn-text:hover {
                    text-decoration: underline;
                }

                .btn-logout {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background-color: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-logout:hover {
                    background-color: rgba(239, 68, 68, 0.2);
                }

                @media (max-width: 768px) {
                    .dashboard-nav {
                        padding: 1rem;
                    }
                    .dashboard-content {
                        padding: 2rem 1rem;
                    }
                    .content-header h1 {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
