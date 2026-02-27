import axiosInstance from '@/api/axiosInstance';
import type {
  VeterinariansResponse,
  VeterinarianDetailResponse,
  VeterinarianDetail,
} from '../types';

const VETERINARIANS_URL = 'veterinarians/list/';
const VETERINARIANS_EDIT_URL = 'veterinarians/update/{id}/';
const VETERINARIANS_DETAIL_URL = 'veterinarians/detail/{id}/';

export interface VetListFilters {
  state?: string;
  contactStatus?: string;
  profession?: string;
  search?: string;
}

export const fetchVeterinarians = async (
  page: number = 1,
  pageSize: number = 100,
  filters: VetListFilters = {}
): Promise<VeterinariansResponse> => {
  const params: Record<string, string | number> = {
    page,
    page_size: pageSize,
  };

  if (filters.state && filters.state !== 'all') {
    params.state = filters.state;
  }
  if (filters.contactStatus && filters.contactStatus !== 'all') {
    params.contact_status = filters.contactStatus;
  }
  if (filters.profession && filters.profession !== 'all') {
    params.license_profession = filters.profession;
  }
  if (filters.search) {
    params.search = filters.search;
  }

  const response = await axiosInstance.get<VeterinariansResponse>(
    VETERINARIANS_URL,
    { params }
  );
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
