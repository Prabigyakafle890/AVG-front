import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/auth/Login';
import { lazy, Suspense } from 'react';
import { ProtectedRoute } from './components';

const Dashboard = lazy(() => import('./pages/dashboard'));
const Veterinarians = lazy(() => import('./pages/veterinarians'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/veterinarians"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Veterinarians />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
