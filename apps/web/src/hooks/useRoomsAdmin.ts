import { useCallback, useEffect, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api-client";

interface AdminRoom {
  id: string;
  number: string;
  floor: number | null;
  status: string;
  roomType: { id: string; name: string; basePrice: string };
  branch: { id: string; name: string };
}

export function useRoomsAdmin() {
  const [rooms, setRooms] = useState<AdminRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await apiGet<AdminRoom[]>("/rooms");
      setRooms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rooms");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = useCallback(async (roomId: string, status: string) => {
    await apiPatch(`/rooms/${roomId}/status`, { status });
    setRooms((prev) => prev.map((r) => (r.id === roomId ? { ...r, status } : r)));
  }, []);

  return { rooms, isLoading, error, updateStatus, reload: load };
}