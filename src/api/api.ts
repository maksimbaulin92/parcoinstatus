export const API_BASE = import.meta.env.VITE_API_BASE_URL;

const defaultInit: RequestInit = {};

export async function api<T>(
  path: string,
  init?: RequestInit & { parseText?: boolean },
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...defaultInit,
    ...init,
    signal: signal ?? null,
  });

  // 204 No Content
  if (res.status === 204) return undefined as T;

  // единообразные ошибки
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `${res.status} ${res.statusText}`);
  }

  if (init?.parseText) {
    return (await res.text()) as T;
  }

  return (await res.json()) as T;
}
