import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api-client";
import { useAuthStore } from "@/store/authStore";

interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

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

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const register = useCallback(
    async (input: RegisterInput) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await apiPost<AuthResponse>("/auth/register", input);
        setAuth(data.user, data.accessToken);
        router.push("/");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
      } finally {
        setIsLoading(false);
      }
    },
    [setAuth, router]
  );

  return { register, isLoading, error };
}