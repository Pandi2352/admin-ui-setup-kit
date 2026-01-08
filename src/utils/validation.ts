import { REGEX } from '../constants/regex.constants';

/**
 * VALIDATION UTILITIES
 * Wrappers around RegEx for common validation scenarios.
 */

export const isEmail = (email: string): boolean => {
    return REGEX.EMAIL.test(email);
};

export const isPhoneNumber = (phone: string): boolean => {
    return REGEX.PHONE.test(phone);
};

export const isStrongPassword = (password: string): boolean => {
    return REGEX.PASSWORD_STRONG.test(password);
};

export const isUrl = (url: string): boolean => {
    return REGEX.URL.test(url);
};

export const isNumeric = (str: string): boolean => {
    return REGEX.NUMERIC.test(str);
};

export const isAlphaNumeric = (str: string): boolean => {
    return REGEX.ALPHANUMERIC.test(str);
};

export const isCreditCard = (str: string): boolean => {
    return REGEX.CREDIT_CARD.test(str);
};

export const isIpAddress = (str: string): boolean => {
    if (!REGEX.IP_V4) return false;
    return REGEX.IP_V4.test(str);
};

export const hasLength = (str: string, min: number, max?: number): boolean => {
    if (!str) return false;
    if (str.length < min) return false;
    if (max && str.length > max) return false;
    return true;
};

// Form specific validations
export const required = (value: any): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
};
