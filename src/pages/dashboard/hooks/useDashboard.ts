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

  return {
    overviewData,
    breakdownData,
    isLoading,
    error,
    refetch: () => {
      refetchOverview();
      refetchBreakdown();
    },
  };
};
