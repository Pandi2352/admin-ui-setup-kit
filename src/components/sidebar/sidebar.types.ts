import type { LucideIcon } from 'lucide-react';

export interface SidebarItem {
    key: string;
    label: string;
    icon?: LucideIcon;
    path?: string;
    children?: SidebarItem[];
    badge?: string;
    badgeColor?: 'red' | 'blue' | 'green' | 'gray';
    /**
     * Indicates if the item is a group header and should not be clickable.
     */
    isGroup?: boolean;
    /**
     * Optional: Restrict this item to specific roles.
     * If undefined, it is visible to everyone.
     */
    allowedRoles?: string[];
}

export interface SidebarConfig {
    items: SidebarItem[];
    bottomItems?: SidebarItem[];
}
