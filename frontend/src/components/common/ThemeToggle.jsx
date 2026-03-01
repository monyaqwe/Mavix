import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored === 'dark';
        // default to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const theme = isDark ? 'dark' : 'light';
        document.body.classList.remove(isDark ? 'light-theme' : 'dark-theme');
        document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');
        localStorage.setItem('theme', theme);
    }, [isDark]);

    const toggle = () => setIsDark(!isDark);

    return (
        <button
            onClick={toggle}
            className="navbar__cta"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            aria-label="Toggle theme"
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
};

export default ThemeToggle;
