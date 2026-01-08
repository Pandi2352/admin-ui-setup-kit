type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
    level: LogLevel;
    message: string;
    data?: any;
    timestamp: string;
}

class LoggerService {
    private isDevelopment = import.meta.env.DEV;

    private formatMessage(level: LogLevel, message: string, data?: any): LogEntry {
        return {
            level,
            message,
            data,
            timestamp: new Date().toISOString(),
        };
    }

    public info(message: string, data?: any) {
        this.log('info', message, data);
    }

    public warn(message: string, data?: any) {
        this.log('warn', message, data);
    }

    public error(message: string, data?: any) {
        this.log('error', message, data);
        // In scenarios where we have Sentry, we'd sync here:
        // if (!this.isDevelopment) Sentry.captureMessage(message, { level: 'error', extra: data });
    }

    public debug(message: string, data?: any) {
        if (this.isDevelopment) {
            this.log('debug', message, data);
        }
    }

    private log(level: LogLevel, message: string, data?: any) {
        const entry = this.formatMessage(level, message, data);

        // In production, we might want to be quieter or send to a remote logging service
        // But for now, we'll log to console with styling
        const styles = {
            info: 'color: #3b82f6', // blue
            warn: 'color: #f59e0b', // amber
            error: 'color: #ef4444; font-weight: bold', // red
            debug: 'color: #10b981', // green
        };

        console.groupCollapsed(`%c[${level.toUpperCase()}] ${message}`, styles[level]);
        console.log('Timestamp:', entry.timestamp);
        if (data) console.log('Data:', data);
        console.groupEnd();
    }
}

export const logger = new LoggerService();
