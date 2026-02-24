import axiosInstance from '@/api/axiosInstance';
import type { VeterinariansResponse } from '../types';

const VETERINARIANS_URL = 'veterinarians/list/';

export const fetchVeterinarians = async (): Promise<VeterinariansResponse> => {
  const response =
    await axiosInstance.get<VeterinariansResponse>(VETERINARIANS_URL);
  return response.data;
};
