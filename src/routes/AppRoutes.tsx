
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { Projects } from '../pages/Projects';
import { Settings } from '../pages/Settings';
import Unauthorized from '../pages/Unauthorized';
import NotFound from '../pages/NotFound';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export const AppRoutes = () => {
    return (
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
    );
};
