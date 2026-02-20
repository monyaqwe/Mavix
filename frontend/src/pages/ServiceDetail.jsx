import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Code, Palette, ShoppingCart, Search, Smartphone, Wrench, Check, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const servicesData = {
    'web-development': {
        icon: Code,
        title: 'Web Development',
        tagline: 'Custom-built websites that perform',
        description: 'We build fast, scalable, and SEO-optimized websites using modern technologies like React, Next.js, Vue, and Node.js. Every project is tailored to your unique business needs.',
        features: [
            'Custom front-end development (React, Vue, Angular)',
            'Back-end & API development (Node.js, Python, Java)',
            'Progressive Web Apps (PWA)',
            'Performance optimization & Core Web Vitals',
            'Cross-browser compatibility testing',
            'Clean, maintainable codebase',
        ],
        process: [
            { step: 'Discovery', desc: 'We analyze your requirements, target audience, and competitors.' },
            { step: 'Architecture', desc: 'We plan the tech stack, structure, and database schema.' },
            { step: 'Development', desc: 'Agile sprints with weekly demos and feedback loops.' },
            { step: 'Launch', desc: 'Deployment, performance tuning, and go-live.' },
        ],
    },
    'ui-ux-design': {
        icon: Palette,
        title: 'UI/UX Design',
        tagline: 'Interfaces users love',
        description: 'We design beautiful, intuitive interfaces grounded in user research and data. From wireframes to polished prototypes — every pixel has a purpose.',
        features: [
            'User research & persona development',
            'Wireframing & information architecture',
            'High-fidelity prototypes in Figma',
            'Design systems & component libraries',
            'Usability testing & iteration',
            'Motion design & micro-interactions',
        ],
        process: [
            { step: 'Research', desc: 'User interviews, competitor analysis, and heuristic evaluation.' },
            { step: 'Wireframes', desc: 'Low-fidelity sketches to define layout and flow.' },
            { step: 'Prototypes', desc: 'Interactive high-fidelity prototypes in Figma.' },
            { step: 'Handoff', desc: 'Developer-ready specs with design tokens and assets.' },
        ],
    },
    'e-commerce': {
        icon: ShoppingCart,
        title: 'E-Commerce',
        tagline: 'Sell more, effortlessly',
        description: 'We build powerful online stores with seamless checkout flows, real-time inventory management, and payment integrations that maximize conversions.',
        features: [
            'Shopify, WooCommerce, or custom solutions',
            'Secure payment gateway integration',
            'Inventory & order management',
            'Product catalog & filtering',
            'Cart abandonment recovery',
            'Analytics & conversion tracking',
        ],
        process: [
            { step: 'Strategy', desc: 'Define product catalog, pricing, and shipping models.' },
            { step: 'Design', desc: 'Conversion-optimized storefront and checkout flow.' },
            { step: 'Build', desc: 'Full store setup with payment and shipping integration.' },
            { step: 'Optimize', desc: 'A/B testing, speed optimization, and SEO.' },
        ],
    },
    'seo-optimization': {
        icon: Search,
        title: 'SEO Optimization',
        tagline: 'Rank higher, grow faster',
        description: 'Data-driven SEO strategies that put your website at the top of search results, drive organic traffic, and increase your visibility.',
        features: [
            'Technical SEO audit & fixes',
            'Keyword research & content strategy',
            'On-page optimization (meta, schema, headings)',
            'Link building & authority growth',
            'Google Search Console & Analytics setup',
            'Monthly performance reports',
        ],
        process: [
            { step: 'Audit', desc: 'Full technical and content audit of your website.' },
            { step: 'Strategy', desc: 'Keyword mapping, content plan, and backlink strategy.' },
            { step: 'Execution', desc: 'On-page fixes, content creation, and outreach.' },
            { step: 'Reporting', desc: 'Monthly reports with rankings, traffic, and recommendations.' },
        ],
    },
    'mobile-first-design': {
        icon: Smartphone,
        title: 'Mobile-First Design',
        tagline: 'Perfect on every screen',
        description: 'We design responsive experiences that look stunning on every device. Mobile-first methodology ensures your site works flawlessly from phones to ultrawide monitors.',
        features: [
            'Mobile-first responsive layouts',
            'Touch-friendly navigation & interactions',
            'Adaptive images & lazy loading',
            'Cross-device testing (iOS, Android, tablets)',
            'PWA capabilities for mobile users',
            'Fast mobile load times',
        ],
        process: [
            { step: 'Mobile Design', desc: 'Start with the smallest screen and scale up.' },
            { step: 'Breakpoints', desc: 'Define responsive breakpoints for all devices.' },
            { step: 'Testing', desc: 'Test on real devices and emulators.' },
            { step: 'Optimization', desc: 'Reduce payload, optimize images, and improve LCP.' },
        ],
    },
    'maintenance-support': {
        icon: Wrench,
        title: 'Maintenance & Support',
        tagline: 'Your site, always running',
        description: 'Ongoing updates, security patches, and performance monitoring to keep your website running flawlessly — so you can focus on your business.',
        features: [
            'Regular security updates & patches',
            'Performance monitoring & uptime tracking',
            'Content updates & feature additions',
            'Backup & disaster recovery',
            'Bug fixes & troubleshooting',
            'Priority response support',
        ],
        process: [
            { step: 'Onboard', desc: 'Audit your current site and set up monitoring.' },
            { step: 'Monitor', desc: '24/7 uptime and performance tracking.' },
            { step: 'Maintain', desc: 'Regular updates, backups, and security patches.' },
            { step: 'Support', desc: 'Fast response to issues and feature requests.' },
        ],
    },
};

const ServiceDetail = () => {
    const { slug } = useParams();
    const service = servicesData[slug];

    // Scroll to top when slug changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!service) {
        return (
            <div className="landing">
                <Navbar />
                <section className="hero" style={{ minHeight: '60vh' }}>
                    <div className="bg-orbs"><div className="orb orb-1"></div><div className="orb orb-2"></div></div>
                    <div className="grid-overlay"></div>
                    <div className="hero__content">
                        <h1 className="hero__title">Service not found</h1>
                        <p className="hero__subtitle">The service you're looking for doesn't exist.</p>
                        <Link to="/" className="btn-primary hero__cta" style={{ width: 'auto' }}>
                            <ArrowLeft size={18} />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    const IconComponent = service.icon;
    const serviceKeys = Object.keys(servicesData);
    const currentIdx = serviceKeys.indexOf(slug);
    const nextSlug = serviceKeys[(currentIdx + 1) % serviceKeys.length];
    const nextService = servicesData[nextSlug];

    return (
        <div className="landing">
            <Navbar />

            {/* Hero */}
            <section className="hero service-hero">
                <div className="bg-orbs">
                    <div className="orb orb-1"></div>
                    <div className="orb orb-2"></div>
                    <div className="orb orb-3"></div>
                </div>
                <div className="grid-overlay"></div>

                <div className="hero__content">
                    <Link to="/#services" className="service-hero__back">
                        <ArrowLeft size={16} />
                        <span>All Services</span>
                    </Link>
                    <div className="service-hero__icon-big">
                        <IconComponent size={40} />
                    </div>
                    <div className="hero__badge">
                        <Sparkles size={14} />
                        <span>{service.tagline}</span>
                    </div>
                    <h1 className="hero__title">
                        <span className="text-gradient">{service.title}</span>
                    </h1>
                    <p className="hero__subtitle">{service.description}</p>
                    <div className="hero__actions">
                        <Link to="/register" className="btn-primary hero__cta">
                            <span>Start Your Project</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section">
                <div className="section__inner">
                    <div className="section__header">
                        <span className="section__badge">What's Included</span>
                        <h2 className="section__title">Everything you need for <span className="text-gradient">{service.title.toLowerCase()}</span></h2>
                    </div>
                    <div className="features-list">
                        {service.features.map((f, i) => (
                            <div key={i} className="feature-row">
                                <div className="feature-row__check"><Check size={18} /></div>
                                <span>{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section section--dark">
                <div className="section__inner">
                    <div className="section__header">
                        <span className="section__badge">Our Process</span>
                        <h2 className="section__title">How we deliver <span className="text-gradient">{service.title.toLowerCase()}</span></h2>
                    </div>
                    <div className="process-grid">
                        {service.process.map((p, i) => (
                            <div key={i} className="process-card">
                                <div className="process-card__number">0{i + 1}</div>
                                <h3>{p.step}</h3>
                                <p>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section cta-section">
                <div className="section__inner">
                    <div className="cta-block">
                        <div className="cta-block__content">
                            <h2>Ready to get started with <span className="text-gradient">{service.title.toLowerCase()}?</span></h2>
                            <p>Let's discuss your project. We offer free consultations to help you find the perfect solution.</p>
                            <Link to="/register" className="btn-primary cta-block__btn">
                                <span>Start Your Project</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Service */}
            <section className="section section--dark">
                <div className="section__inner">
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Next Service</p>
                        <Link to={`/services/${nextSlug}`} className="next-service-link">
                            <span className="text-gradient">{nextService.title}</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ServiceDetail;
