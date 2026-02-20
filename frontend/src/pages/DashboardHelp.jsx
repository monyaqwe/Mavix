import { useState } from 'react';
import {
    HelpCircle, ChevronDown, ChevronUp, Send, MessageSquare,
    FileText, ExternalLink, Mail, Phone
} from 'lucide-react';

const faqs = [
    {
        q: 'How do I create a new project?',
        a: 'Navigate to the Projects page from the sidebar and click the "New Project" button. Fill in the project name and description, then click "Create Project" to get started.',
    },
    {
        q: 'How long does it take to complete a project?',
        a: 'Project timelines vary depending on complexity. Starter projects typically take 1-2 weeks, Professional projects 3-6 weeks, and Enterprise projects are scoped individually.',
    },
    {
        q: 'Can I request changes after the project is completed?',
        a: 'Yes! Depending on your plan, you have a set number of revision rounds included. Additional revisions can be arranged separately.',
    },
    {
        q: 'How do I track my project progress?',
        a: 'Each project has a progress bar visible on both the Overview and Projects pages. You\'ll also receive notifications when milestones are reached.',
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, PayPal, bank transfers, and cryptocurrency. Payment plans are available for Enterprise-tier projects.',
    },
    {
        q: 'How can I upgrade my plan?',
        a: 'You can upgrade your plan from the sidebar by clicking "Upgrade Plan", or visit the Settings page to manage your subscription.',
    },
];

const DashboardHelp = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [contactForm, setContactForm] = useState({ subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const toggleFaq = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    const handleContact = (e) => {
        e.preventDefault();
        setSent(true);
        setContactForm({ subject: '', message: '' });
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <>
            <div className="dash__welcome">
                <div>
                    <h1 className="dash__welcome-title">Help & <span className="text-gradient">Support</span></h1>
                    <p className="dash__welcome-sub">Find answers to common questions or reach out to our team.</p>
                </div>
            </div>

            <div className="dash__grid">
                {/* FAQ */}
                <div className="dash__card dash-help__faq-card">
                    <div className="dash__card-header">
                        <h3><HelpCircle size={18} /> Frequently Asked Questions</h3>
                    </div>
                    <div className="dash-help__faq-list">
                        {faqs.map((faq, i) => (
                            <div key={i} className={`dash-help__faq ${openIndex === i ? 'dash-help__faq--open' : ''}`}>
                                <button className="dash-help__faq-q" onClick={() => toggleFaq(i)}>
                                    <span>{faq.q}</span>
                                    {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {openIndex === i && (
                                    <div className="dash-help__faq-a">
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Support */}
                <div className="dash__card">
                    <div className="dash__card-header">
                        <h3><MessageSquare size={18} /> Contact Support</h3>
                    </div>
                    {sent ? (
                        <div className="dash-help__sent">
                            <Send size={32} />
                            <h3>Message Sent!</h3>
                            <p>We'll get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleContact} className="dash-help__contact-form">
                            <div className="dash-settings__field">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    placeholder="What can we help with?"
                                    value={contactForm.subject}
                                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="dash-settings__field">
                                <label>Message</label>
                                <textarea
                                    placeholder="Describe your issue or question..."
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    rows={5}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary">
                                <Send size={16} />
                                <span>Send Message</span>
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Quick Links */}
            <div className="dash__card">
                <div className="dash__card-header">
                    <h3>Quick Links & Contact</h3>
                </div>
                <div className="dash-help__links">
                    <a href="#" className="dash-help__link-card">
                        <FileText size={22} />
                        <div>
                            <h4>Documentation</h4>
                            <p>Browse our detailed guides and tutorials</p>
                        </div>
                        <ExternalLink size={14} />
                    </a>
                    <a href="mailto:hello@themavx.com" className="dash-help__link-card">
                        <Mail size={22} />
                        <div>
                            <h4>Email Us</h4>
                            <p>hello@themavx.com</p>
                        </div>
                        <ExternalLink size={14} />
                    </a>
                    <a href="tel:+15551234567" className="dash-help__link-card">
                        <Phone size={22} />
                        <div>
                            <h4>Call Us</h4>
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </>
    );
};

export default DashboardHelp;
