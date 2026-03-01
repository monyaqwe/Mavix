import { useState, useEffect } from 'react';
import { X, Send, Loader2, CheckCircle, ChevronRight, ChevronLeft, Monitor, ShoppingBag, Layout, Code } from 'lucide-react';
import { USER_ENDPOINTS } from '../../services/config';

const PROJECT_TYPES = [
    { id: 'landing', title: 'Landing Page', icon: Layout },
    { id: 'ecommerce', title: 'E-commerce', icon: ShoppingBag },
    { id: 'webapp', title: 'Web App', icon: Monitor },
    { id: 'custom', title: 'Custom Solution', icon: Code },
];

const ContactModal = ({ isOpen, onClose, initialProjectType }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        projectType: initialProjectType || '',
        budget: 'Under $1,000',
        timeline: 'Flexible',
        numberOfPages: '1-5 pages',
        designInspiration: '',
        targetAudience: '',
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setStep(initialProjectType ? 2 : 1);
            setSubmitted(false);
            setError(null);
            setValidationError(null);
            setFormData(prev => {
                let sessionName = '';
                let sessionEmail = '';
                try {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        const user = JSON.parse(storedUser);
                        sessionName = user.username || '';
                        sessionEmail = user.email || '';
                    } else {
                        sessionName = localStorage.getItem('username') || '';
                        sessionEmail = localStorage.getItem('userEmail') || '';
                    }
                } catch (e) { }

                return {
                    ...prev,
                    projectType: initialProjectType || '',
                    name: sessionName,
                    email: sessionEmail,
                };
            });
        }
    }, [isOpen, initialProjectType]);

    if (!isOpen) return null;

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError(null);
        setError(null);

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setValidationError("Please fill in all required fields to submit your request.");
            return;
        }

        setLoading(true);

        // Subject format: [Type] Budget: [Budget], Timeline: [Timeline]
        const subject = `[${formData.projectType || 'General'}] Budget: ${formData.budget}, Timeline: ${formData.timeline}`;

        const enhancedMessage = `
Target Audience: ${formData.targetAudience || 'Not specified'}
Number of Pages: ${formData.numberOfPages}
Design Inspiration: ${formData.designInspiration || 'None provided'}

Project Details:
${formData.message}
        `;

        try {
            const response = await fetch(USER_ENDPOINTS.CONTACT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: subject,
                    message: enhancedMessage
                })
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    onClose();
                }, 3000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="auth-modal" style={{ maxWidth: '600px' }}>
                <button className="auth-modal__close" onClick={onClose} disabled={loading}>
                    <X size={20} />
                </button>

                <div className="auth-modal__body">
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <CheckCircle size={48} color="#10b981" style={{ marginBottom: '1rem', margin: '0 auto' }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Sent!</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Thank you for sharing your project details. We will review them and get back to you shortly.</p>
                        </div>
                    ) : (
                        <>
                            <div className="wizard-steps">
                                {[1, 2, 3].map(s => (
                                    <div key={s} className={`wizard-step-dot ${step >= s ? 'active' : ''}`}></div>
                                ))}
                            </div>

                            {step === 1 && (
                                <div className="wizard-step">
                                    <h2 className="wizard-title">What are you looking to build?</h2>
                                    <p className="wizard-subtitle">Select the type of project that best describes your needs.</p>

                                    <div className="wizard-grid">
                                        {PROJECT_TYPES.map(type => (
                                            <div
                                                key={type.id}
                                                className={`wizard-card ${formData.projectType === type.title ? 'selected' : ''}`}
                                                onClick={() => setFormData({ ...formData, projectType: type.title })}
                                            >
                                                <type.icon size={32} />
                                                <span className="wizard-card-title">{type.title}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="wizard-actions" style={{ justifyContent: 'flex-end' }}>
                                        <button
                                            className="btn-primary"
                                            onClick={handleNext}
                                            disabled={!formData.projectType}
                                        >
                                            Next Step <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="wizard-step">
                                    <h2 className="wizard-title">Budget & Timeline</h2>
                                    <p className="wizard-subtitle">Help us understand your constraints.</p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        <div className="form-group">
                                            <label>Project Scope (Pages)</label>
                                            <select
                                                className="form-input"
                                                value={formData.numberOfPages}
                                                onChange={e => setFormData({ ...formData, numberOfPages: e.target.value })}
                                            >
                                                <option>Single Landing Page</option>
                                                <option>1-5 pages (Small site)</option>
                                                <option>5-15 pages (Medium site)</option>
                                                <option>15+ pages (Large platform)</option>
                                            </select>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div className="form-group">
                                                <label>Estimated Budget</label>
                                                <select
                                                    className="form-input"
                                                    value={formData.budget}
                                                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                                >
                                                    <option>Under $1,000</option>
                                                    <option>$1,000 - $5,000</option>
                                                    <option>$5,000 - $10,000</option>
                                                    <option>$10,000+</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label>Desired Timeline</label>
                                                <select
                                                    className="form-input"
                                                    value={formData.timeline}
                                                    onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                                                >
                                                    <option>As soon as possible (Urgent)</option>
                                                    <option>1-3 months</option>
                                                    <option>3-6 months</option>
                                                    <option>Flexible (No strict deadline)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="wizard-actions">
                                        <button className="btn-secondary" onClick={handlePrev} style={{ padding: '0.65rem 1rem' }}>
                                            <ChevronLeft size={18} /> Back
                                        </button>
                                        <button className="btn-primary" onClick={handleNext}>
                                            Next Step <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="wizard-step">
                                    <h2 className="wizard-title">Tell us more</h2>
                                    <p className="wizard-subtitle">Provide any specific details or requirements.</p>

                                    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div className="form-group">
                                                <label>Your Name</label>
                                                <input
                                                    type="text"
                                                    className={`form-input ${(validationError && !formData.name.trim()) ? 'error' : ''}`}
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input
                                                    type="email"
                                                    className={`form-input ${(validationError && !formData.email.trim()) ? 'error' : ''}`}
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div className="form-group">
                                                <label>Target Audience</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="Who is this website for?"
                                                    value={formData.targetAudience}
                                                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Design Inspiration (URLs)</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="e.g., apple.com, stripe.com"
                                                    value={formData.designInspiration}
                                                    onChange={(e) => setFormData({ ...formData, designInspiration: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Project Details <span style={{ color: 'var(--error-text)' }}>*</span></label>
                                            <textarea
                                                className={`form-input ${(validationError && !formData.message.trim()) ? 'error' : ''}`}
                                                rows="4"
                                                placeholder="Describe the main features, target audience, and any inspiration..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            ></textarea>
                                        </div>

                                        {validationError && (
                                            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                                <X size={18} /> {validationError}
                                            </div>
                                        )}
                                        {error && (
                                            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                                <X size={18} /> {error}
                                            </div>
                                        )}

                                        <div className="wizard-actions">
                                            <button type="button" className="btn-secondary" onClick={handlePrev} disabled={loading} style={{ padding: '0.65rem 1rem' }}>
                                                <ChevronLeft size={18} /> Back
                                            </button>
                                            <button type="submit" className="btn-primary" disabled={loading}>
                                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                                <span style={{ marginLeft: '0.5rem' }}>Submit Request</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
