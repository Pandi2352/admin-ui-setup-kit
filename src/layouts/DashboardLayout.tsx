import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Header } from '../components/header/Header';

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
         <Header />
         
         <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
             <div className="max-w-7xl mx-auto w-full">
                <Outlet />
             </div>
         </div>
      </main>
    </div>
  );
};
