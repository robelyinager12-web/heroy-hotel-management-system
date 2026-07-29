import { create } from "zustand";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user, accessToken) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("heroy_token", accessToken);
      window.sessionStorage.setItem("heroy_user", JSON.stringify(user));
    }
    set({ user, accessToken });
  },
  clearAuth: () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("heroy_token");
      window.sessionStorage.removeItem("heroy_user");
    }
    set({ user: null, accessToken: null });
  },
}));

export function restoreAuthFromStorage() {
  if (typeof window === "undefined") return;
  const token = window.sessionStorage.getItem("heroy_token");
  const userRaw = window.sessionStorage.getItem("heroy_user");
  if (token && userRaw) {
    useAuthStore.getState().setAuth(JSON.parse(userRaw), token);
  }
}