import { useState, useEffect } from 'react';
import {
    Plus, FolderOpen, Trash2, X, Clock, CheckCircle2, PauseCircle,
    ChevronRight, Loader2
} from 'lucide-react';
import { USER_ENDPOINTS } from '../api/config';

const STATUS_MAP = {
    ACTIVE: { label: 'Active', icon: Clock, className: 'dash-proj__badge--active' },
    COMPLETED: { label: 'Completed', icon: CheckCircle2, className: 'dash-proj__badge--completed' },
    ON_HOLD: { label: 'On Hold', icon: PauseCircle, className: 'dash-proj__badge--hold' },
};

const DashboardProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState({ name: '', description: '' });
    const [error, setError] = useState('');

    // Fetch projects
    const fetchProjects = async () => {
        try {
            const res = await fetch(USER_ENDPOINTS.PROJECTS);
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

    useEffect(() => { fetchProjects(); }, []);

    // Create project
    const handleCreate = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) { setError('Project name is required'); return; }
        setCreating(true);
        setError('');
        try {
            const res = await fetch(USER_ENDPOINTS.PROJECTS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setForm({ name: '', description: '' });
                setShowModal(false);
                fetchProjects();
            } else {
                setError('Failed to create project');
            }
        } catch {
            setError('Server connection error');
        } finally {
            setCreating(false);
        }
    };

    // Delete project
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await fetch(`${USER_ENDPOINTS.PROJECTS}/${id}`, { method: 'DELETE' });
            fetchProjects();
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    // Update Progress
    const handleUpdateProgress = async (id, current) => {
        const next = Math.min(100, current + 10);
        try {
            const res = await fetch(`${USER_ENDPOINTS.PROJECTS}/${id}/progress`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ progress: next }),
            });
            if (res.ok) fetchProjects();
        } catch (err) {
            console.error('Progress update failed', err);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <>
            {/* Header */}
            <div className="dash__welcome">
                <div>
                    <h1 className="dash__welcome-title">Your <span className="text-gradient">Projects</span></h1>
                    <p className="dash__welcome-sub">Manage and track all your active and completed projects.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="dash__new-project-btn">
                    <Plus size={18} />
                    <span>New Project</span>
                </button>
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div className="dash-proj__loading">
                    <Loader2 size={32} className="dash-proj__spinner" />
                    <p>Loading projects...</p>
                </div>
            ) : projects.length === 0 ? (
                <div className="dash-proj__empty">
                    <FolderOpen size={48} />
                    <h3>No projects yet</h3>
                    <p>Create your first project to get started.</p>
                    <button onClick={() => setShowModal(true)} className="dash__new-project-btn">
                        <Plus size={18} />
                        <span>Create Project</span>
                    </button>
                </div>
            ) : (
                <div className="dash-proj__grid">
                    {projects.map((proj) => {
                        const status = STATUS_MAP[proj.status] || STATUS_MAP.ACTIVE;
                        const StatusIcon = status.icon;
                        return (
                            <div key={proj.id} className="dash-proj__card">
                                <div className="dash-proj__card-accent" style={{ background: proj.color }}></div>
                                <div className="dash-proj__card-body">
                                    <div className="dash-proj__card-top">
                                        <span className={`dash-proj__badge ${status.className}`}>
                                            <StatusIcon size={12} />
                                            {status.label}
                                        </span>
                                        <button
                                            className="dash-proj__delete-btn"
                                            onClick={() => handleDelete(proj.id)}
                                            title="Delete project"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <h3 className="dash-proj__card-name">{proj.name}</h3>
                                    <p className="dash-proj__card-desc">{proj.description || 'No description'}</p>
                                    <div className="dash-proj__card-meta">
                                        <span className="dash-proj__card-date">
                                            <Clock size={13} />
                                            {formatDate(proj.createdAt)}
                                        </span>
                                    </div>
                                    <div className="dash-proj__progress-section" onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateProgress(proj.id, proj.progress);
                                    }} style={{ cursor: 'pointer' }} title="Click to increase progress">
                                        <div className="dash-proj__progress-header">
                                            <span>Progress</span>
                                            <span>{proj.progress}%</span>
                                        </div>
                                        <div className="dash__progress-bar">
                                            <div
                                                className="dash__progress-fill"
                                                style={{ width: `${proj.progress}%`, background: proj.color }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create Project Modal */}
            {showModal && (
                <div className="dash-proj__modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="dash-proj__modal" onClick={(e) => e.stopPropagation()}>
                        <div className="dash-proj__modal-header">
                            <h2>Create New Project</h2>
                            <button onClick={() => setShowModal(false)} className="dash-proj__modal-close">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="dash-proj__modal-form">
                            <div className="dash-proj__field">
                                <label>Project Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Website Redesign"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    autoFocus
                                />
                            </div>
                            <div className="dash-proj__field">
                                <label>Description</label>
                                <textarea
                                    placeholder="Brief description of the project..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            {error && <p className="dash-proj__error">{error}</p>}
                            <div className="dash-proj__modal-actions">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary" disabled={creating}>
                                    {creating ? (
                                        <><Loader2 size={16} className="dash-proj__spinner" /> Creating...</>
                                    ) : (
                                        <><Plus size={16} /> Create Project</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardProjects;
