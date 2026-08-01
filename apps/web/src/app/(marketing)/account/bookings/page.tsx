"use client";

import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";
import { useAuthStore } from "@/store/authStore";
import { useMyBookings } from "@/hooks/useMyBookings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatBirr } from "@/lib/currency";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-orange-400/15 text-orange-300",
  CONFIRMED: "bg-blue-400/15 text-blue-300",
  CHECKED_IN: "bg-champagne-400/15 text-champagne-300",
  CHECKED_OUT: "bg-green-400/15 text-green-300",
  CANCELLED: "bg-red-400/15 text-red-300",
  NO_SHOW: "bg-red-400/15 text-red-300",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function MyBookingsPage() {
  const user = useAuthStore((s) => s.user);
  const { bookings, isLoading, error } = useMyBookings();

  return (
    <main className="min-h-screen bg-gradient-luxury">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <h1 className="text-3xl font-bold">
          <span className="text-platinum-100">My</span> <GradientText>Bookings</GradientText>
        </h1>

        {isLoading ? (
          <p className="mt-6 text-sm text-platinum-500">Loading your bookings...</p>
        ) : !user ? (
          <p className="mt-6 text-sm text-platinum-500">Please sign in to view your bookings.</p>
        ) : error ? (
          <p className="mt-6 text-sm text-red-400">{error}</p>
        ) : bookings.length === 0 ? (
          <GlassCard className="mt-6 p-6">
            <p className="text-sm text-platinum-300">
              Hi {user.firstName}, you don&apos;t have any bookings yet. Head to the homepage to book your stay.
            </p>
          </GlassCard>
        ) : (
          <div className="mt-6 space-y-4">
            {bookings.map((b) => (
              <GlassCard key={b.id} className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold text-platinum-100">
                    {b.room.roomType.name} · Room {b.room.number}
                  </p>
                  <p className="mt-1 text-xs text-platinum-500">
                    {b.branch.name}, {b.branch.city}
                  </p>
                  <p className="mt-2 text-sm text-platinum-300">
                    {formatDate(b.checkInDate)} → {formatDate(b.checkOutDate)}
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[b.status] || ""}`}>
                    {b.status.replace("_", " ")}
                  </span>
                  <span className="text-lg font-bold text-champagne-300">{formatBirr(b.totalAmount)}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}