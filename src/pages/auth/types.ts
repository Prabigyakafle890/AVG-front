export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  fullName: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface OverviewStats {
  total_candidates: number;
  total_veterinarians: number;
  total_vet_techs: number;
  total_states?: number;
}

export interface StateBreakdown {
  state: string;
  total: number;
  veterinarians: number;
  vet_techs: number;
}
