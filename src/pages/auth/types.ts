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
  data: {
    user: User;
  };
}
