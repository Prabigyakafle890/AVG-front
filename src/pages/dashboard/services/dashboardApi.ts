import axiosInstance from '@/api/axiosInstance';
import type { OverviewStatsResponse, StateBreakdownResponse } from '../types';

const OVERVIEW_URL = 'staffs/dashboard/overview/';
const STATE_BREAKDOWN_URL = 'staffs/dashboard/state-breakdown/';

export const fetchDashboardOverview =
  async (): Promise<OverviewStatsResponse> => {
    const response =
      await axiosInstance.get<OverviewStatsResponse>(OVERVIEW_URL);
    return response.data;
  };

export const fetchStateBreakdown =
  async (): Promise<StateBreakdownResponse> => {
    const response =
      await axiosInstance.get<StateBreakdownResponse>(STATE_BREAKDOWN_URL);
    return response.data;
  };
