import axiosInstance from '@/api/axiosInstance';
import type { AuthResponse, LoginCredentials } from '../types';

const LOGIN_URL = 'auth/login';
const LOGOUT_URL = 'auth/logout';

export const LoginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    LOGIN_URL,
    credentials
  );
  return response.data;
};

export const LogoutUser = async (): Promise<void> => {
  await axiosInstance.post(LOGOUT_URL);
};
