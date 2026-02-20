import { useState, useEffect } from 'react';
import { User, Bell, Moon, Sun, Lock, Mail, Save, CheckCircle2 } from 'lucide-react';

const DashboardSettings = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') !== 'light';
    });
    const [notifications, setNotifications] = useState({
        email: true,
        projects: true,
        marketing: false,
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <form onSubmit={handleSave}>
            <div className="dash__welcome">
                <div>
                    <h1 className="dash__welcome-title"><span className="text-gradient">Settings</span></h1>
                    <p className="dash__welcome-sub">Manage your account preferences and security settings.</p>
                </div>
            </div>

            <div className="dash-settings__grid">
                {/* Profile */}
                <div className="dash__card">
                    <div className="dash__card-header">
                        <h3><User size={18} /> Profile Information</h3>
                    </div>
                    <div className="dash-settings__form">
                        <div className="dash-settings__field">
                            <label>Full Name</label>
                            <input type="text" defaultValue="John Doe" required />
                        </div>
                        <div className="dash-settings__field">
                            <label>Email</label>
                            <div className="dash-settings__input-with-badge">
                                <input type="email" defaultValue="john@example.com" readOnly />
                                <span className="dash-settings__verified-badge">
                                    <CheckCircle2 size={12} /> Verified
                                </span>
                            </div>
                        </div>
                        <div className="dash-settings__field">
                            <label>Company</label>
                            <input type="text" defaultValue="" placeholder="Your company name" />
                        </div>
                        <div className="dash-settings__field">
                            <label>Bio</label>
                            <textarea rows={3} placeholder="Tell us about yourself..." defaultValue=""></textarea>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="dash__card">
                    <div className="dash__card-header">
                        <h3><Bell size={18} /> Notifications</h3>
                    </div>
                    <div className="dash-settings__toggles">
                        <div className="dash-settings__toggle-item">
                            <div>
                                <span className="dash-settings__toggle-label"><Mail size={16} /> Email Notifications</span>
                                <p className="dash-settings__toggle-desc">Receive email updates about your projects</p>
                            </div>
                            <label className="dash-settings__switch">
                                <input
                                    type="checkbox"
                                    checked={notifications.email}
                                    onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                                />
                                <span className="dash-settings__switch-slider"></span>
                            </label>
                        </div>
                        <div className="dash-settings__toggle-item">
                            <div>
                                <span className="dash-settings__toggle-label">Project Updates</span>
                                <p className="dash-settings__toggle-desc">Get notified when your projects are updated</p>
                            </div>
                            <label className="dash-settings__switch">
                                <input
                                    type="checkbox"
                                    checked={notifications.projects}
                                    onChange={() => setNotifications({ ...notifications, projects: !notifications.projects })}
                                />
                                <span className="dash-settings__switch-slider"></span>
                            </label>
                        </div>
                        <div className="dash-settings__toggle-item">
                            <div>
                                <span className="dash-settings__toggle-label">Marketing Emails</span>
                                <p className="dash-settings__toggle-desc">Receive tips, updates, and offers</p>
                            </div>
                            <label className="dash-settings__switch">
                                <input
                                    type="checkbox"
                                    checked={notifications.marketing}
                                    onChange={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                                />
                                <span className="dash-settings__switch-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className="dash__card">
                    <div className="dash__card-header">
                        <h3>{darkMode ? <Moon size={18} /> : <Sun size={18} />} Appearance</h3>
                    </div>
                    <div className="dash-settings__theme">
                        <button
                            type="button"
                            className={`dash-settings__theme-btn ${darkMode ? 'dash-settings__theme-btn--active' : ''}`}
                            onClick={() => setDarkMode(true)}
                        >
                            <Moon size={20} />
                            <span>Dark Mode</span>
                        </button>
                        <button
                            type="button"
                            className={`dash-settings__theme-btn ${!darkMode ? 'dash-settings__theme-btn--active' : ''}`}
                            onClick={() => setDarkMode(false)}
                        >
                            <Sun size={20} />
                            <span>Light Mode</span>
                        </button>
                    </div>
                </div>

                {/* Security */}
                <div className="dash__card">
                    <div className="dash__card-header">
                        <h3><Lock size={18} /> Security</h3>
                    </div>
                    <div className="dash-settings__security">
                        <div className="dash-settings__field">
                            <label>Current Password</label>
                            <input type="password" placeholder="••••••••" />
                        </div>
                        <div className="dash-settings__field">
                            <label>New Password</label>
                            <input type="password" placeholder="••••••••" />
                        </div>
                        <div className="dash-settings__field">
                            <label>Confirm New Password</label>
                            <input type="password" placeholder="••••••••" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Save button */}
            <div className="dash-settings__save-row">
                <button type="submit" className="btn-primary dash-settings__save-btn" disabled={saved}>
                    {saved ? (
                        <><CheckCircle2 size={16} /> Saved Successfully!</>
                    ) : (
                        <><Save size={16} /> Save Changes</>
                    )}
                </button>
            </div>
        </form>
    );
};

export default DashboardSettings;
