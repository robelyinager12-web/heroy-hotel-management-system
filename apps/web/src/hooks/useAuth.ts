import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api-client";
import { useAuthStore } from "@/store/authStore";

interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

const STAFF_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "MANAGER",
  "RECEPTIONIST",
  "HOUSEKEEPING",
  "RESTAURANT",
  "CASHIER",
  "ACCOUNTANT",
];

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await apiPost<AuthResponse>("/auth/login", { email, password });
        setAuth(data.user, data.accessToken);
        router.push(STAFF_ROLES.includes(data.user.role) ? "/dashboard" : "/");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Login failed");
      } finally {
        setIsLoading(false);
      }
    },
    [setAuth, router]
  );

  const logout = useCallback(() => {
    clearAuth();
    router.push("/");
  }, [clearAuth, router]);

  return { login, logout, isLoading, error };
}