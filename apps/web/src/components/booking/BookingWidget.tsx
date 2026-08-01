"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Users, Search, Loader2, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { useBooking } from "@/hooks/useBooking";
import { useBranch } from "@/hooks/useBranch";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import { formatBirr } from "@/lib/currency";

export function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const { results, isSearching, error, hasSearched, searchAvailability } = useBooking();
  const { branch, isLoading: isBranchLoading } = useBranch();
  const { book, isBooking, error: bookingError, bookedRoomId, isLoggedIn } = useCreateReservation();

  async function handleSearch() {
    if (!checkIn || !checkOut || !branch) return;

    await searchAvailability({
      branchId: branch.id,
      checkInDate: new Date(checkIn).toISOString(),
      checkOutDate: new Date(checkOut).toISOString(),
      adults,
      children,
    });
  }

  async function handleBook(roomId: string) {
    if (!branch) return;

    await book({
      branchId: branch.id,
      roomId,
      checkInDate: new Date(checkIn).toISOString(),
      checkOutDate: new Date(checkOut).toISOString(),
      adults,
      children,
    });
  }

  return (
    <GlassCard className="w-full max-w-4xl p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1 text-xs text-platinum-500">
            <Calendar size={12} /> Arrival
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1 text-xs text-platinum-500">
            <Calendar size={12} /> Departure
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1 text-xs text-platinum-500">
            <Users size={12} /> Adults
          </label>
          <input
            type="number"
            min={1}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1 text-xs text-platinum-500">
            <Users size={12} /> Children
          </label>
          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={!checkIn || !checkOut || isSearching || isBranchLoading || !branch}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-champagne-400 px-4 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-champagne-300 disabled:opacity-40"
          >
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Search
          </button>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {hasSearched && !isSearching && !error && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-platinum-300">
            {results.length > 0
              ? `${results.length} room${results.length === 1 ? "" : "s"} available`
              : "No rooms fit that many guests for these dates — try a different room type or fewer guests"}
          </p>

          {!isLoggedIn && results.length > 0 && (
            <p className="rounded-lg border border-champagne-400/30 bg-champagne-400/10 px-3 py-2 text-xs text-champagne-300">
              <Link href="/account/login" className="underline">
                Sign in
              </Link>{" "}
              to complete a booking, or{" "}
              <Link href="/account/signup" className="underline">
                create an account
              </Link>
              .
            </p>
          )}

          {bookingError && <p className="text-sm text-red-400">{bookingError}</p>}

          {results.length > 0 && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {results.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-platinum-100">{room.roomType.name}</p>
                    <p className="text-xs text-platinum-500">Room {room.number}</p>
                    <p className="text-sm font-semibold text-champagne-300">
                      {formatBirr(room.roomType.basePrice)}
                    </p>
                  </div>

                  {bookedRoomId === room.id ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-400">
                      <CheckCircle2 size={14} /> Booked
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBook(room.id)}
                      disabled={isBooking || !isLoggedIn}
                      className="shrink-0 rounded-lg bg-champagne-400 px-3 py-1.5 text-xs font-semibold text-navy-950 transition hover:bg-champagne-300 disabled:opacity-40"
                    >
                      {isBooking ? <Loader2 size={12} className="animate-spin" /> : "Book Now"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
}