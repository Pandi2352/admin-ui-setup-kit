
import { useSidebar } from '../../hooks/useSidebar';
import { useRole } from '../../context/RoleContext';
import { SidebarItem } from './SidebarItem';
import { type SidebarItem as ISidebarItem } from './sidebar.types';
import { sidebarConfig } from './sidebar.config';
import { SidebarToggle } from './SidebarToggle';
import { SidebarOverlay } from './SidebarOverlay';
import { SidebarGroup } from './SidebarGroup';
import { Tooltip } from '../ui/Tooltip';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Sidebar = () => {
  const { isCollapsed, isOpen, isMobile } = useSidebar();
  const { hasPermission } = useRole();

  const filterItems = (items: ISidebarItem[]) => {
      return items.filter(item => {
          if (item.allowedRoles && !hasPermission(item.allowedRoles)) {
              return false;
          }
          return true;
      });
  };

  const visibleItems = filterItems(sidebarConfig.items);
  const visibleBottomItems = sidebarConfig.bottomItems ? filterItems(sidebarConfig.bottomItems) : [];

  const sidebarClasses = cn(
      "flex flex-col bg-white border-e border-gray-200 transition-all duration-300 ease-in-out h-screen",
      isMobile ? "fixed inset-y-0 start-0 z-40 w-64 shadow-2xl transform" : "sticky top-0",
      !isMobile && (isCollapsed ? "w-[70px]" : "w-64"),
      isMobile && !isOpen && "ltr:-translate-x-full rtl:translate-x-full"
  );

  return (
    <>
      <SidebarOverlay />
      <aside className={sidebarClasses}>
         {/* Logo Area */}
         <div className={cn("flex items-center h-16 border-b border-gray-100 flex-shrink-0 transition-all duration-300", isCollapsed && !isMobile ? "justify-center px-0" : "justify-between px-6")}>
             <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                <div className="bg-indigo-600 p-2 rounded-xl flex-shrink-0 shadow-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className={cn("flex flex-col transition-all duration-300 origin-left", isCollapsed && !isMobile ? "w-0 opacity-0 scale-0 hidden" : "w-auto opacity-100 scale-100")}>
                    <span className="font-bold text-lg text-gray-900 leading-none">Admin Kit</span>
                    <span className="text-xs text-indigo-500 font-semibold tracking-wide">SETUP</span>
                </div>
             </div>
         </div>

         {/* Scrollable Content */}
         <div className={cn("flex-1 overflow-y-auto overflow-x-hidden space-y-1 sidebar-scrollbar", isCollapsed && !isMobile ? "px-2 py-4" : "p-4")}>
            {visibleItems.map((item) => (
                item.isGroup ? (
                    <SidebarGroup key={item.key} label={item.label} />
                ) : (
                    <SidebarItem key={item.key} item={item} />
                )
            ))}
         </div>

         {/* Bottom Actions */}
         <div className={cn("border-t border-gray-100 space-y-1 flex-shrink-0 bg-gray-50/50", isCollapsed && !isMobile ? "p-2" : "p-4")}>
            {visibleBottomItems.map((item) => (
                <SidebarItem key={item.key} item={item} />
            ))}
             
            {/* User Profile Snippet */}
            {/* User Profile Snippet */}
             {!isCollapsed || isMobile ? (
                <div className="mt-4 flex items-center p-2 rounded-xl border border-gray-200 bg-white shadow-sm gap-3 cursor-pointer hover:border-indigo-200 transition-colors">
                    <img src="https://ui-avatars.com/api/?name=Alex+Morgan&background=6366f1&color=fff" alt="User" className="h-9 w-9 rounded-full flex-shrink-0 object-cover ring-2 ring-indigo-50" />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-gray-800 truncate">Alex Morgan</p>
                        <p className="text-xs text-gray-500 truncate">workspace@nexus.ai</p>
                    </div>
                </div>
             ) : (
                <Tooltip content="Alex Morgan" side="right">
                    <div className="mt-4 flex justify-center cursor-pointer group w-full">
                         <img src="https://ui-avatars.com/api/?name=Alex+Morgan&background=6366f1&color=fff" alt="User" className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-50 group-hover:ring-indigo-200 transition-all" />
                    </div>
                </Tooltip>
             )}
         </div>
         
         {/* Desktop Toggle Button */}
         {!isMobile && (
             <SidebarToggle />
         )}
      </aside>
    </>
  );
};
