export const getTime = (date: Date) => {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getTimeWithSeconds = (date: Date) => {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatRub = (amount: number | null) => {
  if (amount === null) {
    return '—';
  }
  return `${amount.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽`;
};

/**
 * Причины отмены платежа от ЮKassы.
 */
const cancellationReasons: Record<string, string> = {
  insufficient_funds: 'недостаточно средств',
  '3d_secure_failed': 'не пройдено подтверждение 3DS',
  card_expired: 'истёк срок действия карты',
  invalid_card_number: 'неверный номер карты',
  invalid_csc: 'неверный CVC',
  country_forbidden: 'карта выпущена в запрещённой стране',
  fraud_suspected: 'подозрение на мошенничество',
  call_issuer: 'банк отклонил, клиенту нужно позвонить в банк',
  payment_method_restricted: 'операции по карте ограничены',
  expired_on_confirmation: 'клиент не подтвердил оплату вовремя',
  general_decline: 'банк отклонил без объяснения причины',
  internal_timeout: 'технические неполадки в ЮKassе',
};

export const getCancellationReason = (reason: string) => cancellationReasons[reason] ?? reason;
