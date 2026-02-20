import { Link } from 'react-router-dom';
import mavxLogo from '../assets/mavx-logo.svg';

const Footer = () => {
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
                            <li>Web Development</li>
                            <li>UI/UX Design</li>
                            <li>E-Commerce</li>
                            <li>SEO Optimization</li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Company</h4>
                        <ul className="footer__list">
                            <li>About Us</li>
                            <li>Portfolio</li>
                            <li>Careers</li>
                            <li>Blog</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Contact</h4>
                        <ul className="footer__list">
                            <li>hello@themavx.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>
                                <Link to="/register" className="footer__cta-link">Get Started →</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2026 The Mavx. All rights reserved.</p>
                    <div className="footer__bottom-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
