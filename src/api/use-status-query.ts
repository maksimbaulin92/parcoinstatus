import { useQuery } from '@tanstack/react-query';
import { api } from './api';

export const StatusQueryKey = 'statusQueryKey';

export type PaymentSeverity = 'success' | 'warning' | 'danger' | 'info' | 'secondary';

/**
 * Платёж за последние 10 минут. Приходит только при верном админском пароле.
 */
export interface StatusPayment {
  orderId: string;
  /** paid, succeeded, pending, waiting_for_capture, canceled, error */
  status: string;
  /** короткая подпись статуса для бейджа */
  statusLabel: string;
  /** цвет карточки и бейджа (классы bootstrap) */
  severity: PaymentSeverity;
  /** понятное описание ситуации для менеджера */
  state: string;
  ticketCode: string | null;
  parkingId: number | null;
  parking: string | null;
  amountRub: number | null;
  /** ISO-дата с часовым поясом */
  createdAt: string | null;
  /** ISO-дата с часовым поясом, момент списания денег */
  paidAt: string | null;
  yooKassaId: string | null;
  deliveredToParking: boolean;
  cancellationReason: string | null;
  deliveryAttempts: number | null;
  nextDeliveryAt: string | null;
  lastDeliveryError: string | null;
}

export interface ApiStatusResponse {
  db: boolean;
  ecopark: boolean;
  cleverPark: boolean;
  rps: boolean;
  yookassa: boolean;
  payments?: StatusPayment[];
}

export const useStatusQuery = () => {
  return useQuery({
    queryKey: [StatusQueryKey],
    queryFn: () => api<ApiStatusResponse>(`/status`),
    enabled: false,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
