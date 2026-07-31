import { useAuthStore } from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function downloadReport(
  path: string,
  params: Record<string, string>,
  filename: string
): Promise<void> {
  const token = useAuthStore.getState().accessToken;
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${API_URL}${path}?${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new Error(json?.message || "Report download failed");
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}