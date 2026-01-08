import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
  isOpen: boolean; // Mobile state (drawer open/close)
  isCollapsed: boolean; // Desktop state (collapsed/expanded)
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // 1024px as breakpoint for sidebar

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false); // Reset mobile state when moving to desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen((prev: boolean) => !prev);
    } else {
      setIsCollapsed((prev: boolean) => !prev);
    }
  };

  const collapseSidebar = () => !isMobile && setIsCollapsed(true);
  const expandSidebar = () => !isMobile && setIsCollapsed(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isCollapsed,
        toggleSidebar,
        collapseSidebar,
        expandSidebar,
        setIsOpen,
        isMobile
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
