import { Link, useLocation } from 'react-router-dom';
import mavxLogo from '../assets/mavx-logo.svg';
import { useContact } from '../context/ContactContext';

const Footer = () => {
    const { openContactModal } = useContact();
    const location = useLocation();
    const isHome = location.pathname === '/';

    const scrollToSection = (id) => {
        if (!isHome) return;
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__brand-col">
                        <div className="footer__brand">
                            <img src={mavxLogo} alt="The Mavx" className="footer__logo" />
                            <span className="footer__name">The Mavx</span>
                        </div>
                        <p className="footer__desc">
                            We craft stunning, high-performance websites that elevate your brand and drive results.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Services</h4>
                        <ul className="footer__list">
                            <li><Link to="/services/web-development" className="footer__link">Web Development</Link></li>
                            <li><Link to="/services/ui-ux-design" className="footer__link">UI/UX Design</Link></li>
                            <li><Link to="/services/e-commerce" className="footer__link">E-Commerce</Link></li>
                            <li><Link to="/services/seo-optimization" className="footer__link">SEO Optimization</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Company</h4>
                        <ul className="footer__list">
                            <li><Link to="/#about" className="footer__link">About Us</Link></li>
                            <li><Link to="/#portfolio" className="footer__link">Portfolio</Link></li>
                            <li><Link to="/#process" className="footer__link">How It Works</Link></li>
                            <li><Link to="/#pricing" className="footer__link">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Contact</h4>
                        <ul className="footer__list">
                            <li style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>hello@themavx.com</li>
                            <li style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>+1 (555) MAVX-777</li>
                            <li style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Silicon Valley, CA</li>
                            <li>
                                <button onClick={openContactModal} className="footer__cta-link">Get Started →</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2026 The Mavx. All rights reserved.</p>
                    <div className="footer__bottom-links">
                        <Link to="/privacy" className="footer__bottom-link">Privacy</Link>
                        <Link to="/terms" className="footer__bottom-link">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
