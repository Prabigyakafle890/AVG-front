import axiosInstance from '@/api/axiosInstance';
import type { OverviewStats, StateBreakdown } from '../types';

const OVERVIEW_URL = 'staffs/dashboard/overview/';
const STATE_BREAKDOWN_URL = 'staffs/dashboard/state-breakdown/';

export const fetchDashboardOverview = async (): Promise<OverviewStats> => {
  const response = await axiosInstance.get<OverviewStats>(OVERVIEW_URL);
  return response.data;
};

export const fetchStateBreakdown = async (): Promise<StateBreakdown> => {
  const response = await axiosInstance.get<StateBreakdown>(STATE_BREAKDOWN_URL);
  return response.data;
};
