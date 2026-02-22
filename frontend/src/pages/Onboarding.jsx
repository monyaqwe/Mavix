import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft, Check, Send, Sparkles } from 'lucide-react';


const Onboarding = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, username } = location.state || { email: '', username: 'Guest' };

    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        style: '',
        pages: '',
        budget: '',
        details: '',
        email: email || ''
    });

    const totalSteps = 4; // Removed email step

    useEffect(() => {
        if (!email) {
            // If no email in state (accessed directly), redirect back or handle
            // For now, let's just proceed or redirect to register
            // navigate('/register');
        }
    }, [email, navigate]);

    const handleOptionSelect = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (step < totalSteps) {
            setTimeout(() => setStep(step + 1), 300);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Onboarding Submitted:', formData);
        setIsSubmitted(true);
        // After transition, we could navigate to dashboard
        setTimeout(() => {
            navigate('/dashboard');
        }, 3000);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                const styles = [
                    { name: 'Modern', img: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=400&q=80' },
                    { name: 'Minimalist', img: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=400&q=80' },
                    { name: 'Corporate', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80' },
                    { name: 'Creative', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80' }
                ];
                return (
                    <div className="contact-step animate-fade-in">
                        <h2 className="step-title">Welcome, <span className="text-gradient">{username || 'Friend'}!</span> What's your preferred <span className="text-gradient">style?</span></h2>
                        <div className="options-grid visual">
                            {styles.map(option => (
                                <button
                                    key={option.name}
                                    className={`option-card visual-card ${formData.style === option.name ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect('style', option.name)}
                                >
                                    <div className="card-image">
                                        <img src={option.img} alt={option.name} />
                                    </div>
                                    <span className="card-label">{option.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                const pages = [
                    { name: '1-3 Pages', img: 'https://images.unsplash.com/photo-1517433447755-d1c375c035b8?auto=format&fit=crop&w=400&q=80' },
                    { name: '4-10 Pages', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80' },
                    { name: '10+ Pages', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80' },
                    { name: 'Custom App', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80' }
                ];
                return (
                    <div className="contact-step animate-fade-in">
                        <h2 className="step-title">How many <span className="text-gradient">pages</span> do you need?</h2>
                        <div className="options-grid visual">
                            {pages.map(option => (
                                <button
                                    key={option.name}
                                    className={`option-card visual-card ${formData.pages === option.name ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect('pages', option.name)}
                                >
                                    <div className="card-image">
                                        <img src={option.img} alt={option.name} />
                                    </div>
                                    <span className="card-label">{option.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                const budgets = [
                    { name: '$500 - $1,000', img: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=400&q=80' },
                    { name: '$1,000 - $5,000', img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80' },
                    { name: '$5,000 - $10,000', img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80' },
                    { name: '$10,000+', img: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=400&q=80' }
                ];
                return (
                    <div className="contact-step animate-fade-in">
                        <h2 className="step-title">What is your <span className="text-gradient">budget</span> range?</h2>
                        <div className="options-grid visual">
                            {budgets.map(option => (
                                <button
                                    key={option.name}
                                    className={`option-card visual-card ${formData.budget === option.name ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect('budget', option.name)}
                                >
                                    <div className="card-image">
                                        <img src={option.img} alt={option.name} />
                                    </div>
                                    <span className="card-label">{option.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="contact-step animate-fade-in">
                        <h2 className="step-title">Tell us more about <span className="text-gradient">your project</span></h2>
                        <textarea
                            name="details"
                            className="contact-textarea"
                            placeholder="Describe your vision, features you need, or any other details..."
                            value={formData.details}
                            onChange={handleInputChange}
                        />
                        <button className="btn-primary step-btn" onClick={handleSubmit} disabled={!formData.details}>
                            <span>Complete Onboarding</span>
                            <Send size={18} />
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="onboarding-page auth-page">
            <div className="onboarding-container">
                <div className="onboarding-header">
                    <div className="logo-sparkle">
                        <Sparkles className="icon-gradient" size={32} />
                    </div>
                    <h1>Personalize Your Experience</h1>
                    <p>Help us tailor our services to your needs.</p>
                </div>

                {!isSubmitted ? (
                    <div className="onboarding-card animate-slide-up">
                        <div className="step-progress">
                            <div className="progress-bar" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                        </div>

                        <div className="contact-modal__body">
                            {renderStep()}
                        </div>

                        <div className="contact-modal__footer">
                            {step > 1 && (
                                <button className="btn-back" onClick={prevStep}>
                                    <ChevronLeft size={18} />
                                    <span>Back</span>
                                </button>
                            )}
                            <div className="step-count">Step {step} of {totalSteps}</div>
                        </div>
                    </div>
                ) : (
                    <div className="contact-success animate-fade-in onboarding-success">
                        <div className="success-icon">
                            <Check size={48} />
                        </div>
                        <h2 className="success-title">All set, <span className="text-gradient">{username}!</span></h2>
                        <p className="success-text">
                            Thank you for sharing your project details. We're redirecting you to your dashboard...
                        </p>
                        <div className="loader-container">
                            <span className="loader"></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;
