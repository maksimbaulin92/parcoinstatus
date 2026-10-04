import { useAdminStore } from '../store/admin-store';

export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const ADMIN_PASSWORD_HEADER = 'X-Admin-Password';

const defaultInit: RequestInit = {};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function api<T>(
  path: string,
  init?: RequestInit & { parseText?: boolean },
  signal?: AbortSignal
): Promise<T> {
  // админский пароль уходит с каждым запросом, если введён
  const headers = new Headers(init?.headers);
  const adminPassword = useAdminStore.getState().adminPassword;
  if (adminPassword) {
    headers.set(ADMIN_PASSWORD_HEADER, adminPassword);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...defaultInit,
    ...init,
    headers,
    signal: signal ?? null,
  });

  // 204 No Content
  if (res.status === 204) return undefined as T;

  // единообразные ошибки
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new ApiError(res.status, text || `${res.status} ${res.statusText}`);
  }

  if (init?.parseText) {
    return (await res.text()) as T;
  }

  return (await res.json()) as T;
}
