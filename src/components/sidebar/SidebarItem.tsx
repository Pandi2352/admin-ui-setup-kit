import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { SidebarItem as SidebarItemType } from './sidebar.types';
import { useSidebar } from '../../hooks/useSidebar';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarItemProps {
  item: SidebarItemType;
  depth?: number;
}

import { Tooltip } from '../ui/Tooltip';

// ... imports remain same but removing unused if any

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, depth = 0 }) => {
  const { isCollapsed, isMobile, setIsOpen, expandSidebar } = useSidebar();
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  // Check if this item is active
  const isActive = item.path ? location.pathname === item.path || location.pathname.startsWith(item.path + '/') : false;
  // Check if any child is active
  const isChildActive = item.children ? item.children.some(child => 
      child.path && (location.pathname === child.path || location.pathname.startsWith(child.path + '/'))
  ) : false;

  // Auto expand if child is active
  useEffect(() => {
    if (isChildActive) {
        setOpen(true);
    }
  }, [isChildActive]);

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCollapsed && !isMobile) {
        expandSidebar();
        setOpen(true);
    } else {
        setOpen(!isOpen);
    }
  };

  const handleLinkClick = () => {
    if (isMobile) setIsOpen(false);
  };

  // Common Icon/Label Rendering
  const Icon = item.icon;

  const content = (
      <>
        {Icon && <Icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", (isActive || isChildActive) ? "text-indigo-600" : "text-slate-500 group-hover:text-slate-700")} />}
        <span className={cn("ms-3 truncate transition-all duration-300 ltr:origin-left rtl:origin-right", isCollapsed && !isMobile ? "w-0 opacity-0 scale-0" : "w-auto opacity-100 scale-100")}>
            {item.label}
        </span>
        
        {/* Expand Arrow for Submenus */}
        {hasChildren && !isCollapsed && (
             <ChevronRight className={cn("h-4 w-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ms-auto rtl:rotate-180", isOpen ? "ltr:rotate-90 rtl:rotate-90" : "")} />
        )}

        {/* Badge (only if no children or if we want it next to arrow) */}
        {!hasChildren && !isCollapsed && item.badge && (
           <span className={cn("ms-auto px-2 py-0.5 rounded-full text-xs font-semibold transform", 
               item.badgeColor === 'blue' ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
           )}>
             {item.badge}
           </span>
         )}
      </>
  );

  const itemClasses = cn(
      "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 group relative cursor-pointer",
      (isActive || isChildActive) ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      depth > 0 && "ps-10"
  );

  const renderContent = () => {
      if (hasChildren) {
          return (
            <div className="mb-1">
                <button
                onClick={toggleOpen}
                className={itemClasses}
                // Removed native title to rely on custom tooltip
                >
                    {content}
                </button>
                
                <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isOpen && (!isCollapsed || isMobile) ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                    <div className="space-y-1 mt-1">
                        {item.children?.map(child => (
                            <SidebarItem key={child.key} item={child} depth={depth + 1} />
                        ))}
                    </div>
                </div>
            </div>
          );
      }

      return (
        <NavLink
            to={item.path || '#'}
            onClick={handleLinkClick}
            className={({ isActive }) => cn(itemClasses, isActive && "bg-indigo-50 text-indigo-700")}
        >
            {content}
        </NavLink>
      );
  };

  if (isCollapsed && !isMobile) {
      return (
          <Tooltip content={item.label} side="right">
              <div className="mb-1">
                   {hasChildren ? (
                       <button onClick={toggleOpen} className={cn(itemClasses, "justify-center px-2")}> 
                           {Icon && <Icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", (isActive || isChildActive) ? "text-indigo-600" : "text-slate-500 group-hover:text-slate-700")} />}
                       </button>
                   ) : (
                       <NavLink to={item.path || '#'} className={cn(itemClasses, "justify-center px-2", isActive && "bg-indigo-50 text-indigo-700")}>
                           {Icon && <Icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", isActive ? "text-indigo-600" : "text-slate-500 group-hover:text-slate-700")} />}
                       </NavLink>
                   )}
              </div>
          </Tooltip>
      );
  }

  return renderContent();
};
