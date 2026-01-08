/**
 * CRYPTO & SECURITY UTILITIES
 * Note: Real security (hashing/encryption) should mostly happen on the server.
 * Client-side crypto is useful for basic generation, encoding, or non-critical obfuscation.
 */

// --- Generation ---

export const generateUUID = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback for older environments
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    // Example: "550e8400-e29b-41d4-a716-446655440000"
};

export const generateId = (length = 10): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
    // Example: "abc123xyz"
};

export const generateToken = (length = 32): string => {
    // Use crypto.getRandomValues for better entropy if available
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, length);
    }
    return generateId(length);
};

export const generateOTP = (length = 6): string => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
    // Example: "123456"
};

// --- Encoding / Decoding ---

export const base64Encode = (str: string): string => {
    return btoa(str);
};

export const base64Decode = (str: string): string => {
    return atob(str);
};

// --- Sanitization ---

export const escapeXml = (unsafe: string): string => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

export const sanitizeHtml = (html: string): string => {
    // Basic sanitization: Strip script tags and on* attributes
    // For robust sanitization, use DOMPurify library
    return html
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
        .replace(/ on\w+="[^"]*"/g, "");
};

// --- Hash Helpers (Async) ---

/**
 * Returns a SHA-256 hash of the string (Hex format).
 * Note: This is async because checking Web Crypto API is async.
 */
export const hash = async (str: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
