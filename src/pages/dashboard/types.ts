export interface OverviewStats {
  totalCandidates: number;
  totalVeterinarians: number;
  totalVetTechnicians: number;
}

export interface ApiResponse<T> {
  data: T;
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
