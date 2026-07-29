"use client";

import { RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { useRoomsAdmin } from "@/hooks/useRoomsAdmin";
import { formatBirr } from "@/lib/currency";

const STATUS_OPTIONS = [
  "AVAILABLE",
  "OCCUPIED",
  "RESERVED",
  "CLEANING",
  "MAINTENANCE",
  "OUT_OF_SERVICE",
];

const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "bg-green-400/15 text-green-300",
  OCCUPIED: "bg-champagne-400/15 text-champagne-300",
  RESERVED: "bg-blue-400/15 text-blue-300",
  CLEANING: "bg-purple-400/15 text-purple-300",
  MAINTENANCE: "bg-orange-400/15 text-orange-300",
  OUT_OF_SERVICE: "bg-red-400/15 text-red-300",
};

export default function DashboardRoomsPage() {
  const { rooms, isLoading, error, updateStatus, reload } = useRoomsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-platinum-100">Rooms</h1>
          <p className="mt-1 text-sm text-platinum-500">Manage room status and inventory</p>
        </div>
        <button
          onClick={reload}
          className="flex items-center gap-2 rounded-lg border border-platinum-100/10 px-3 py-2 text-sm text-platinum-300 hover:bg-platinum-100/5"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-platinum-500">Loading rooms...</p>}
      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {!isLoading && !error && (
        <GlassCard className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-platinum-100/10 text-xs uppercase text-platinum-500">
                <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Floor</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Price / Night</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Update</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="border-b border-platinum-100/5">
                  <td className="px-4 py-3 font-medium text-platinum-100">{room.number}</td>
                  <td className="px-4 py-3 text-platinum-300">{room.floor ?? "-"}</td>
                  <td className="px-4 py-3 text-platinum-300">{room.roomType.name}</td>
                  <td className="px-4 py-3 text-champagne-300">
                    {formatBirr(room.roomType.basePrice)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[room.status] || ""}`}
                    >
                      {room.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={room.status}
                      onChange={(e) => updateStatus(room.id, e.target.value)}
                      className="rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-2 py-1 text-xs text-platinum-100 outline-none"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status} className="bg-navy-800">
                          {status.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {rooms.length === 0 && (
            <p className="p-6 text-center text-sm text-platinum-500">No rooms found.</p>
          )}
        </GlassCard>
      )}
    </div>
  );
}