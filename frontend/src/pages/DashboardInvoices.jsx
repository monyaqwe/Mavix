import { useState, useEffect } from 'react';
import { CreditCard, Clock, CheckCircle, AlertCircle, X, ShieldCheck, Zap, ArrowRight, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardInvoices = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isPaying, setIsPaying] = useState(false);
    const [paymentStep, setPaymentStep] = useState('entry'); // 'entry', 'processing', 'success'
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentError, setPaymentError] = useState('');
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' });
    const [paypalEmail, setPaypalEmail] = useState('');

    const getUserEmail = () => {
        try {
            const stored = localStorage.getItem('user');
            if (stored) {
                return JSON.parse(stored).email;
            }
            // fallback
            return localStorage.getItem('userEmail');
        } catch (e) {
            console.error('Failed to parse user email');
        }
        return null;
    };

    const fetchRequests = async () => {
        const email = getUserEmail();
        if (!email) {
            setError("Please log in to view your requests.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:9083/api/contact/my-requests?email=${encodeURIComponent(email)}`);
            if (!response.ok) throw new Error('Failed to fetch requests');
            const data = await response.json();
            setRequests(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleOpenPayment = (request) => {
        setSelectedRequest(request);
        setPaymentStep('entry');
        setIsPaymentModalOpen(true);
    };

    const handleMockPay = async () => {
        if (!selectedRequest) return;

        if (paymentMethod === 'card') {
            if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.name) {
                setPaymentError('Please fill in all credit card details to proceed.');
                return;
            }
            if (cardDetails.number.length < 15) {
                setPaymentError('Please enter a valid card number.');
                return;
            }
        } else {
            if (!paypalEmail || !paypalEmail.includes('@')) {
                setPaymentError('Please enter a valid PayPal email address.');
                return;
            }
        }

        setPaymentError('');
        setIsPaying(true);
        setPaymentStep('processing');

        try {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 2500));

            const response = await fetch(`http://localhost:9083/api/contact/${selectedRequest.id}/pay`, {
                method: 'POST'
            });

            if (!response.ok) throw new Error('Payment simulation failed');

            setPaymentStep('success');
            await fetchRequests();

            // Wait a bit before closing on success
            setTimeout(() => {
                setIsPaymentModalOpen(false);
            }, 3000);
        } catch (err) {
            setPaymentStep('entry');
            alert("Error processing mock payment: " + err.message);
        } finally {
            setIsPaying(false);
        }
    };

    // DEBUG: Simulate manager setting a price
    const handleSimulatePricing = async (id) => {
        const amount = prompt("Enter mock price for this project ($):", "1500");
        if (!amount) return;

        try {
            const response = await fetch(`http://localhost:9083/api/contact/${id}/set-price?amount=${amount}`, {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Pricing simulation failed');
            await fetchRequests();
            alert(`Manager has set the price to $${amount}. You can now pay!`);
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'PENDING_PRICING':
                return (
                    <span className="status-badge status-pending">
                        <Clock size={14} /> Pending Review
                    </span>
                );
            case 'PENDING_PAYMENT':
                return (
                    <span className="status-badge status-warning">
                        <AlertCircle size={14} /> Awaiting Payment
                    </span>
                );
            case 'PAID':
                return (
                    <span className="status-badge status-success">
                        <CheckCircle size={14} /> Paid
                    </span>
                );
            default:
                return (
                    <span className="status-badge status-pending">
                        <Clock size={14} /> {status}
                    </span>
                );
        }
    };

    if (loading) {
        return (
            <div className="dash__content animate-fade-in" style={{ padding: '2rem' }}>
                <div className="loader-container">
                    <span className="loader"></span> Loading requests...
                </div>
            </div>
        );
    }

    return (
        <div className="dash__content animate-fade-in" style={{ padding: '2.5rem' }}>
            <div className="dash-settings__header" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 className="dash-settings__title">My Requests & Invoices</h1>
                    <p className="dash-settings__subtitle">Track your project requests and manage pending payments.</p>
                </div>
            </div>

            {error ? (
                <div className="error-message">{error}</div>
            ) : requests.length === 0 ? (
                <div className="dash-settings__card animate-fade-in" style={{ textAlign: 'center', padding: '5rem 2rem', maxWidth: '600px', margin: '0 auto', border: '1px dashed var(--border-color)', background: 'transparent' }}>
                    <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', transform: 'rotate(-5deg)' }}>
                        <Zap size={32} color="var(--accent-primary)" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>No active requests</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Your project requests and invoices will appear here. Start by browsing our service catalog to find the perfect solution for your business.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard/projects')}
                        className="btn-primary"
                        style={{ padding: '0.8rem 1.75rem', fontSize: '0.9rem', width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)' }}
                    >
                        Explore Services <ArrowRight size={18} />
                    </button>
                </div>
            ) : (
                <div className="invoices-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {requests.map(request => (
                        <div key={request.id} className="invoice-row" style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            display: 'grid',
                            gridTemplateColumns: 'minmax(200px, 1fr) 140px 150px 180px',
                            alignItems: 'center',
                            gap: '2rem',
                            transition: 'all 0.3s ease'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                                    {request.subject || 'Custom Project'}
                                </h3>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                                    ID: #{request.id.toString().padStart(5, '0')} · {request.message.substring(0, 40)}...
                                </p>
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                {getStatusBadge(request.paymentStatus)}
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Amount</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: request.price ? 'var(--text-primary)' : 'var(--text-muted)', fontFamily: 'monospace' }}>
                                    {request.price ? `$${request.price.toLocaleString()}` : '— — —'}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                {request.paymentStatus === 'PENDING_PRICING' ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                        <Clock size={16} />
                                        <span>Calculating...</span>
                                    </div>
                                ) : request.paymentStatus === 'PENDING_PAYMENT' ? (
                                    <button
                                        onClick={() => handleOpenPayment(request)}
                                        className="btn-primary"
                                        style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', width: 'auto', borderRadius: '12px' }}
                                    >
                                        <Zap size={14} fill="currentColor" style={{ marginRight: '0.4rem' }} /> Pay Invoice
                                    </button>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
                                        <ShieldCheck size={18} />
                                        <span>Project Active</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MAVIX CHECKOUT MODAL */}
            {isPaymentModalOpen && (
                <div className="auth-modal-backdrop" onClick={() => (paymentStep === 'entry') && setIsPaymentModalOpen(false)}>
                    <div className="auth-modal" onClick={e => e.stopPropagation()} style={{
                        maxWidth: '550px',
                        padding: '0',
                        overflow: 'hidden',
                        borderRadius: '24px',
                        background: 'var(--bg-secondary)'
                    }}>
                        {/* Header Image/Pattern */}
                        <div style={{
                            height: '140px',
                            background: 'var(--accent-gradient)',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <button onClick={() => setIsPaymentModalOpen(false)} style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }} disabled={paymentStep === 'processing'}>
                                <X size={20} />
                            </button>

                            {/* Animated Check on Success */}
                            {paymentStep === 'success' ? (
                                <div className="animate-bounce-in" style={{ background: 'white', padding: '1rem', borderRadius: '50%' }}>
                                    <CheckCircle size={40} color="#10b981" />
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', color: 'white' }}>
                                    <ShieldCheck size={48} style={{ opacity: 0.9, marginBottom: '0.5rem' }} />
                                    <p style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secured by MavixPay</p>
                                </div>
                            )}
                        </div>

                        <div style={{ padding: '2.5rem' }}>
                            {paymentStep === 'entry' && (
                                <div className="animate-fade-in">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                        <div>
                                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Checkout</h2>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Project: {selectedRequest?.subject}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Amount Due</p>
                                            <p style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--accent-primary)' }}>${selectedRequest?.price?.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    {/* Payment Form */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        {paymentError && (
                                            <div style={{ padding: '0.75rem', marginBottom: '1rem', background: 'rgba(248, 113, 113, 0.1)', color: '#f87171', borderRadius: '8px', border: '1px solid rgba(248, 113, 113, 0.2)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <AlertCircle size={16} /> {paymentError}
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <button
                                                className={paymentMethod === 'card' ? "btn-primary" : ""}
                                                onClick={() => setPaymentMethod('card')}
                                                style={paymentMethod === 'card' ? { flex: 1, padding: '0.75rem', borderRadius: '8px' } : { flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                                            >
                                                Credit Card
                                            </button>
                                            <button
                                                className={paymentMethod === 'paypal' ? "btn-primary" : ""}
                                                onClick={() => setPaymentMethod('paypal')}
                                                style={paymentMethod === 'paypal' ? { flex: 1, padding: '0.75rem', borderRadius: '8px' } : { flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                                            >
                                                PayPal
                                            </button>
                                        </div>

                                        <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                            {paymentMethod === 'card' ? (
                                                <>
                                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                                        <label style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Card Number</label>
                                                        <input
                                                            type="text"
                                                            placeholder="0000 0000 0000 0000"
                                                            value={cardDetails.number}
                                                            onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                                                            autoComplete="off"
                                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'monospace' }}
                                                        />
                                                    </div>

                                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                                        <div className="form-group" style={{ flex: 1 }}>
                                                            <label style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Expiry Date</label>
                                                            <input
                                                                type="text"
                                                                placeholder="MM/YY"
                                                                value={cardDetails.expiry}
                                                                onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                                                                autoComplete="off"
                                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                                                            />
                                                        </div>
                                                        <div className="form-group" style={{ flex: 1 }}>
                                                            <label style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>CVC</label>
                                                            <input
                                                                type="text"
                                                                placeholder="123"
                                                                value={cardDetails.cvc}
                                                                onChange={(e) => setCardDetails(prev => ({ ...prev, cvc: e.target.value }))}
                                                                autoComplete="off"
                                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group" style={{ marginTop: '1rem', marginBottom: '0' }}>
                                                        <label style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Cardholder Name</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Name on card"
                                                            value={cardDetails.name}
                                                            onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                                                            autoComplete="off"
                                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="form-group" style={{ marginBottom: '0' }}>
                                                    <label style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>PayPal Email Address</label>
                                                    <input
                                                        type="email"
                                                        placeholder="your.email@example.com"
                                                        value={paypalEmail}
                                                        onChange={(e) => setPaypalEmail(e.target.value)}
                                                        autoComplete="off"
                                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                                                    />
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                                                        You will be redirected to PayPal to complete your purchase securely.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        className="btn-primary"
                                        onClick={handleMockPay}
                                        style={{ width: '100%', padding: '1rem', borderRadius: '14px', fontSize: '1.1rem', fontWeight: 700 }}
                                    >
                                        Confirm & Pay ${selectedRequest?.price?.toLocaleString()}
                                    </button>

                                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        <ShieldCheck size={14} /> Encrypted & Secure Payment
                                    </p>
                                </div>
                            )}

                            {paymentStep === 'processing' && (
                                <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div className="loader" style={{ width: '4rem', height: '4rem', margin: '0 auto 2rem', border: '4px solid var(--border-color)', borderBottomColor: 'var(--accent-primary)' }}></div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Processing Payment</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>We're securely communicating with MavixPay servers...</p>
                                </div>
                            )}

                            {paymentStep === 'success' && (
                                <div className="animate-fade-in" style={{ textAlign: 'center', padding: '1rem 0' }}>
                                    <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: '#10b981' }}>Success!</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                        Thank you! Your payment of <strong>${selectedRequest?.price?.toLocaleString()}</strong> has been processed successfully.
                                    </p>
                                    <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '16px', textAlign: 'left', marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Receipt Number:</span>
                                            <span style={{ fontWeight: 600 }}>MVX-{Math.floor(Math.random() * 90000) + 10000}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                                            <span style={{ fontWeight: 600, color: '#10b981' }}>Confirmed</span>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Redirecting you back to your dashboard...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardInvoices;
