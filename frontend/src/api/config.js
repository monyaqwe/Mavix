export const AUTH_API_BASE = 'http://localhost:8080';
export const USER_API_BASE = 'http://localhost:8081';

export const AUTH_ENDPOINTS = {
    REGISTER: `${AUTH_API_BASE}/auth/register`,
    LOGIN: `${AUTH_API_BASE}/auth/login`,
    VERIFY: `${AUTH_API_BASE}/auth/verify`,
    RESEND_VERIFICATION: `${AUTH_API_BASE}/auth/resend-verification`,
    FORGOT_PASSWORD: `${AUTH_API_BASE}/auth/forgot-password`,
    VERIFY_RESET: `${AUTH_API_BASE}/auth/verify-reset`,
    RESET_PASSWORD: `${AUTH_API_BASE}/auth/reset-password`,
};

export const USER_ENDPOINTS = {
    PROJECTS: `${USER_API_BASE}/api/projects`,
};
