import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";
import { RoomType } from "@/types";

export function useRoomTypes() {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await apiGet<RoomType[]>("/rooms/types");
        if (!cancelled) setRoomTypes(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load rooms");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { roomTypes, isLoading, error };
}