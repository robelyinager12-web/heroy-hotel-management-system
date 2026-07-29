"use client";

import { useState } from "react";
import { Calendar, Users, Search, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { useBooking } from "@/hooks/useBooking";
import { useBranch } from "@/hooks/useBranch";
import { formatBirr } from "@/lib/currency";

export function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const { results, isSearching, error, hasSearched, searchAvailability } = useBooking();
  const { branch, isLoading: isBranchLoading } = useBranch();

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
              : "No rooms available for these dates"}
          </p>

          {results.length > 0 && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {results.slice(0, 4).map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-platinum-100">{room.roomType.name}</p>
                    <p className="text-xs text-platinum-500">Room {room.number}</p>
                  </div>
                  <span className="text-sm font-semibold text-champagne-300">
                    {formatBirr(room.roomType.basePrice)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
}