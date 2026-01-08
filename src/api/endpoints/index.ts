// Re-exporting from constants or defining here if not already defined
// For this structure, we'll keep the definitions here or reference the constants

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
    TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
};

export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        VERIFY_EMAIL: '/auth/verify-email',
        ME: '/auth/me',
    },
    USERS: {
        LIST: '/users',
        DETAIL: (id: string) => `/users/${id}`,
        CREATE: '/users',
        UPDATE: (id: string) => `/users/${id}`,
        DELETE: (id: string) => `/users/${id}`,
    },
    PROJECTS: {
        LIST: '/projects',
        DETAIL: (id: string) => `/projects/${id}`,
        CREATE: '/projects',
        UPDATE: (id: string) => `/projects/${id}`,
        DELETE: (id: string) => `/projects/${id}`,
    },
} as const;
