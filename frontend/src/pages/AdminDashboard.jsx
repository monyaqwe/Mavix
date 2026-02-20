import { useNavigate } from 'react-router-dom';
import {
    Users, Activity, ShieldCheck, Settings,
    ArrowUpRight, ArrowDownRight, Clock, Search
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Users', value: '1,284', change: '+12%', trend: 'up', icon: Users, color: '#4f8bff' },
        { label: 'Active Sessions', value: '42', change: '-3%', trend: 'down', icon: Activity, color: '#10b981' },
        { label: 'Security Alerts', value: '0', change: 'Stable', trend: 'up', icon: ShieldCheck, color: '#f87171' },
        { label: 'System Health', value: '99.9%', change: '+0.1%', trend: 'up', icon: Activity, color: '#a855f7' },
    ];

    const recentLogs = [
        { id: 1, action: 'User Registration', user: 'alice@example.com', time: '2 mins ago', status: 'Success' },
        { id: 2, action: 'Settings Updated', user: 'admin@mavx.io', time: '15 mins ago', status: 'Success' },
        { id: 3, action: 'Failed Login Attempt', user: 'unknown@ip-45.x', time: '45 mins ago', status: 'Warning' },
        { id: 4, action: 'Project Created', user: 'bob@design.co', time: '1 hour ago', status: 'Success' },
    ];

    return (
        <div className="admin-dash">
            <div className="dash__welcome">
                <div>
                    <h2 className="dash__welcome-title">Admin Cabinet</h2>
                    <p className="dash__welcome-sub">System control and user management overview.</p>
                </div>
                <button className="dash__new-project-btn" onClick={() => window.print()}>
                    <Activity size={18} />
                    <span>Generate Report</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="dash__stats-row">
                {stats.map((stat, i) => (
                    <div key={i} className="dash__stat">
                        <div className="dash__stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            <stat.icon size={22} />
                        </div>
                        <div className="dash__stat-info">
                            <span className="dash__stat-label" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.label}</span>
                            <span className="dash__stat-value" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{stat.value}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                {stat.trend === 'up' ? <ArrowUpRight size={14} color="#10b981" /> : <ArrowDownRight size={14} color="#f87171" />}
                                <span style={{ fontSize: '0.75rem', color: stat.trend === 'up' ? '#10b981' : '#f87171' }}>{stat.change}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                {/* System Logs */}
                <div className="service-card" style={{ padding: '1.5rem', height: 'fit-content' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0 }}>System Activity</h3>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Filter logs..."
                                style={{ padding: '0.4rem 0.75rem 0.4rem 2.25rem', fontSize: '0.8rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentLogs.map((log) => (
                            <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'rgba(79, 139, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(79, 139, 255, 0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: log.status === 'Success' ? '#10b981' : '#f59e0b' }}></div>
                                    <div>
                                        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{log.action}</p>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.user}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Clock size={14} /> {log.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Controls */}
                <div className="service-card" style={{ padding: '1.5rem', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Quick Controls</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button className="dash__plan-btn" style={{ background: 'rgba(79, 139, 255, 0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(79, 139, 255, 0.2)' }}>Purge Old Logs</button>
                        <button className="dash__plan-btn" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.2)' }}>System Backup</button>
                        <button className="dash__plan-btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', marginTop: '1rem' }}>Maintenance Mode</button>
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <Settings size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Advanced settings available in System Config.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
