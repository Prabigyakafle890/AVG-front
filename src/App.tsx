import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginPage } from './pages/auth/Login';
import { lazy, Suspense, useEffect } from 'react';
import { ProtectedRoute } from './components';
import { useAuthQuery } from './hooks/useAuthQuery';

const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  const { data: user } = useAuthQuery();

  const navigate = useNavigate();
  console.log('User data from useAuthQuery:', user);

  useEffect(() => {
    if (!user?.id) {
      navigate('/', { replace: true });
    } else if (user?.id) {
      navigate('/dashboard', { replace: true });
    }
  }, [user?.id]);

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
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
