import { useSidebar } from '../../hooks/useSidebar';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarGroupProps {
  label: string;
}

export const SidebarGroup = ({ label }: SidebarGroupProps) => {
  const { isCollapsed, isMobile } = useSidebar();
  
  // Hide group header if collapsed (except if mobile open, but mobile logic relies on isOpen)
  // If isCollapsed is true on desktop, we usually hide the text unless we want a divider.
  
  const showLabel = !isCollapsed || isMobile;

  if (!showLabel) {
       return (
           <div className="my-2 border-t border-gray-100 mx-2" />
       );
  }

  return (
    <div className={cn("px-4 py-2 mt-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider transition-opacity duration-300", !showLabel ? "opacity-0 h-0 overflow-hidden" : "opacity-100")}>
      {label}
    </div>
  );
};
