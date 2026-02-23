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
