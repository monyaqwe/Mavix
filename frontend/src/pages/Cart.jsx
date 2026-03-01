import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, CreditCard } from 'lucide-react';

const Cart = () => {
    const { items, removeItem, clearCart } = useCart();

    const handleCheckout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || ''}/api/cart/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            });
            if (response.ok) {
                alert('Checkout successful!');
                clearCart();
            } else {
                alert('Checkout failed.');
            }
        } catch (e) {
            console.error(e);
            alert('Error during checkout.');
        }
    };

    return (
        <div className="cart-page" style={{ padding: '2rem' }}>
            <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Your Cart</h2>
            {items.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>Your cart is empty.</p>
            ) : (
                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: `1px solid var(--border-color)`, color: 'var(--text-muted)' }}>
                                <th style={{ padding: '0.5rem' }}>Service</th>
                                <th style={{ padding: '0.5rem' }}>Price</th>
                                <th style={{ padding: '0.5rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, idx) => (
                                <tr key={idx} style={{ borderBottom: `1px solid var(--border-color)` }}>
                                    <td style={{ padding: '0.5rem' }}>{item.title}</td>
                                    <td style={{ padding: '0.5rem' }}>{item.price ? `$${item.price}` : 'Negotiable'}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                        <button onClick={clearCart} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Trash2 size={16} /> Clear Cart
                        </button>
                        <button onClick={handleCheckout} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CreditCard size={16} /> Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
