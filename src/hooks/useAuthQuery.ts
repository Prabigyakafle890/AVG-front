import { useQuery } from '@tanstack/react-query';
import { GetCurrentUser } from '@/pages/auth/services/authApi';

export const useAuthQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: GetCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  return { data, isLoading };
};
