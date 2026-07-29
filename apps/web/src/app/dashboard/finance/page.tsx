"use client";

import { Wallet, TrendingDown, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { GlassCard } from "@/components/shared/GlassCard";
import { usePaymentsAdmin } from "@/hooks/usePaymentsAdmin";
import { formatBirr } from "@/lib/currency";

const STATUS_COLORS: Record<string, string> = {
  PAID: "bg-green-400/15 text-green-300",
  PENDING: "bg-orange-400/15 text-orange-300",
  PARTIALLY_PAID: "bg-blue-400/15 text-blue-300",
  REFUNDED: "bg-red-400/15 text-red-300",
  FAILED: "bg-red-400/15 text-red-300",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function DashboardFinancePage() {
  const { payments, isLoading, error, totalRevenue, totalRefunded } = usePaymentsAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold text-platinum-100">Finance</h1>
      <p className="mt-1 text-sm text-platinum-500">Payments, revenue, and refunds</p>

      {isLoading && <p className="mt-6 text-sm text-platinum-500">Loading finance data...</p>}
      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Total Revenue" value={formatBirr(totalRevenue)} icon={TrendingUp} />
            <StatCard label="Total Refunded" value={formatBirr(totalRefunded)} icon={TrendingDown} />
            <StatCard label="Total Transactions" value={String(payments.length)} icon={Wallet} />
          </div>

          <GlassCard className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-platinum-100/10 text-xs uppercase text-platinum-500">
                  <th className="px-4 py-3">Guest</th>
                  <th className="px-4 py-3">Room</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-platinum-100/5">
                    <td className="px-4 py-3 text-platinum-100">
                      {p.reservation.guest.firstName} {p.reservation.guest.lastName}
                    </td>
                    <td className="px-4 py-3 text-platinum-300">{p.reservation.room.number}</td>
                    <td className="px-4 py-3 text-champagne-300">{formatBirr(p.amount)}</td>
                    <td className="px-4 py-3 text-platinum-300">{p.method.replace("_", " ")}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[p.status] || ""}`}>
                        {p.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-platinum-500">{formatDate(p.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {payments.length === 0 && (
              <p className="p-6 text-center text-sm text-platinum-500">No payments recorded yet.</p>
            )}
          </GlassCard>
        </>
      )}
    </div>
  );
}