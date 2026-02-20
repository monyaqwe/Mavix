import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Code, Palette, ShoppingCart, Search, Smartphone, Wrench, Check, Sparkles, MessageSquare, Rocket, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    const observerRefs = useRef([]);
    const location = useLocation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section--visible');
                    }
                });
            },
            { threshold: 0.12 }
        );

        observerRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const addRef = (el) => {
        if (el && !observerRefs.current.includes(el)) {
            observerRefs.current.push(el);
        }
    };

    // Scroll to hash on mount or when location changes
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Small delay to ensure refs are ready
        }
    }, [location]);

    return (
        <div className="landing">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="hero">
                <div className="bg-orbs">
                    <div className="orb orb-1"></div>
                    <div className="orb orb-2"></div>
                    <div className="orb orb-3"></div>
                    <div className="orb orb-4"></div>
                </div>
                <div className="grid-overlay"></div>

                <div className="hero__content">
                    <div className="hero__badge">
                        <Sparkles size={14} />
                        <span>Premium Web Design Agency</span>
                    </div>
                    <h1 className="hero__title">
                        We build websites that <span className="text-gradient">drive results.</span>
                    </h1>
                    <p className="hero__subtitle">
                        From stunning landing pages to complex web applications — The Mavx delivers pixel-perfect, high-performance websites tailored to your business needs.
                    </p>
                    <div className="hero__actions">
                        <Link to="/register" className="btn-primary hero__cta">
                            <span>Start Your Project</span>
                            <ArrowRight size={20} />
                        </Link>
                        <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary hero__cta-secondary">
                            Explore Services
                        </button>
                    </div>
                    <div className="hero__trust">
                        <div className="hero__trust-avatars">
                            <div className="trust-avatar" style={{ background: 'linear-gradient(135deg, #4f8bff, #7c5cfc)' }}>M</div>
                            <div className="trust-avatar" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>A</div>
                            <div className="trust-avatar" style={{ background: 'linear-gradient(135deg, #06b6d4, #4f8bff)' }}>V</div>
                            <div className="trust-avatar" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>X</div>
                        </div>
                        <p className="hero__trust-text">Trusted by <strong>50+</strong> businesses worldwide</p>
                    </div>
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section id="services" className="section section--animate" ref={addRef}>
                <div className="section__inner">
                    <div className="section__header">
                        <span className="section__badge">What We Do</span>
                        <h2 className="section__title">Services built for <span className="text-gradient">your success</span></h2>
                        <p className="section__subtitle">End-to-end web solutions that transform your online presence and accelerate growth.</p>
                    </div>

                    <div className="services-grid">
                        <Link to="/services/web-development" className="service-card">
                            <div className="service-card__icon"><Code size={24} /></div>
                            <h3>Web Development</h3>
                            <p>Custom websites built with modern technologies — React, Next.js, and more. Fast, scalable, and SEO-optimized.</p>
                            <span className="service-card__link">Learn more <ArrowRight size={14} /></span>
                        </Link>
                        <Link to="/services/ui-ux-design" className="service-card">
                            <div className="service-card__icon"><Palette size={24} /></div>
                            <h3>Custom Design</h3>
                            <p>Beautiful, intuitive interfaces that delight users and boost engagement. Every pixel crafted with purpose.</p>
                            <span className="service-card__link">Learn more <ArrowRight size={14} /></span>
                        </Link>
                        <Link to="/services/e-commerce" className="service-card">
                            <div className="service-card__icon"><ShoppingCart size={24} /></div>
                            <h3>E-Commerce</h3>
                            <p>Powerful online stores with seamless checkout, inventory management, and payment integrations.</p>
                            <span className="service-card__link">Learn more <ArrowRight size={14} /></span>
                        </Link>
                        <Link to="/services/seo-optimization" className="service-card">
                            <div className="service-card__icon"><Search size={24} /></div>
                            <h3>SEO Optimization</h3>
                            <p>Data-driven strategies that put your website at the top of search results and drive organic traffic.</p>
                            <span className="service-card__link">Learn more <ArrowRight size={14} /></span>
                        </Link>
                        <Link to="/services/mobile-first-design" className="service-card">
                            <div className="service-card__icon"><Smartphone size={24} /></div>
                            <h3>Mobile-First Design</h3>
                            <p>Responsive experiences that look stunning on every device — phones, tablets, and desktops alike.</p>
                            <span className="service-card__link">Learn more <ArrowRight size={14} /></span>
                        </Link>
                        <Link to="/services/maintenance-support" className="service-card">
                            <div className="service-card__icon"><Wrench size={24} /></div>
                            <h3>Maintenance & Support</h3>
                            <p>Ongoing updates, security patches, and performance monitoring to keep your site running flawlessly.</p>
                            <span className="service-card__link">Learn more <ArrowRight size={14} /></span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== PORTFOLIO / OUR PROJECTS ===== */}
            <section id="portfolio" className="section section--animate section--dark" ref={addRef}>
                <div className="section__inner">
                    <div className="section__header">
                        <span className="section__badge">Portfolio</span>
                        <h2 className="section__title">Our Recent <span className="text-gradient">Masterpieces</span></h2>
                        <p className="section__subtitle">A selection of high-impact websites we've built for industry leaders.</p>
                    </div>

                    <div className="services-grid">
                        {[
                            { title: 'Fintech Pro', category: 'Web App', desc: 'Secure financial dashboard with real-time analytics.' },
                            { title: 'HealthTrack', category: 'Mobile App', desc: 'Patient management system for modern clinics.' },
                            { title: 'EduLearn', category: 'E-Learning', desc: 'Interactive platform for global education.' },
                        ].map((project, i) => (
                            <div key={i} className="service-card">
                                <div className="service-card__icon"><Rocket size={24} /></div>
                                <h3>{project.title}</h3>
                                <p style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>{project.category}</p>
                                <p>{project.desc}</p>
                                <Link to="/register" className="service-card__link" style={{ marginTop: '1rem', display: 'inline-block' }}>View Details <ArrowRight size={14} /></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ABOUT US ===== */}
            <section id="about" className="section section--animate" ref={addRef}>
                <div className="section__inner">
                    <div className="section__header">
                        <span className="section__badge">About Us</span>
                        <h2 className="section__title">Driven by <span className="text-gradient">Innovation</span></h2>
                        <p className="section__subtitle">We are a team of passionate developers and designers dedicated to building the future of the web.</p>
                    </div>

                    <div className="cta-block" style={{ background: 'rgba(12, 18, 37, 0.5)', textAlign: 'left', padding: '3rem' }}>
                        <div className="grid-overlay"></div>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Our Mission</h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                At **The Mavx**, our mission is to empower businesses with cutting-edge digital solutions. We believe that a great website is more than just code; it's an experience that connects brands with people.
                            </p>
                            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', textAlign: 'left', gap: '1rem' }}>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>Expertise</h4>
                                    <p style={{ fontSize: '0.85rem' }}>5+ years of delivering high-end React & Node application.</p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>Quality</h4>
                                    <p style={{ fontSize: '0.85rem' }}>Strict adherence to industry standards and best practices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section id="process" className="section section--animate" ref={addRef}>
                <div className="section__inner">
                    <div className="section__header">
                        <span className="section__badge">How It Works</span>
                        <h2 className="section__title">From idea to launch in <span className="text-gradient">4 simple steps</span></h2>
                        <p className="section__subtitle">Our streamlined process ensures your website is delivered on time, on budget, and beyond expectations.</p>
                    </div>

                    <div className="process-grid">
                        <div className="process-card">
                            <div className="process-card__number">01</div>
                            <div className="process-card__icon"><MessageSquare size={28} /></div>
                            <h3>Consultation</h3>
                            <p>We discuss your vision, goals, and requirements in detail to create a tailored project roadmap.</p>
                        </div>
                        <div className="process-card">
                            <div className="process-card__number">02</div>
                            <div className="process-card__icon"><Palette size={28} /></div>
                            <h3>Design</h3>
                            <p>Our designers craft stunning mockups and prototypes that bring your brand to life with pixel-perfect precision.</p>
                        </div>
                        <div className="process-card">
                            <div className="process-card__number">03</div>
                            <div className="process-card__icon"><Code size={28} /></div>
                            <h3>Development</h3>
                            <p>We build your website using cutting-edge technologies, ensuring performance, security, and scalability.</p>
                        </div>
                        <div className="process-card">
                            <div className="process-card__number">04</div>
                            <div className="process-card__icon"><Rocket size={28} /></div>
                            <h3>Launch</h3>
                            <p>Your site goes live with full optimization, analytics setup, and ongoing support to guarantee success.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PRICING ===== */}
            <section id="pricing" className="section section--animate" ref={addRef}>
                <div className="section__inner">
                    <div className="section__header">
                        <span className="section__badge">Pricing</span>
                        <h2 className="section__title">Simple pricing, <span className="text-gradient">exceptional value</span></h2>
                        <p className="section__subtitle">Transparent pricing with no hidden fees. Choose the plan that fits your project.</p>
                    </div>

                    <div className="pricing-grid">
                        <div className="pricing-card">
                            <h3 className="pricing-card__name">Starter</h3>
                            <div className="pricing-card__price">$100</div>
                            <p className="pricing-card__desc">Perfect for small businesses and landing pages</p>
                            <ul className="pricing-card__features">
                                <li><Check size={16} /> Single page website</li>
                                <li><Check size={16} /> Responsive design</li>
                                <li><Check size={16} /> Basic SEO setup</li>
                                <li><Check size={16} /> 1 round of revisions</li>
                                <li><Check size={16} /> 30-day support</li>
                            </ul>
                            <Link to="/register" className="btn-secondary pricing-card__btn">Get Started</Link>
                        </div>

                        <div className="pricing-card pricing-card--featured">
                            <div className="pricing-card__badge">Most Popular</div>
                            <h3 className="pricing-card__name">Professional</h3>
                            <div className="pricing-card__price">$599</div>
                            <p className="pricing-card__desc">Ideal for growing businesses and multi-page sites</p>
                            <ul className="pricing-card__features">
                                <li><Check size={16} /> Up to 10 pages</li>
                                <li><Check size={16} /> Custom UI/UX design</li>
                                <li><Check size={16} /> Advanced SEO</li>
                                <li><Check size={16} /> CMS integration</li>
                                <li><Check size={16} /> 3 rounds of revisions</li>
                                <li><Check size={16} /> 90-day support</li>
                            </ul>
                            <Link to="/register" className="btn-primary pricing-card__btn">Get Started</Link>
                        </div>

                        <div className="pricing-card">
                            <h3 className="pricing-card__name">Enterprise</h3>
                            <div className="pricing-card__price">Custom</div>
                            <p className="pricing-card__desc">For complex web apps and large-scale projects</p>
                            <ul className="pricing-card__features">
                                <li><Check size={16} /> Unlimited pages</li>
                                <li><Check size={16} /> Full-stack development</li>
                                <li><Check size={16} /> E-commerce / SaaS</li>
                                <li><Check size={16} /> API integrations</li>
                                <li><Check size={16} /> Unlimited revisions</li>
                                <li><Check size={16} /> Dedicated support</li>
                            </ul>
                            <Link to="/register" className="btn-secondary pricing-card__btn">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="section section--animate cta-section" ref={addRef}>
                <div className="section__inner">
                    <div className="cta-block">
                        <div className="bg-orbs" style={{ opacity: 0.5 }}>
                            <div className="orb orb-1"></div>
                            <div className="orb orb-2"></div>
                        </div>
                        <div className="cta-block__content">
                            <Zap size={32} className="cta-block__icon" />
                            <h2>Ready to build your <span className="text-gradient">dream website?</span></h2>
                            <p>Let's turn your vision into reality. Get in touch today and receive a free project consultation.</p>
                            <Link to="/register" className="btn-primary cta-block__btn">
                                <span>Start Your Project</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
