import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users, Activity, ShieldCheck, Settings,
    ArrowUpRight, ArrowDownRight, Clock, Search, Loader2, X
} from 'lucide-react';
import { USER_ENDPOINTS } from '../services/config';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        totalProjects: 0,
        recentLogs: []
    });
    const [projectRequests, setProjectRequests] = useState([]);
    const [pricingLoading, setPricingLoading] = useState(false);
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [priceInput, setPriceInput] = useState('');

    useEffect(() => {
        const checkAuth = () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    if (user.email !== 'makarprogramm@gmail.com') {
                        navigate('/dashboard');
                    }
                } else {
                    const legacyEmail = localStorage.getItem('userEmail');
                    if (legacyEmail !== 'makarprogramm@gmail.com') {
                        navigate('/dashboard');
                    }
                }
            } catch (e) {
                navigate('/dashboard');
            }
        };
        checkAuth();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(USER_ENDPOINTS.ADMIN_STATS);
            if (response.ok) {
                const data = await response.json();
                setDashboardData({
                    totalUsers: data.totalUsers || 0,
                    totalProjects: data.totalProjects || 0,
                    recentLogs: data.recentLogs || []
                });
            }

            const contactRes = await fetch(USER_ENDPOINTS.CONTACT);
            if (contactRes.ok) {
                const contactData = await contactRes.json();
                console.log("Admin: Fetched contact requests:", contactData);
                setProjectRequests(Array.isArray(contactData) ? contactData : []);
            }
        } catch (error) {
            console.error('Failed to fetch admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        fetchData();
    };

    const handleOpenPricingModal = (project) => {
        setSelectedProject(project);
        setPriceInput(project.price || '');
        setIsPricingModalOpen(true);
    };

    const handleSetPrice = async () => {
        if (!selectedProject || !priceInput || isNaN(priceInput)) return;

        setPricingLoading(true);
        try {
            const response = await fetch(`${USER_ENDPOINTS.CONTACT}/${selectedProject.id}/set-price?amount=${priceInput}`, {
                method: 'POST'
            });
            if (response.ok) {
                await fetchData();
                setIsPricingModalOpen(false);
                alert("Quote updated successfully!");
            }
        } catch (err) {
            alert("Failed to set price: " + err.message);
        } finally {
            setPricingLoading(false);
        }
    };

    // Calculate Total Revenue from projectRequests
    const totalRevenue = (projectRequests || [])
        .filter(req => req.paymentStatus === 'PAID')
        .reduce((sum, req) => sum + (req.price || 0), 0);

    const stats = [
        { label: 'Total Users', value: (dashboardData.totalUsers || 0).toLocaleString(), change: '+12%', trend: 'up', icon: Users, color: '#4f8bff' },
        { label: 'Project Inquiries', value: (projectRequests || []).length.toString(), change: '+8%', trend: 'up', icon: Activity, color: '#10b981' },
        { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+24%', trend: 'up', icon: ShieldCheck, color: '#f59e0b' },
        { label: 'System Health', value: '99.9%', change: 'Stable', trend: 'up', icon: Activity, color: '#a855f7' },
    ];

    const recentLogs = (dashboardData.recentLogs || []).map(log => ({
        id: log.id,
        action: log.action || 'Unknown Action',
        user: log.userEmail || 'System',
        time: log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Recent',
        status: log.status || 'Info'
    }));

    if (loading) {
        return (
            <div className="dash__content" style={{ padding: '2rem', textAlign: 'center' }}>
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div className="admin-dash" style={{ padding: '2.5rem' }}>
            <div className="dash__welcome">
                <div>
                    <h2 className="dash__welcome-title">Admin Cabinet</h2>
                    <p className="dash__welcome-sub">System control and revenue management overview.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="dash__refresh-btn" onClick={handleRefresh} disabled={loading} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.6rem 1.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <Activity size={18} className={loading ? 'animate-spin' : ''} />
                        <span>Refresh Data</span>
                    </button>
                    <button className="dash__new-project-btn" onClick={() => window.print()}>
                        <Activity size={18} />
                        <span>Generate Report</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="dash__stats-row">
                {stats.map((stat, i) => (
                    <div key={i} className="dash__stat">
                        <div className="dash__stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            <stat.icon size={22} />
                        </div>
                        <div className="dash__stat-info">
                            <span className="dash__stat-label">{stat.label}</span>
                            <span className="dash__stat-value">{stat.value}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                {stat.trend === 'up' ? <ArrowUpRight size={14} color="#10b981" /> : <ArrowDownRight size={14} color="#f87171" />}
                                <span style={{ fontSize: '0.75rem', color: stat.trend === 'up' ? '#10b981' : '#f87171' }}>{stat.change}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {/* Project Requests & Pricing */}
                <div className="service-card" style={{ padding: '1.5rem', height: 'fit-content', gridColumn: '1 / span 2' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Quote Management</h3>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Review client inquiries and assign project pricing.</p>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search clients..."
                                style={{ padding: '0.5rem 1rem 0.5rem 2.25rem', fontSize: '0.85rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', width: '250px' }}
                            />
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <th style={{ padding: '1rem 0.5rem' }}>Client</th>
                                    <th style={{ padding: '1rem 0.5rem' }}>Project Details</th>
                                    <th style={{ padding: '1rem 0.5rem' }}>Status</th>
                                    <th style={{ padding: '1rem 0.5rem' }}>Price</th>
                                    <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No project requests found.</td>
                                    </tr>
                                ) : (
                                    projectRequests.map((req) => (
                                        <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                                            <td style={{ padding: '1.25rem 0.5rem' }}>
                                                <div style={{ fontWeight: 600 }}>{req.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.email}</div>
                                            </td>
                                            <td style={{ padding: '1.25rem 0.5rem' }}>
                                                <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{req.subject}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{req.message}</div>
                                            </td>
                                            <td style={{ padding: '1.25rem 0.5rem' }}>
                                                <span className={`status-badge status-${req.paymentStatus === 'PAID' ? 'success' : req.paymentStatus === 'PENDING_PAYMENT' ? 'warning' : 'pending'}`} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                                                    {req.paymentStatus?.replace('_', ' ') || 'PENDING'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.25rem 0.5rem', fontWeight: 700, fontFamily: 'monospace' }}>
                                                {req.price ? `$${req.price.toLocaleString()}` : '—'}
                                            </td>
                                            <td style={{ padding: '1.25rem 0.5rem', textAlign: 'right' }}>
                                                {req.paymentStatus === 'PAID' ? (
                                                    <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                                                        <ShieldCheck size={14} /> Invoice Paid
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleOpenPricingModal(req)}
                                                        className={req.paymentStatus === 'PENDING_PRICING' ? "btn-primary" : "btn-secondary"}
                                                        style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', width: 'auto', borderRadius: '10px' }}
                                                        disabled={pricingLoading}
                                                    >
                                                        {req.paymentStatus === 'PENDING_PRICING' ? 'Set Quote' : 'Edit Quote'}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ACTIVITY LOGS */}
                <div className="service-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 800 }}>User Activity Reports</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentLogs.slice(0, 5).map((log) => (
                            <div key={log.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                <div style={{ width: '40px', height: '40px', background: 'rgba(79, 139, 255, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                                    <Users size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>{log.user}</p>
                                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{log.action} · {log.time}</p>
                                </div>
                                <div style={{ fontSize: '0.7rem', color: log.status === 'Success' ? '#10b981' : '#f59e0b', fontWeight: 700 }}>
                                    {log.status.toUpperCase()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* REVENUE INSIGHTS */}
                <div className="service-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 800 }}>Revenue Insights</h3>
                    <div style={{ background: 'var(--accent-gradient)', padding: '1.5rem', borderRadius: '16px', color: 'white', marginBottom: '1.5rem' }}>
                        <p style={{ margin: 0, opacity: 0.8, fontSize: '0.8rem' }}>Settled Revenue</p>
                        <h4 style={{ margin: '0.25rem 0 0', fontSize: '2rem', fontWeight: 900 }}>${totalRevenue.toLocaleString()}</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Pending Payments:</span>
                            <span style={{ fontWeight: 600 }}>${projectRequests.filter(r => r.paymentStatus === 'PENDING_PAYMENT').reduce((s, r) => s + (r.price || 0), 0).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Conversion Rate:</span>
                            <span style={{ fontWeight: 600 }}>{projectRequests.length > 0 ? Math.round((projectRequests.filter(r => r.paymentStatus === 'PAID').length / projectRequests.length) * 100) : 0}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* REVIEW & QUOTE MODAL */}
            {isPricingModalOpen && (
                <div className="auth-modal-backdrop" onClick={() => !pricingLoading && setIsPricingModalOpen(false)}>
                    <div className="auth-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', borderRadius: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Project Review & Quote</h2>
                            <button onClick={() => setIsPricingModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '14px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Inquiry from {selectedProject?.name}</p>
                            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{selectedProject?.subject}</h4>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxHieght: '150px', overflowY: 'auto', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                {selectedProject?.message}
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ fontWeight: 700 }}>Assign Project Price (USD)</label>
                            <div className="input-wrapper" style={{ marginTop: '0.5rem' }}>
                                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--accent-primary)' }}>$</span>
                                <input
                                    type="number"
                                    value={priceInput}
                                    onChange={(e) => setPriceInput(e.target.value)}
                                    placeholder="e.g. 2500"
                                    style={{ paddingLeft: '2.5rem', fontSize: '1.1rem', fontWeight: 700 }}
                                />
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                                This price will be visible to the client on their dashboard immediately after saving.
                            </p>
                        </div>

                        <button
                            className="btn-primary"
                            style={{ width: '100%', padding: '1rem', marginTop: '1.5rem', fontSize: '1rem', borderRadius: '12px' }}
                            onClick={handleSetPrice}
                            disabled={pricingLoading}
                        >
                            {pricingLoading ? 'Saving...' : 'Confirm & Save Quote'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
