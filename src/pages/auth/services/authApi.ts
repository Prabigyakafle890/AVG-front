import axiosInstance from '@/api/axiosInstance';
import type { AuthResponse, LoginCredentials, User } from '../types';

const LOGIN_URL = 'auth/login';
const LOGOUT_URL = 'auth/logout';
const PROFILE_URL = 'auth/profile';

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

export const GetCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get(PROFILE_URL);
  return response.data.data?.user as User;
};
