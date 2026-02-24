import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { AuthResponse, LoginCredentials } from '@/pages/auth/types';
import { LoginUser, LogoutUser } from '@/pages/auth/services/authApi';
import catchErrorResponse from '@/utils/catch-error-response';
import toast from 'react-hot-toast';
import { queryClient } from '@/main';

export const useAuth = () => {
  const navigate = useNavigate();

  const LoginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => LoginUser(credentials),

    onSuccess: (res: AuthResponse) => {
      queryClient.setQueryData(['auth', 'profile'], res.data.user);

      const welcomeName = res.data.user.firstName || res.data.user.username;
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
      queryClient.clear();
      navigate('/');
      toast.success('Logged out successfully');
    },
    onError: (error) => {
      const errorMessage = catchErrorResponse(error, 'Logout failed');
      toast.error(errorMessage);
      queryClient.clear();
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
