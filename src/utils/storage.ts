/**
 * LOCAL STORAGE UTILITIES
 * Wrappers for localStorage with error handling and expiry features.
 */

const isBrowser = typeof window !== 'undefined';

export const storage = {
    getItem: <T>(key: string, defaultValue: T | null = null): T | null => {
        if (!isBrowser) return defaultValue;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error getting item ${key} from storage:`, error);
            return defaultValue;
        }
    },

    setItem: (key: string, value: any): void => {
        if (!isBrowser) return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting item ${key} to storage:`, error);
        }
    },

    removeItem: (key: string): void => {
        if (!isBrowser) return;
        localStorage.removeItem(key);
    },

    clear: (): void => {
        if (!isBrowser) return;
        localStorage.clear();
    },

    hasItem: (key: string): boolean => {
        if (!isBrowser) return false;
        return localStorage.getItem(key) !== null;
    },

    // --- Expiry Features ---

    /**
     * Set item with time-to-live (TTL) in milliseconds
     */
    setWithExpiry: (key: string, value: any, ttl: number): void => {
        if (!isBrowser) return;
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        };
        try {
            localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error(`Error setting item ${key} with expiry:`, error);
        }
    },

    /**
     * Get item only if it hasn't expired. Returns null if expired or missing.
     */
    getWithExpiry: <T>(key: string): T | null => {
        if (!isBrowser) return null;
        try {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return null;

            const item = JSON.parse(itemStr);
            const now = new Date();

            if (now.getTime() > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            return item.value as T;
        } catch (error) {
            return null;
        }
    },

    // --- Meta ---

    getSize: (): number => {
        if (!isBrowser) return 0;
        let total = 0;
        for (let x in localStorage) {
            if (Object.prototype.hasOwnProperty.call(localStorage, x)) {
                total += ((localStorage[x].length + x.length) * 2);
            }
        }
        // Return size in bytes
        return total;
    }
};

export default storage;
