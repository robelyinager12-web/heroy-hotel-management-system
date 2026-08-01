import { useCallback, useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/api-client";

interface HousekeepingLog {
  id: string;
  notes: string | null;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  room: {
    number: string;
    floor: number | null;
    roomType: { name: string };
    branch: { name: string };
  };
}

export function useHousekeepingAdmin() {
  const [logs, setLogs] = useState<HousekeepingLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await apiGet<HousekeepingLog[]>("/housekeeping?completed=false");
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load housekeeping logs");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startCleaning = useCallback(
    async (id: string) => {
      await apiPost(`/housekeeping/${id}/start`, {});
      await load();
    },
    [load]
  );

  const completeCleaning = useCallback(
    async (id: string) => {
      await apiPost(`/housekeeping/${id}/complete`, {});
      await load();
    },
    [load]
  );

  return { logs, isLoading, error, startCleaning, completeCleaning, reload: load };
}