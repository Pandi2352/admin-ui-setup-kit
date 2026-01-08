
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';

export const SidebarToggle = ({ className, mobile }: { className?: string; mobile?: boolean }) => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  
  if (mobile) {
      return (
          <button 
            onClick={toggleSidebar}
            className={`p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
          >
              <Menu className="h-6 w-6" />
          </button>
      );
  }

  return (
    <button
      onClick={toggleSidebar}
      className={`p-1.5 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none shadow-sm absolute -end-3 top-20 transition-transform z-50 cursor-pointer ${className}`}
      title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
    >
      {isCollapsed ? (
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
      ) : (
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
      )}
    </button>
  );
};
