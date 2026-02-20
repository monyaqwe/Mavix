import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Lock, FileText, Globe } from 'lucide-react';
import { useEffect } from 'react';

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="landing">
            <Navbar />

            <section className="hero" style={{ minHeight: '40vh', padding: '120px 0 60px' }}>
                <div className="bg-orbs"><div className="orb orb-1"></div><div className="orb orb-2"></div></div>
                <div className="grid-overlay"></div>
                <div className="hero__content">
                    <div className="hero__badge">
                        <Lock size={14} />
                        <span>Security First</span>
                    </div>
                    <h1 className="hero__title">Privacy <span className="text-gradient">Policy</span></h1>
                    <p className="hero__subtitle">Your privacy is our top priority. Learn how we protect your data.</p>
                </div>
            </section>

            <section className="section">
                <div className="section__inner" style={{ maxWidth: '800px' }}>
                    <div className="legal-content">
                        <h2>1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, request a consultation, or communicate with us.</p>

                        <h2>2. How We Use Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your projects.</p>

                        <h2>3. Data Security</h2>
                        <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>

                        <h2>4. Cookies</h2>
                        <p>We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction.</p>

                        <h2>5. Third-Party Disclosure</h2>
                        <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Privacy;
