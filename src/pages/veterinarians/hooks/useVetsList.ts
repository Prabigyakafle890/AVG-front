import { useQuery } from '@tanstack/react-query';
import { fetchVeterinarians } from '../services/veterinariansApi';
import type { ApiResponse, Veterinarian } from '../types';

export const useVetsList = () => {
  const { data, isLoading, error, refetch } = useQuery<
    ApiResponse<Veterinarian>,
    Error
  >({
    queryKey: ['veterinarians', 'list'],
    queryFn: async () => {
      const res = await fetchVeterinarians();

      if (!res || !('results' in res)) {
        throw new Error('Invalid API response');
      }

      return res;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
