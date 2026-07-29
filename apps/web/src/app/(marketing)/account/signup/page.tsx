"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRegister } from "@/hooks/useRegister";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";

export default function GuestSignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useRegister();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    register({ firstName, lastName, email, password });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-luxury px-6">
      <GlassCard className="w-full max-w-sm p-8">
        <h1 className="text-center text-2xl font-bold">
          <GradientText>Heroy</GradientText> <span className="text-platinum-100">Hotel</span>
        </h1>
        <p className="mt-2 text-center text-sm text-platinum-500">
          Create an account to book faster and track your stays
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-platinum-500">First name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-platinum-500">Last name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
              />
            </div>
          </div>

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
              minLength={8}
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
            Create Account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-platinum-500">
          Already have an account?{" "}
          <Link href="/account/login" className="text-champagne-300 hover:text-champagne-200">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </main>
  );
}