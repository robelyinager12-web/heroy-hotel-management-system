import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";
import { useAuthStore } from "@/store/authStore";

interface MyBooking {
  id: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: string;
  room: { number: string; roomType: { name: string; imageUrls: string[] } };
  branch: { name: string; city: string };
}

export function useMyBookings() {
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const data = await apiGet<MyBooking[]>("/reservations/mine");
        if (!cancelled) setBookings(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load bookings");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { bookings, isLoading, error };
}