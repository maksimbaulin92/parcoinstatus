import { useQuery } from '@tanstack/react-query';
import { api } from './api';

export const StatusQueryKey = 'statusQueryKey';

export interface ApiStatusResponse {
  db: boolean;
  ecopark: boolean;
  cleverPark: boolean;
  rps: boolean;
  yookassa: boolean;
}

export const useStatusQuery = () => {
  return useQuery({
    queryKey: [StatusQueryKey],
    queryFn: () => api<ApiStatusResponse>(`/status`),
    enabled: true,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
