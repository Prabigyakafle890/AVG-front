// src/hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query';
import {
  fetchDashboardOverview,
  fetchStateBreakdown,
} from '../pages/auth/services/dashboardApi';

export const useDashboard = () => {
  const overviewQuery = useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: fetchDashboardOverview,
  });

  const breakdownQuery = useQuery({
    queryKey: ['dashboard', 'breakdown'],
    queryFn: fetchStateBreakdown,
  });

  const isLoading = overviewQuery.isLoading || breakdownQuery.isLoading;
  const error = overviewQuery.error || breakdownQuery.error;

  const stats = overviewQuery.data
    ? {
        totalCandidates: overviewQuery.data.total_candidates,
        totalVets: overviewQuery.data.total_veterinarians,
        totalTechs: overviewQuery.data.total_vet_techs,
        vetsPercentage: (
          (overviewQuery.data.total_veterinarians /
            overviewQuery.data.total_candidates) *
          100
        ).toFixed(1),
        techsPercentage: (
          (overviewQuery.data.total_vet_techs /
            overviewQuery.data.total_candidates) *
          100
        ).toFixed(1),
      }
    : null;

  return {
    overview: overviewQuery.data,
    breakdown: breakdownQuery.data,
    stats,
    isLoading,
    error,
    refetch: () => {
      overviewQuery.refetch();
      breakdownQuery.refetch();
    },
  };
};
