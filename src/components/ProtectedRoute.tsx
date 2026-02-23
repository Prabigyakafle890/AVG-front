import { Navigate, Outlet } from 'react-router-dom';
import { useAuthQuery } from '@/hooks/useAuthQuery';

const ProtectedRoute = () => {
  const { data: user, isLoading } = useAuthQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user?.id || !user?.username) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
