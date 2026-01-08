/**
 * STRING UTILITIES
 * Collection of helper functions for string manipulation.
 */

// --- Casing ---

export const capitalize = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
    // Example: capitalize("hello") -> "Hello"
};

export const capitalizeWords = (str: string): string => {
    if (!str) return '';
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
    // Example: capitalizeWords("hello world") -> "Hello World"
};

export const camelCase = (str: string): string => {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
    // Example: camelCase("hello-world") -> "helloWorld"
};

export const kebabCase = (str: string): string => {
    if (!str) return '';
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
    // Example: kebabCase("helloWorld") -> "hello-world"
};

export const snakeCase = (str: string): string => {
    if (!str) return '';
    return str
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[\s-]+/g, '_')
        .toLowerCase();
    // Example: snakeCase("helloWorld") -> "hello_world"
};


// --- Formatting ---

export const slugify = (str: string): string => {
    if (!str) return '';
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    // Example: slugify("Hello World!") -> "hello-world"
};

export const truncate = (str: string, length: number, suffix = '...'): string => {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + suffix;
    // Example: truncate("Long text here", 4) -> "Long..."
};

export const truncateMiddle = (str: string, length: number): string => {
    if (!str || str.length <= length) return str;
    const separator = '...';
    const sepLen = separator.length;
    const charsToShow = length - sepLen;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);

    return str.substring(0, frontChars) + separator + str.substring(str.length - backChars);
    // Example: truncateMiddle("1234567890", 5) -> "1...0"
};

// --- Cleaning ---

export const stripHtml = (str: string): string => {
    if (!str) return '';
    return str.replace(/<[^>]*>?/gm, '');
    // Example: stripHtml("<p>text</p>") -> "text"
};

export const removeWhitespace = (str: string): string => {
    if (!str) return '';
    return str.replace(/\s+/g, '');
    // Example: removeWhitespace("a b c") -> "abc"
};


// --- Generation ---

export const initials = (name: string): string => {
    if (!name) return '';
    return name
        .match(/(^\S\S?|\b\S)?/g)
        ?.join('')
        .match(/(^\S|\S$)?/g)
        ?.join('')
        .toUpperCase() || '';
    // Example: initials("John Doe") -> "JD"
};


export const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
    // Example: generateRandomString(8) -> "aB3kL9mN"
};
