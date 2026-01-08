import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';
import { RoleProvider } from './context/RoleContext';
import { AppRoutes } from './routes/AppRoutes';
import { ErrorBoundary } from './components/common/ErrorBoundary';

import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <RoleProvider>
          <SidebarProvider>
              <AppRoutes />
              <Toaster />
          </SidebarProvider>
        </RoleProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
