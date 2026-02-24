export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface OverviewStats {
  totalCandidates: number;
  totalVeterinarians: number;
  totalVetTechnicians: number;
}

type StateBreakdownItem = {
  state: string;
  totalCandidates: number;
  totalVeterinarians: number;
  totalVetTechnicians: number;
};

export interface StateBreakdown {
  stateBreakdown: StateBreakdownItem[];
}

export type OverviewStatsResponse = ApiResponse<OverviewStats>;
export type StateBreakdownResponse = ApiResponse<StateBreakdown>;
