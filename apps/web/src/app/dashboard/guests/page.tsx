"use client";

import { Search, Star } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { useGuestsAdmin } from "@/hooks/useGuestsAdmin";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function DashboardGuestsPage() {
  const { guests, isLoading, error, search, setSearch } = useGuestsAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold text-platinum-100">Guests</h1>
      <p className="mt-1 text-sm text-platinum-500">Search and manage guest profiles</p>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2">
        <Search size={16} className="text-platinum-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or phone..."
          className="flex-1 bg-transparent text-sm text-platinum-100 outline-none placeholder:text-platinum-500"
        />
      </div>

      {isLoading && <p className="mt-6 text-sm text-platinum-500">Loading guests...</p>}
      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {!isLoading && !error && (
        <GlassCard className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-platinum-100/10 text-xs uppercase text-platinum-500">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">VIP</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id} className="border-b border-platinum-100/5">
                  <td className="px-4 py-3 font-medium text-platinum-100">
                    {guest.firstName} {guest.lastName}
                  </td>
                  <td className="px-4 py-3 text-platinum-300">{guest.email || "-"}</td>
                  <td className="px-4 py-3 text-platinum-300">{guest.phone || "-"}</td>
                  <td className="px-4 py-3 text-platinum-500">{formatDate(guest.createdAt)}</td>
                  <td className="px-4 py-3">
                    {guest.vipStatus && (
                      <Star size={14} className="fill-champagne-400 text-champagne-400" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {guests.length === 0 && (
            <p className="p-6 text-center text-sm text-platinum-500">No guests found.</p>
          )}
        </GlassCard>
      )}
    </div>
  );
}