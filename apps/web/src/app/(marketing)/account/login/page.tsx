"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";

export default function GuestLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-luxury px-6">
      <GlassCard className="w-full max-w-sm p-8">
        <h1 className="text-center text-2xl font-bold">
          <GradientText>Heroy</GradientText> <span className="text-platinum-100">Hotel</span>
        </h1>
        <p className="mt-2 text-center text-sm text-platinum-500">
          Sign in to manage your bookings
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs text-platinum-500">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-platinum-500">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-champagne-400 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-champagne-300 disabled:opacity-40"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            Sign In
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-platinum-500">
          Don&apos;t have an account?{" "}
          <Link href="/account/signup" className="text-champagne-300 hover:text-champagne-200">
            Sign up
          </Link>
        </p>
      </GlassCard>
    </main>
  );
}