import { useAuthStore } from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function authHeaders(): Record<string, string> {
  const token = useAuthStore.getState().accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Request failed");
  }

  return json.data as T;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    headers: authHeaders(),
  });
  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Request failed");
  }

  return json.data as T;
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Request failed");
  }

  return json.data as T;
}