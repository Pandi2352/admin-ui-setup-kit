import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Lazy load pages
const Dashboard = lazy(() => import('../pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Projects = lazy(() => import('../pages/Projects').then(module => ({ default: module.Projects })));
const Settings = lazy(() => import('../pages/Settings').then(module => ({ default: module.Settings })));

// Default exports don't need the .then mapping if they are default exports
const Unauthorized = lazy(() => import('../pages/Unauthorized'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:id" element={<Projects />} />
                    
                    {/* Protected Route Example: Only Admins can access Settings */}
                    <Route path="settings" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Settings />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="team" element={<div className="p-8"><h1 className="text-2xl font-bold">Team</h1><p>Team management placeholder.</p></div>} />
                    <Route path="analytics" element={<div className="p-8"><h1 className="text-2xl font-bold">Analytics</h1><p>Analytics placeholder.</p></div>} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Suspense>
    );
};
