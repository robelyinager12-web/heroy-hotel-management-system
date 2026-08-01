import { useCallback, useEffect, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api-client";

interface OrderItem {
  id: string;
  quantity: number;
  price: string;
  menuItem: { name: string };
}

interface AdminOrder {
  id: string;
  status: string;
  totalAmount: string;
  roomNumber: string | null;
  createdAt: string;
  items: OrderItem[];
}

export function useRestaurantAdmin() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await apiGet<AdminOrder[]>("/restaurant/orders");
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = useCallback(async (id: string, status: string) => {
    await apiPatch(`/restaurant/orders/${id}/status`, { status });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  return { orders, isLoading, error, updateStatus, reload: load };
}