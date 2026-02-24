import axiosInstance from '@/api/axiosInstance';
import type { ApiResponse, Veterinarian } from '../types';

const VETERINARIANS_URL = 'veterinarians/list/';

export const fetchVeterinarians = async (): Promise<
  ApiResponse<Veterinarian>
> => {
  const response =
    await axiosInstance.get<ApiResponse<Veterinarian>>(VETERINARIANS_URL);
  return response.data;
};
