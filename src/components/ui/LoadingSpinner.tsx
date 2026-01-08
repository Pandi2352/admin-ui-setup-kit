import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LoadingSpinnerProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullScreen?: boolean;
}

export const LoadingSpinner = ({ className, size = 'md', fullScreen = false }: LoadingSpinnerProps) => {
    
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
        xl: 'w-16 h-16 border-4',
    };

    const spinner = (
        <div className={cn(
            "animate-spin rounded-full border-gray-200 border-t-indigo-600",
            sizeClasses[size],
            className
        )} />
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    {spinner}
                    <p className="text-sm font-medium text-gray-500 animate-pulse">Loading...</p>
                </div>
            </div>
        );
    }

    return spinner;
};
