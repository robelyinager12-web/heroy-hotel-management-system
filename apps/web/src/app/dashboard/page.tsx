"use client";

import { BedDouble, TrendingUp, CalendarCheck, DoorOpen } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { formatBirr } from "@/lib/currency";

export default function DashboardOverviewPage() {
  const { stats, isLoading, error } = useDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-platinum-100">Overview</h1>
      <p className="mt-1 text-sm text-platinum-500">Live snapshot of hotel performance</p>

      {isLoading && <p className="mt-6 text-sm text-platinum-500">Loading stats...</p>}
      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {stats && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            icon={BedDouble}
            trend={`${stats.occupiedRooms} of ${stats.totalRooms} rooms`}
          />
          <StatCard
            label="Revenue This Month"
            value={formatBirr(stats.revenueThisMonth)}
            icon={TrendingUp}
          />
          <StatCard
            label="Total Reservations"
            value={String(stats.totalReservations)}
            icon={CalendarCheck}
          />
          <StatCard
            label="Bookings Today"
            value={String(stats.checkInsToday)}
            icon={DoorOpen}
          />
        </div>
      )}
    </div>
  );
}