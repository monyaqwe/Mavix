import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const AuthModal = ({ children }) => {
    const navigate = useNavigate();

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            navigate('/');
        }
    };

    return (
        <div className="auth-modal-backdrop" onClick={handleBackdropClick}>
            <div className="auth-modal">
                <button className="auth-modal__close" onClick={() => navigate('/')} aria-label="Close">
                    <X size={20} />
                </button>
                <div className="auth-modal__body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
