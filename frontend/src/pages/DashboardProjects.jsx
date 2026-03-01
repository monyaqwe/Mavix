import { useState, useEffect } from 'react';
import { Layout, ShoppingBag, Monitor, Code, CheckCircle, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ContactModal from '../components/common/ContactModal';

const CATALOG_ITEMS = [
    {
        id: 'landing',
        title: 'Landing Page',
        icon: Layout,
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
        description: 'A beautiful, high-converting one-page website to showcase your product, service, or portfolio.',
        features: ['Responsive Design', 'SEO Optimized', 'Contact Form Integration', 'Fast Loading Times'],
        price: 'From $500',
        popular: false
    },
    {
        id: 'ecommerce',
        title: 'E-commerce',
        icon: ShoppingBag,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        description: 'A complete online store to sell your physical or digital products globally with secure payments.',
        features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway Integration', 'Order Management'],
        price: 'From $1,500',
        popular: true
    },
    {
        id: 'webapp',
        title: 'Web App',
        icon: Monitor,
        image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800',
        description: 'A dynamic, feature-rich web application with user authentication, databases, and custom logic.',
        features: ['User Dashboards', 'Database Integration', 'API Development', 'Scalable Architecture'],
        price: 'From $3,000',
        popular: false
    },
    {
        id: 'custom',
        title: 'Custom Solution',
        icon: Code,
        image: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?auto=format&fit=crop&q=80&w=800',
        description: 'A fully bespoke software solution tailored exactly to your unique business requirements and workflows.',
        features: ['Bespoke Architecture', 'Advanced Security', 'Third-party Integrations', 'Dedicated Support'],
        price: 'Custom Quote',
        popular: false
    }
];

const DashboardProjects = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.state?.openNewProjectModal) {
            setShowModal(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleOrderClick = (title) => {
        setSelectedType(title);
        setShowModal(true);
    };

    return (
        <>
            <div className="dash__welcome" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 className="dash__welcome-title">Available <span className="text-gradient">Services</span></h1>
                    <p className="dash__welcome-sub">Choose a digital solution from our catalog to get started on your next big project.</p>
                </div>
            </div>

            <div className="dash-proj__grid" style={{ gap: '2rem', justifyContent: 'center' }}>
                {CATALOG_ITEMS.map((item) => (
                    <div key={item.id} className="dash-proj__card catalog-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: 0 }}>
                        {item.popular && (
                            <span style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'var(--accent-gradient)', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', padding: '6px 14px', borderRadius: '100px', boxShadow: '0 4px 12px rgba(79, 139, 255, 0.4)' }}>
                                MOST POPULAR
                            </span>
                        )}

                        <div className="catalog-card__image" style={{ height: '180px', width: '100%', backgroundImage: `linear-gradient(rgba(5, 10, 24, 0.2), rgba(5, 10, 24, 0.8)), url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '1px solid var(--border-color)' }} />

                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, background: 'rgba(12, 18, 37, 0.8)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '-3.5rem', zIndex: 5 }}>
                                <div style={{ padding: '1rem', background: '#050a18', border: '1px solid var(--border-color)', color: 'var(--accent-primary)', borderRadius: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }}>
                                    <item.icon size={28} />
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>{item.title}</h3>
                                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1rem' }}>{item.price}</span>
                            </div>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, flex: 1 }}>
                                {item.description}
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                                {item.features.map((feature, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                                        <CheckCircle size={16} color="var(--accent-primary)" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="btn-primary"
                                style={{ width: '100%', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}
                                onClick={() => handleOrderClick(item.title)}
                            >
                                Continue with {item.title} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ContactModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                initialProjectType={selectedType}
            />
        </>
    );
};

export default DashboardProjects;
