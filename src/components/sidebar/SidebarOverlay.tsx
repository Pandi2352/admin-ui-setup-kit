
import { useSidebar } from '../../hooks/useSidebar';

export const SidebarOverlay = () => {
    const { isOpen, setIsOpen, isMobile } = useSidebar();
    
    if (!isMobile || !isOpen) return null;
    
    return (
        <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-30 transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
        />
    );
};
