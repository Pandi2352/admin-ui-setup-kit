import { type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRole, type Role } from '../../context/RoleContext';

interface ProtectedRouteProps {
  allowedRoles: Role[];
  children?: ReactNode;
}

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { hasPermission, user } = useRole();

  if (!user) {
    // If not logged in, technically should go to login
    // For this mock, we assume user is always there, but good practice:
    return <Navigate to="/dashboard" replace />; 
  }

  if (!hasPermission(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
