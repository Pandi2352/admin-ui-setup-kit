export const ROUTES = {
    HOME: '/',

    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        FORGOT_PASSWORD: '/forgot-password',
        RESET_PASSWORD: '/reset-password',
        VERIFY_EMAIL: '/verify-email',
        LOGOUT: '/logout',
    },

    DASHBOARD: '/dashboard',

    USERS: {
        LIST: '/users',
        CREATE: '/users/create',
        DETAIL: (id: string) => `/users/${id}`,
        EDIT: (id: string) => `/users/${id}/edit`,
    },

    PROJECTS: {
        LIST: '/projects',
        CREATE: '/projects/create',
        DETAIL: (id: string) => `/projects/${id}`,
        EDIT: (id: string) => `/projects/${id}/edit`,
    },

    SETTINGS: {
        ROOT: '/settings',
        PROFILE: '/settings/profile',
        SECURITY: '/settings/security',
        NOTIFICATIONS: '/settings/notifications',
        APPEARANCE: '/settings/appearance',
    },

    ERRORS: {
        NOT_FOUND: '/404',
        FORBIDDEN: '/403',
        SERVER_ERROR: '/500',
        MAINTENANCE: '/maintenance',
        UNAUTHORIZED: '/unauthorized',
    },
} as const;
