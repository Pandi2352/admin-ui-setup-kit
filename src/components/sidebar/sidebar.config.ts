import { LayoutDashboard, FolderKanban, Settings, LogOut, BarChart3, Users } from 'lucide-react';
import type { SidebarConfig } from './sidebar.types';
import { ROUTES } from '../../config/routes.config';

export const sidebarConfig: SidebarConfig = {
    items: [
        {
            key: 'group-main',
            label: 'Main',
            isGroup: true
        },
        {
            key: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            path: ROUTES.DASHBOARD,
        },
        {
            key: 'projects',
            label: 'Projects',
            icon: FolderKanban,
            path: ROUTES.PROJECTS.LIST,
            children: [
                {
                    key: 'project-1',
                    label: 'Project Alpha',
                    path: ROUTES.PROJECTS.DETAIL('1')
                },
                {
                    key: 'project-2',
                    label: 'Project Beta',
                    path: ROUTES.PROJECTS.DETAIL('2')
                }
            ]
        },
        {
            key: 'group-analytics',
            label: 'Analytics',
            isGroup: true
        },
        {
            key: 'analytics',
            label: 'Analytics',
            icon: BarChart3,
            path: '/analytics', // Not yet in routes config
        },
        {
            key: 'team',
            label: 'Team',
            icon: Users,
            path: ROUTES.USERS.LIST, // Using Users List for Team for now
            badge: '3',
            badgeColor: 'blue'
        }
    ],
    bottomItems: [
        {
            key: 'settings',
            label: 'Settings',
            icon: Settings,
            path: ROUTES.SETTINGS.ROOT,
            allowedRoles: ['admin'] // Only admins see this
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: LogOut,
            path: ROUTES.AUTH.LOGOUT,
        }
    ]
};
