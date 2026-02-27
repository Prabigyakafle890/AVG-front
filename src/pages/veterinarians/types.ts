export type Status = 'ACTIVE' | 'INACTIVE';

export type ContactStatus =
  | 'NOT_CONTACTED'
  | 'IN_QUEUE'
  | 'CONTACTED'
  | 'FOLLOW_UP_NEEDED'
  | 'INTERVIEW_SCHEDULED'
  | 'INTERVIEW_COMPLETED'
  | 'HIRED'
  | 'NOT_INTERESTED';

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface User {
  id: number;
  fullName: string;
}

export interface Veterinarian {
  id: number;
  fullName: string;
  state: string;
  city: string;
  county: string;
  licenseProfession: string;
  licenseNumber: string;
  issueDate: string;
  expirationDate: string;
  contactStatus: ContactStatus;
  assignedTo: User;
  addedBy: User;
  email: string | null;
  phone: string | null;
  notes: string | null;
}

export interface VeterinarianDetail {
  id: number;
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  county: string;
  licenseProfession: string;
  licenseNumber: string;
  status: Status;
  issueDate: string;
  expirationDate: string;
  contactStatus: ContactStatus;
  assignedTo: User | null;
  addedBy: User;
  email: string | null;
  phone: string | null;
  notes: string | null;
  zipCode: string;
}

export interface VetListFilters {
  state?: string;
  contactStatus?: string;
  profession?: string;
  search?: string;
}

export type VeterinariansResponse = ApiResponse<
  PaginatedResponse<Veterinarian>
>;

export type VeterinarianDetailResponse = ApiResponse<VeterinarianDetail>;
