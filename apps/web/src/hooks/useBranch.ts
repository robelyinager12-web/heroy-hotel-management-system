import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";

interface Branch {
  id: string;
  name: string;
  city: string;
}

export function useBranch() {
  const [branch, setBranch] = useState<Branch | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const rooms = await apiGet<{ branch: Branch }[]>("/rooms");
        if (!cancelled && rooms.length > 0) {
          setBranch(rooms[0].branch);
        }
      } catch {
        // silently fail — booking widget will just show no branch available
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { branch, isLoading };
}