"use client";

import { useEffect, useState } from "react";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";
import { useAuthStore, restoreAuthFromStorage } from "@/store/authStore";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MyBookingsPage() {
  const user = useAuthStore((s) => s.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    restoreAuthFromStorage();
    setIsChecking(false);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-luxury">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <h1 className="text-3xl font-bold">
          <span className="text-platinum-100">My</span> <GradientText>Bookings</GradientText>
        </h1>

        {isChecking ? (
          <p className="mt-6 text-sm text-platinum-500">Loading...</p>
        ) : !user ? (
          <p className="mt-6 text-sm text-platinum-500">Please sign in to view your bookings.</p>
        ) : (
          <GlassCard className="mt-6 p-6">
            <p className="text-sm text-platinum-300">
              Hi {user.firstName}, your booking history will appear here once you make a reservation.
            </p>
          </GlassCard>
        )}
      </div>
      <Footer />
    </main>
  );
}