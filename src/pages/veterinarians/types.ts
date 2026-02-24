export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AddedBy {
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
  assignedTo: string | null;
  addedBy: AddedBy;
  email: string | null;
  phone: string | null;
  notes: string | null;
}

export type ContactStatus =
  | 'NOT_CONTACTED'
  | 'INTERVIEW_SCHEDULED'
  | 'NOT_INTERESTED'
  | 'IN_QUEUE';
