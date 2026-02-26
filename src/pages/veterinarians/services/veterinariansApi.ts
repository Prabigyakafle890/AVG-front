import axiosInstance from '@/api/axiosInstance';
import type {
  VeterinariansResponse,
  VeterinarianDetailResponse,
  VeterinarianDetail,
} from '../types';

const VETERINARIANS_URL = 'veterinarians/list/';
const VETERINARIANS_EDIT_URL = 'veterinarians/update/{id}/';
const VETERINARIANS_DETAIL_URL = 'veterinarians/detail/{id}/';
const VETERINARINAS_DELETE_URL = 'veterinarians/delete/{id}';

export const fetchVeterinarians = async (): Promise<VeterinariansResponse> => {
  const response =
    await axiosInstance.get<VeterinariansResponse>(VETERINARIANS_URL);
  return response.data;
};

export const detailVeterinarians = async (
  id: number
): Promise<VeterinarianDetailResponse> => {
  const res = await axiosInstance.get<VeterinarianDetailResponse>(
    VETERINARIANS_DETAIL_URL.replace('{id}', id.toString())
  );
  return res.data;
};

export const editVeterinarians = async (
  id: number,
  payload: Partial<VeterinarianDetail>
) => {
  const result = await axiosInstance.patch(
    VETERINARIANS_EDIT_URL.replace('{id}', id.toString()),
    payload
  );
  return result.data;
};
