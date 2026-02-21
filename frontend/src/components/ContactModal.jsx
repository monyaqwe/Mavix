import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Send } from 'lucide-react';
import { useContact } from '../context/ContactContext';
import './ContactModal.css';

const ContactModal = () => {
    const { isContactModalOpen, closeContactModal } = useContact();
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        style: '',
        pages: '',
        budget: '',
        details: '',
        email: ''
    });

    const totalSteps = 5;

    useEffect(() => {
        if (isContactModalOpen) {
            document.body.style.overflow = 'hidden';
            setStep(1);
            setIsSubmitted(false);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isContactModalOpen]);

    if (!isContactModalOpen) return null;

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
        console.log('Form Submitted:', formData);
        setIsSubmitted(true);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="contact-step animate-fade-in">
                        <h2 className="step-title">What's your preferred <span className="text-gradient">style?</span></h2>
                        <div className="options-grid">
                            {['Modern', 'Minimalist', 'Corporate', 'Creative'].map(option => (
                                <button
                                    key={option}
                                    className={`option-card ${formData.style === option ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect('style', option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="contact-step animate-fade-in">
                        <h2 className="step-title">How many <span className="text-gradient">pages</span> do you need?</h2>
                        <div className="options-grid">
                            {['1-3 Pages', '4-10 Pages', '10+ Pages', 'Custom App'].map(option => (
                                <button
                                    key={option}
                                    className={`option-card ${formData.pages === option ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect('pages', option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="contact-step animate-fade-in">
                        <h2 className="step-title">What is your <span className="text-gradient">budget</span> range?</h2>
                        <div className="options-grid">
                            {['$500 - $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000+'].map(option => (
                                <button
                                    key={option}
                                    className={`option-card ${formData.budget === option ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect('budget', option)}
                                >
                                    {option}
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
                        <button className="btn-primary step-btn" onClick={nextStep} disabled={!formData.details}>
                            <span>Continue</span>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                );
            case 5:
                return (
                    <div className="contact-step animate-fade-in">
                        <h2 className="step-title">How can we <span className="text-gradient">reach you?</span></h2>
                        <input
                            type="email"
                            name="email"
                            className="contact-input"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <button className="btn-primary step-btn" onClick={handleSubmit} disabled={!formData.email.includes('@')}>
                            <span>Send Message</span>
                            <Send size={18} />
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="contact-modal-backdrop" onClick={(e) => e.target === e.currentTarget && closeContactModal()}>
            <div className="contact-modal animate-slide-up">
                <button className="contact-modal__close" onClick={closeContactModal}>
                    <X size={24} />
                </button>

                {!isSubmitted ? (
                    <>
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
                    </>
                ) : (
                    <div className="contact-success animate-fade-in">
                        <div className="success-icon">
                            <Check size={48} />
                        </div>
                        <h2 className="success-title">Message <span className="text-gradient">Sent!</span></h2>
                        <p className="success-text">
                            Thank you for your interest. We've received your project details and will get back to you at <strong>{formData.email}</strong> shortly.
                        </p>
                        <button className="btn-primary success-btn" onClick={closeContactModal}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactModal;
