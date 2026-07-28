"use client";

import { useState } from "react";
import { Calendar, Users, Search, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { useBooking } from "@/hooks/useBooking";

// TODO: replace with real branch selection once multi-branch UI exists
const DEFAULT_BRANCH_ID = "";

export function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const { results, isSearching, error, hasSearched, searchAvailability } = useBooking();

  async function handleSearch() {
    if (!checkIn || !checkOut) return;

    await searchAvailability({
      branchId: DEFAULT_BRANCH_ID,
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
          <label className="flex items-center gap-1 text-xs text-white/50">
            <Calendar size={12} /> Arrival
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1 text-xs text-white/50">
            <Calendar size={12} /> Departure
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1 text-xs text-white/50">
            <Users size={12} /> Adults
          </label>
          <input
            type="number"
            min={1}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1 text-xs text-white/50">
            <Users size={12} /> Children
          </label>
          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={!checkIn || !checkOut || isSearching}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-40"
          >
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Search
          </button>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {hasSearched && !isSearching && !error && (
        <p className="mt-4 text-sm text-white/50">
          {results.length > 0
            ? `${results.length} room${results.length === 1 ? "" : "s"} available`
            : "No rooms available for these dates"}
        </p>
      )}
    </GlassCard>
  );
}