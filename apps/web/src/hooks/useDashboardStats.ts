import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";

interface Room {
  id: string;
  status: string;
}

interface Reservation {
  id: string;
  status: string;
  totalAmount: string;
  createdAt: string;
}

interface DashboardStats {
  totalRooms: number;
  occupiedRooms: number;
  occupancyRate: number;
  totalReservations: number;
  revenueThisMonth: number;
  checkInsToday: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [rooms, reservations] = await Promise.all([
          apiGet<Room[]>("/rooms"),
          apiGet<Reservation[]>("/reservations"),
        ]);

        if (cancelled) return;

        const occupiedRooms = rooms.filter((r) => r.status === "OCCUPIED").length;
        const now = new Date();
        const thisMonthRevenue = reservations
          .filter((r) => {
            const created = new Date(r.createdAt);
            return (
              created.getMonth() === now.getMonth() &&
              created.getFullYear() === now.getFullYear() &&
              r.status !== "CANCELLED"
            );
          })
          .reduce((sum, r) => sum + Number(r.totalAmount), 0);

        const today = now.toDateString();
        const checkInsToday = reservations.filter(
          (r) => new Date(r.createdAt).toDateString() === today
        ).length;

        setStats({
          totalRooms: rooms.length,
          occupiedRooms,
          occupancyRate: rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0,
          totalReservations: reservations.length,
          revenueThisMonth: thisMonthRevenue,
          checkInsToday,
        });
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load stats");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, isLoading, error };
}