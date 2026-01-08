import { type ReactNode } from 'react';
import { useRole, type Role } from '../../context/RoleContext';

interface PermissionGateProps {
  children: ReactNode;
  allowedRoles: Role[];
  renderOtherwise?: ReactNode;
}

export const PermissionGate = ({ children, allowedRoles, renderOtherwise = null }: PermissionGateProps) => {
  const { hasPermission } = useRole();

  if (hasPermission(allowedRoles)) {
    return <>{children}</>;
  }

  return <>{renderOtherwise}</>;
};
