export const MESSAGES = {
    SUCCESS: {
        LOGIN: 'Welcome back!',
        LOGOUT: 'You have been logged out.',
        REGISTER: 'Account created successfully.',
        UPDATE: 'Changes saved successfully.',
        DELETE: 'Item deleted successfully.',
        COPY: 'Copied to clipboard.',
        UPLOAD: 'File uploaded successfully.',
        EMAIL_SENT: 'Email sent successfully.',
    },
    ERROR: {
        GENERIC: 'Something went wrong. Please try again.',
        NETWORK: 'Network error. Please check your connection.',
        UNAUTHORIZED: 'Session expired. Please login again.',
        FORBIDDEN: 'You do not have permission to perform this action.',
        NOT_FOUND: 'The requested resource was not found.',
        VALIDATION: 'Please check your input and try again.',
        SERVER: 'Internal server error. Please try again later.',
        UPLOAD_FAILED: 'File upload failed. Please try again.',
        FILE_TOO_LARGE: 'File is too large.',
        UNSUPPORTED_TYPE: 'Unsupported file type.',
    },
    CONFIRM: {
        DELETE: 'Are you sure you want to delete this item?',
        UNSAVED: 'You have unsaved changes. Are you sure you want to leave?',
        LOGOUT: 'Are you sure you want to logout?',
        ARCHIVE: 'Are you sure you want to archive this item?',
    },
    LOADING: {
        DEFAULT: 'Loading...',
        SAVING: 'Saving...',
        DELETING: 'Deleting...',
        UPLOADING: 'Uploading...',
        AUTHENTICATING: 'Authenticating...',
        PROCESSING: 'Processing...',
    },
    INFO: {
        NO_DATA: 'No data available.',
        NO_RESULTS: 'No results found.',
        SEARCH_PLACEHOLDER: 'Search...',
    }
} as const;
