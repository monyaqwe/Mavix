import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FolderOpen, CreditCard, BarChart3,
    HelpCircle, ChevronRight, Clock, CheckCircle2, AlertCircle, ArrowUpRight,
    Plus, Shield, Eye, Loader2
} from 'lucide-react';

const API_BASE = 'http://localhost:8080/api/projects';

const DashboardOverview = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(API_BASE);
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (err) {
                console.error('Failed to load projects', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const activeProjects = projects.filter(p => p.status === 'ACTIVE');
    const completedProjects = projects.filter(p => p.status === 'COMPLETED');

    return (
        <>
            {/* Welcome */}
            <div className="dash__welcome">
                <div>
                    <h1 className="dash__welcome-title">Welcome back, <span className="text-gradient">John!</span></h1>
                    <p className="dash__welcome-sub">Here's an overview of your projects and account activity.</p>
                </div>
                <Link to="/dashboard/projects" className="dash__new-project-btn">
                    <Plus size={18} />
                    <span>New Project</span>
                </Link>
            </div>

            {/* Stats row */}
            <div className="dash__stats-row">
                <div className="dash__stat">
                    <div className="dash__stat-icon dash__stat-icon--blue"><FolderOpen size={20} /></div>
                    <div>
                        <span className="dash__stat-value">{activeProjects.length}</span>
                        <span className="dash__stat-label">Active Projects</span>
                    </div>
                </div>
                <div className="dash__stat">
                    <div className="dash__stat-icon dash__stat-icon--green"><CheckCircle2 size={20} /></div>
                    <div>
                        <span className="dash__stat-value">{completedProjects.length}</span>
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
                        <h3>{loading ? 'Loading Projects...' : 'Recent Projects'}</h3>
                        <Link to="/dashboard/projects" className="dash__card-link">View All <ChevronRight size={14} /></Link>
                    </div>
                    <div className="dash__project-list">
                        {loading ? (
                            <div className="dash-proj__loading" style={{ padding: '1rem' }}>
                                <Loader2 size={24} className="dash-proj__spinner" />
                            </div>
                        ) : projects.length === 0 ? (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                                No projects found.
                            </p>
                        ) : (
                            projects.slice(0, 3).map(proj => (
                                <div key={proj.id} className="dash__project">
                                    <div className="dash__project-color" style={{ background: proj.color }}></div>
                                    <div className="dash__project-info">
                                        <span className="dash__project-name">{proj.name}</span>
                                        <span className="dash__project-meta">{proj.status} · {proj.progress}% complete</span>
                                    </div>
                                    <div className="dash__project-progress">
                                        <div className="dash__progress-bar">
                                            <div
                                                className="dash__progress-fill"
                                                style={{ width: `${proj.progress}%`, background: proj.color }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
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
                        <Link to="/dashboard/projects" className="dash__quick-action">
                            <FolderOpen size={20} />
                            <span>Request New Project</span>
                            <ArrowUpRight size={14} className="dash__qa-arrow" />
                        </Link>
                        <Link to="/dashboard/analytics" className="dash__quick-action">
                            <BarChart3 size={20} />
                            <span>View Analytics</span>
                            <ArrowUpRight size={14} className="dash__qa-arrow" />
                        </Link>
                        <Link to="/dashboard/help" className="dash__quick-action">
                            <HelpCircle size={20} />
                            <span>Contact Support</span>
                            <ArrowUpRight size={14} className="dash__qa-arrow" />
                        </Link>
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
                            <button className="dash__enable-btn" onClick={() => alert('2FA Setup initiated. Check your email.')}>
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
        </>
    );
};

export default DashboardOverview;
