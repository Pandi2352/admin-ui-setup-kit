/**
 * BROWSER / DOM UTILITIES
 * Helpers for interacting with the window/document.
 */

export const scrollToTop = (smooth = true) => {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto',
    });
};

export const scrollToElement = (elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
};

export const isMobileDevice = (): boolean => {
    return (
        typeof window !== 'undefined' &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )
    );
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
        console.warn('Clipboard API not supported');
        return false;
    }
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (e) {
        console.error('Copy failed', e);
        return false;
    }
};

// --- Cookie Helpers (Separate from LocalStorage) ---

export const getCookie = (name: string): string | null => {
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
};

export const setCookie = (name: string, value: string, days?: number) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const deleteCookie = (name: string) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
