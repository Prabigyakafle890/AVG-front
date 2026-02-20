import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, type AuthState } from '@/store/authStore';
import type { AuthResponse, LoginCredentials } from '@/pages/auth/types';
import { LoginUser, LogoutUser } from '@/pages/auth/services/authApi';
import catchErrorResponse from '@/utils/catch-error-response';

import toast from 'react-hot-toast';

export const useAuth = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state: AuthState) => state.setAuthData);
  const setLogout = useAuthStore((state: AuthState) => state.logout);

  const LoginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => LoginUser(credentials),

    onSuccess: (data: AuthResponse) => {
      setAuth(data.user);

      const welcomeName = data.user.firstName || data.user.username;
      toast.success(`Welcome back, ${welcomeName}!`);

      navigate('/dashboard');
    },

    onError: (error) => {
      const errorMessage = catchErrorResponse(
        error,
        'Login failed. Please check your credentials and try again.'
      );
      toast.error(errorMessage);
    },
  });

  const LogoutMutation = useMutation({
    mutationFn: LogoutUser,
    onSuccess: () => {
      setLogout();
      navigate('/');
      toast.success('Logged out successfully');
    },
    onError: (error) => {
      const errorMessage = catchErrorResponse(error, 'Logout failed');
      toast.error(errorMessage);
      setLogout();
      navigate('/');
    },
  });

  return {
    login: LoginMutation.mutate,
    logout: LogoutMutation.mutate,
    isPending: LoginMutation.isPending || LogoutMutation.isPending,
    error: LoginMutation.error,
  };
};
