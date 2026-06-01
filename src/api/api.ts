export const API_BASE = "https://localhost:7000";

const defaultInit: RequestInit = { credentials: "include" };

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
    const text = await res.text().catch(() => "");
    throw new Error(text || `${res.status} ${res.statusText}`);
  }

  if (init?.parseText) {
    return (await res.text()) as T;
  }

  return (await res.json()) as T;
}

//POST FILE
export const postFile = async <TRes>(
  path: string,
  formData: FormData,
  init?: RequestInit
): Promise<TRes> => {
  return api<TRes>(path, {
    method: "POST",
    body: formData,
    parseText: true,
    ...init,
  });
};

// POST
export const post = <TReq, TRes>(
  path: string,
  body: TReq,
  init?: RequestInit
) =>
  api<TRes>(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
    ...init,
  });