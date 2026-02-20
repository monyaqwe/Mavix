import Navbar from './Navbar';

const AuthPage = ({ children }) => {
    return (
        <div className="auth-page-layout">
            <Navbar />

            {/* Animated background */}
            <div className="bg-orbs">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>
            <div className="grid-overlay"></div>

            {/* Centered form card */}
            <div className="auth-page-center">
                <div className="auth-card">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
