import { useCallback, useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";

interface AdminGuest {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  vipStatus: boolean;
  createdAt: string;
}

export function useGuestsAdmin() {
  const [guests, setGuests] = useState<AdminGuest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const params = query ? `?search=${encodeURIComponent(query)}` : "";
      const data = await apiGet<AdminGuest[]>(`/guests${params}`);
      setGuests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load guests");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => load(search), 300);
    return () => clearTimeout(timeout);
  }, [search, load]);

  return { guests, isLoading, error, search, setSearch };
}