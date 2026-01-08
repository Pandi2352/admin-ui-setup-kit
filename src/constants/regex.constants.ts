export const REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[\d\s-()]{10,}$/,
    // Strong password: At least 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 special char
    PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i,
    SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
    NUMERIC: /^\d+$/,
    CREDIT_CARD: /^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/,

    // Additional helpful regex patterns
    DATE_YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    TIME_24H: /^([01]\d|2[0-3]):?([0-5]\d)$/,
    ZIP_CODE_US: /^\d{5}(-\d{4})?$/,
    IP_V4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
} as const;
