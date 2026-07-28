import { useState, useCallback } from "react";
import { apiPost } from "@/lib/api-client";
import { AvailabilityRoom } from "@/types";

interface AvailabilitySearch {
  branchId: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
}

export function useBooking() {
  const [results, setResults] = useState<AvailabilityRoom[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchAvailability = useCallback(async (params: AvailabilitySearch) => {
    setIsSearching(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await apiPost<AvailabilityRoom[]>("/rooms/availability", params);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  return { results, isSearching, error, hasSearched, searchAvailability };
}