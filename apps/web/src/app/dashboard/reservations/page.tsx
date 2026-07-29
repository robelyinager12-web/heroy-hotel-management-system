"use client";

import { RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { useReservationsAdmin } from "@/hooks/useReservationsAdmin";
import { formatBirr } from "@/lib/currency";

const STATUS_ACTIONS: Record<string, { label: string; next: string }[]> = {
  PENDING: [
    { label: "Confirm", next: "CONFIRMED" },
    { label: "Cancel", next: "CANCELLED" },
  ],
  CONFIRMED: [
    { label: "Check In", next: "CHECKED_IN" },
    { label: "No Show", next: "NO_SHOW" },
  ],
  CHECKED_IN: [{ label: "Check Out", next: "CHECKED_OUT" }],
};

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

export default function DashboardReservationsPage() {
  const { reservations, isLoading, error, updateStatus, reload } = useReservationsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-platinum-100">Reservations</h1>
          <p className="mt-1 text-sm text-platinum-500">Manage bookings, check-ins, and check-outs</p>
        </div>
        <button
          onClick={reload}
          className="flex items-center gap-2 rounded-lg border border-platinum-100/10 px-3 py-2 text-sm text-platinum-300 hover:bg-platinum-100/5"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-platinum-500">Loading reservations...</p>}
      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {!isLoading && !error && (
        <GlassCard className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-platinum-100/10 text-xs uppercase text-platinum-500">
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Check In</th>
                <th className="px-4 py-3">Check Out</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} className="border-b border-platinum-100/5">
                  <td className="px-4 py-3">
                    <p className="font-medium text-platinum-100">
                      {r.guest.firstName} {r.guest.lastName}
                    </p>
                    {r.guest.email && <p className="text-xs text-platinum-500">{r.guest.email}</p>}
                  </td>
                  <td className="px-4 py-3 text-platinum-300">
                    {r.room.number} · {r.room.roomType.name}
                  </td>
                  <td className="px-4 py-3 text-platinum-300">{formatDate(r.checkInDate)}</td>
                  <td className="px-4 py-3 text-platinum-300">{formatDate(r.checkOutDate)}</td>
                  <td className="px-4 py-3 text-champagne-300">{formatBirr(r.totalAmount)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[r.status] || ""}`}>
                      {r.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {(STATUS_ACTIONS[r.status] || []).map((action) => (
                        <button
                          key={action.next}
                          onClick={() => updateStatus(r.id, action.next)}
                          className="rounded-lg border border-platinum-100/10 px-2 py-1 text-xs text-platinum-300 hover:bg-platinum-100/5"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {reservations.length === 0 && (
            <p className="p-6 text-center text-sm text-platinum-500">No reservations found.</p>
          )}
        </GlassCard>
      )}
    </div>
  );
}