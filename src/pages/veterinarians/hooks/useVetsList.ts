import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchVeterinarians,
  detailVeterinarians,
  editVeterinarians,
} from '../services/veterinariansApi';
import type { VeterinarianDetail, VetListFilters } from '../types';

export const useVetsList = (
  page: number = 1,
  pageSize: number = 100,
  filters: VetListFilters = {}
) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['veterinarians', 'list', page, pageSize, filters],
    queryFn: () => fetchVeterinarians(page, pageSize, filters),
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};

export const useDetailVeterinarians = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['veterinarians', 'detail', id],
    queryFn: ({ queryKey }) => {
      const [, , id] = queryKey;
      return detailVeterinarians(id as number);
    },
  });
  return {
    data,
    isLoading,
  };
};

export const useEditVeterinarians = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<VeterinarianDetail>;
    }) => editVeterinarians(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['veterinarians', 'list'] });
      queryClient.invalidateQueries({
        queryKey: ['veterinarians', 'detail', variables.id],
      });
    },
  });
};
