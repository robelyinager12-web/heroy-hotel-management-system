import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";

interface AdminPayment {
  id: string;
  amount: string;
  method: string;
  status: string;
  createdAt: string;
  reservation: {
    guest: { firstName: string; lastName: string };
    room: { number: string };
  };
}

export function usePaymentsAdmin() {
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await apiGet<AdminPayment[]>("/payments");
        if (!cancelled) setPayments(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load payments");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalRevenue = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalRefunded = payments
    .filter((p) => p.status === "REFUNDED")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return { payments, isLoading, error, totalRevenue, totalRefunded };
}