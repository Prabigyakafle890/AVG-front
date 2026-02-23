import { useQuery } from '@tanstack/react-query';
import {
  fetchDashboardOverview,
  fetchStateBreakdown,
} from '../services/dashboardApi';

export const useDashboard = () => {
  const {
    data: overviewData,
    isLoading: isOverviewLoading,
    refetch: refetchOverview,
  } = useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: fetchDashboardOverview,
    staleTime: 5 * 60 * 1000,
  });

  console.log('overviewData', overviewData);

  const {
    isLoading: isBreakdownLoading,
    error,
    data: breakdownData,
    refetch: refetchBreakdown,
  } = useQuery({
    queryKey: ['dashboard', 'breakdown'],
    queryFn: fetchStateBreakdown,
  });

  const isLoading = isOverviewLoading || isBreakdownLoading;

  const stats = {
    totalCandidates: overviewData?.total_candidates ?? 0,
    totalVets: overviewData?.total_veterinarians ?? 0,
    totalTechs: overviewData?.total_vet_techs ?? 0,
    vetsPercentage: (
      ((overviewData?.total_veterinarians ?? 0) /
        (overviewData?.total_candidates || 1)) *
      100
    ).toFixed(1),
    techsPercentage: (
      ((overviewData?.total_vet_techs ?? 0) /
        (overviewData?.total_candidates || 1)) *
      100
    ).toFixed(1),
  };

  const breakdown =
    breakdownData && Array.isArray(breakdownData)
      ? breakdownData.map((item) => ({
          state: item.state,
          total: item.total ?? 0,
          veterinarians: item.veterinarians ?? 0,
          vet_techs: item.vet_techs ?? 0,
        }))
      : [];

  return {
    overview: overviewData,
    breakdown,
    stats,
    isLoading,
    error,
    refetch: () => {
      refetchOverview();
      refetchBreakdown();
    },
  };
};
