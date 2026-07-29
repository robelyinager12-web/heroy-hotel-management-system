import { useCallback, useEffect, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api-client";

interface AdminReservation {
  id: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: string;
  adults: number;
  children: number;
  guest: { firstName: string; lastName: string; email: string | null };
  room: { number: string; roomType: { name: string } };
}

export function useReservationsAdmin() {
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await apiGet<AdminReservation[]>("/reservations");
      setReservations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reservations");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = useCallback(async (id: string, status: string) => {
    await apiPatch(`/reservations/${id}/status`, { status });
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  return { reservations, isLoading, error, updateStatus, reload: load };
}