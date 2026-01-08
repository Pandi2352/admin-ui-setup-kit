import { createContext, useContext, useState, type ReactNode } from 'react';

// Role can be any string now to support dynamic roles from backend
export type Role = string;

interface User {
  id: string;
  name: string;
  role: Role;
}

interface RoleContextType {
  user: User | null;
  role: Role | null;
  switchRole: (role: Role) => void;
  hasPermission: (allowedRoles: Role[]) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Mock Data
const MOCK_USER: User = {
  id: 'u-123',
  name: 'Alex Morgan',
  role: 'admin', // Default role
};

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(MOCK_USER);

  const switchRole = (newRole: Role) => {
    setUser(prev => prev ? { ...prev, role: newRole } : null);
  };

  const hasPermission = (allowedRoles: Role[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <RoleContext.Provider value={{ user, role: user?.role || null, switchRole, hasPermission }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
