export const APP = {
    NAME: 'Admin Kit',
    VERSION: '1.0.0',
    DEFAULT_LANGUAGE: 'en',
    SUPPORT_EMAIL: 'support@nexus.ai',

    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 10,
        PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
    },

    DATE_FORMAT: {
        DISPLAY: 'MMM dd, yyyy', // e.g. Jan 01, 2024
        API: 'yyyy-MM-dd',
        DATETIME_DISPLAY: 'MMM dd, yyyy HH:mm',
    },

    THEME: {
        DEFAULT_MODE: 'light',
        STORAGE_KEY: 'nexus-theme',
    },

    UPLOAD: {
        MAX_SIZE: 5 * 1024 * 1024, // 5MB
        ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        ACCEPTED_DOC_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    },

    SIDEBAR: {
        WIDTH_EXPANDED: 256, // 16rem
        WIDTH_COLLAPSED: 70,
        MOBILE_BREAKPOINT: 1024,
    }
} as const;
