import {
    BarChart3, TrendingUp, Users, Eye, FolderOpen,
    ArrowUp, ArrowDown
} from 'lucide-react';

const DashboardAnalytics = () => {
    const stats = [
        { label: 'Total Visitors', value: '12,847', change: '+18.2%', up: true, icon: Eye, color: '#4f8bff' },
        { label: 'Active Projects', value: '8', change: '+2', up: true, icon: FolderOpen, color: '#a855f7' },
        { label: 'Conversion Rate', value: '3.2%', change: '+0.8%', up: true, icon: TrendingUp, color: '#10b981' },
        { label: 'Total Clients', value: '24', change: '+5', up: true, icon: Users, color: '#f59e0b' },
    ];

    const monthlyData = [
        { month: 'Sep', visitors: 65, projects: 2 },
        { month: 'Oct', visitors: 78, projects: 3 },
        { month: 'Nov', visitors: 55, projects: 2 },
        { month: 'Dec', visitors: 90, projects: 4 },
        { month: 'Jan', visitors: 82, projects: 3 },
        { month: 'Feb', visitors: 100, projects: 5 },
    ];

    const projectBreakdown = [
        { label: 'Web Development', value: 45, color: '#4f8bff' },
        { label: 'UI/UX Design', value: 25, color: '#a855f7' },
        { label: 'E-Commerce', value: 18, color: '#10b981' },
        { label: 'SEO', value: 12, color: '#f59e0b' },
    ];

    const topPages = [
        { page: '/home', views: '4,231', pct: 33 },
        { page: '/services', views: '2,847', pct: 22 },
        { page: '/portfolio', views: '1,953', pct: 15 },
        { page: '/pricing', views: '1,628', pct: 13 },
        { page: '/contact', views: '1,102', pct: 9 },
    ];

    return (
        <>
            <div className="dash__welcome">
                <div>
                    <h1 className="dash__welcome-title">
                        <span className="text-gradient">Analytics</span> Dashboard
                    </h1>
                    <p className="dash__welcome-sub">Monitor your website performance and project metrics.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="dash__stats-row">
                {stats.map((s, i) => (
                    <div key={i} className="dash__stat">
                        <div className="dash__stat-icon" style={{ background: `${s.color}20`, color: s.color }}>
                            <s.icon size={20} />
                        </div>
                        <div>
                            <span className="dash__stat-value">{s.value}</span>
                            <span className="dash__stat-label">{s.label}</span>
                        </div>
                        <span className={`dash-analytics__change ${s.up ? 'dash-analytics__change--up' : 'dash-analytics__change--down'}`}>
                            {s.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                            {s.change}
                        </span>
                    </div>
                ))}
            </div>

            <div className="dash__grid">
                {/* Bar Chart */}
                <div className="dash__card">
                    <div className="dash__card-header">
                        <h3>Monthly Visitors</h3>
                        <span className="dash-analytics__period">Last 6 months</span>
                    </div>
                    <div className="dash-analytics__chart">
                        {monthlyData.map((d, i) => (
                            <div
                                key={i}
                                className="dash-analytics__bar-group"
                                onClick={() => alert(`${d.month}: ${d.visitors}% visitors, ${d.projects} new projects`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="dash-analytics__bar-container">
                                    <div
                                        className="dash-analytics__bar"
                                        style={{ height: `${d.visitors}%` }}
                                        title={`${d.visitors}% of max`}
                                    ></div>
                                </div>
                                <span className="dash-analytics__bar-label">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Breakdown */}
                <div className="dash__card">
                    <div className="dash__card-header">
                        <h3>Project Breakdown</h3>
                    </div>
                    <div className="dash-analytics__breakdown">
                        {projectBreakdown.map((p, i) => (
                            <div key={i} className="dash-analytics__breakdown-item">
                                <div className="dash-analytics__breakdown-header">
                                    <div className="dash-analytics__breakdown-dot" style={{ background: p.color }}></div>
                                    <span>{p.label}</span>
                                    <span className="dash-analytics__breakdown-pct">{p.value}%</span>
                                </div>
                                <div className="dash__progress-bar">
                                    <div className="dash__progress-fill" style={{ width: `${p.value}%`, background: p.color }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Pages */}
            <div className="dash__card">
                <div className="dash__card-header">
                    <h3>Top Pages</h3>
                </div>
                <div className="dash-analytics__table">
                    <div className="dash-analytics__table-head">
                        <span>Page</span>
                        <span>Views</span>
                        <span>% of Total</span>
                    </div>
                    {topPages.map((p, i) => (
                        <div key={i} className="dash-analytics__table-row">
                            <span className="dash-analytics__page-name">{p.page}</span>
                            <span>{p.views}</span>
                            <div className="dash-analytics__bar-mini-wrap">
                                <div className="dash-analytics__bar-mini" style={{ width: `${p.pct}%` }}></div>
                                <span>{p.pct}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DashboardAnalytics;
