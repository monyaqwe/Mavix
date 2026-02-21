import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import mavxLogo from '../assets/mavx-logo.svg';
import { useContact } from '../context/ContactContext';

const Navbar = () => {
    const { openContactModal } = useContact();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { setMobileOpen(false); }, [location]);

    const isHome = location.pathname === '/';

    const scrollToSection = (id) => {
        if (!isHome) return;
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner">
                <Link to="/" className="navbar__brand">
                    <img src={mavxLogo} alt="The Mavx" className="navbar__logo" />
                    <span className="navbar__name">The Mavx</span>
                </Link>

                {isHome && (
                    <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
                        <button onClick={() => scrollToSection('services')} className="navbar__link">Services</button>
                        <button onClick={() => scrollToSection('portfolio')} className="navbar__link">Portfolio</button>
                        <button onClick={() => scrollToSection('about')} className="navbar__link">About</button>
                        <button onClick={() => scrollToSection('process')} className="navbar__link">How It Works</button>
                        <button onClick={() => scrollToSection('pricing')} className="navbar__link">Pricing</button>
                    </div>
                )}

                <div className="navbar__actions">
                    <Link to="/login" className="navbar__signin">Sign In</Link>
                    <Link to="/register" className="navbar__cta">Get Started</Link>
                    {isHome && (
                        <button className="navbar__burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
