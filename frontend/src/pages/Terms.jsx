import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Scale, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

const Terms = () => {
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
                        <Scale size={14} />
                        <span>Legal Framework</span>
                    </div>
                    <h1 className="hero__title">Terms of <span className="text-gradient">Service</span></h1>
                    <p className="hero__subtitle">Please read these terms carefully before using our services.</p>
                </div>
            </section>

            <section className="section">
                <div className="section__inner" style={{ maxWidth: '800px' }}>
                    <div className="legal-content">
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing and using the services of **The Mavx**, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

                        <h2>2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials on The Mavx's website for personal, non-commercial transitory viewing only.</p>

                        <h2>3. Disclaimer</h2>
                        <p>The materials on The Mavx's website are provided on an 'as is' basis. The Mavx makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.</p>

                        <h2>4. Limitations</h2>
                        <p>In no event shall The Mavx or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on The Mavx's website.</p>

                        <h2>5. Governing Law</h2>
                        <p>Any claim relating to The Mavx's website shall be governed by the laws of the State of California without regard to its conflict of law provisions.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Terms;
