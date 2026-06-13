import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { StoreProvider, useSimpleStore } from './app/store/SimpleStore';
import Layout from './widgets/layout';
import ErrorBoundary from './shared/ui/ErrorBoundary';
import LoadingFallback from './shared/ui/LoadingFallback';
import ProtectedRoute from './features/auth-gate/ui/ProtectedRoute';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

const AuthApp = lazy(() => import('auth/AuthApp'));
const ClientsApp = lazy(() => import('clients/ClientsApp'));
const DealsApp = lazy(() => import('deals/DealsApp'));

const AppRoutes = () => {
  const { state, dispatch } = useSimpleStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = () => {
    const from = (location.state as { from?: { pathname?: string } })?.from?.pathname ?? '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="auth" element={
          <ErrorBoundary moduleName="Аутентификация">
            <Suspense fallback={<LoadingFallback moduleName="Аутентификация" />}>
              <AuthApp dispatch={dispatch} user={state.user} isAuthenticated={state.isAuthenticated} onLoginSuccess={handleLoginSuccess} />
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="clients" element={
          <ProtectedRoute>
            <ErrorBoundary moduleName="Клиенты">
              <Suspense fallback={<LoadingFallback moduleName="Клиенты" />}>
                <ClientsApp dispatch={dispatch} clients={state.clients} />
              </Suspense>
            </ErrorBoundary>
          </ProtectedRoute>
        } />
        <Route path="deals" element={
          <ProtectedRoute>
            <ErrorBoundary moduleName="Сделки">
              <Suspense fallback={<LoadingFallback moduleName="Сделки" />}>
                <DealsApp dispatch={dispatch} deals={state.deals} />
              </Suspense>
            </ErrorBoundary>
          </ProtectedRoute>
        } />
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StoreProvider>
);

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
createRoot(container).render(<App />);
