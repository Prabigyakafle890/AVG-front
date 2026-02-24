import { useQuery } from '@tanstack/react-query';
import { fetchVeterinarians } from '../services/veterinariansApi';

export const useVetsList = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['veterinarians', 'list'],
    queryFn: fetchVeterinarians,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
