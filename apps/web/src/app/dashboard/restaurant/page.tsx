"use client";

import { RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { useRestaurantAdmin } from "@/hooks/useRestaurantAdmin";
import { formatBirr } from "@/lib/currency";

const STATUS_FLOW: Record<string, { label: string; next: string }[]> = {
  PENDING: [{ label: "Start Preparing", next: "PREPARING" }],
  PREPARING: [{ label: "Mark Ready", next: "READY" }],
  READY: [{ label: "Mark Served", next: "SERVED" }],
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-orange-400/15 text-orange-300",
  PREPARING: "bg-blue-400/15 text-blue-300",
  READY: "bg-champagne-400/15 text-champagne-300",
  SERVED: "bg-green-400/15 text-green-300",
  CANCELLED: "bg-red-400/15 text-red-300",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardRestaurantPage() {
  const { orders, isLoading, error, updateStatus, reload } = useRestaurantAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-platinum-100">Restaurant</h1>
          <p className="mt-1 text-sm text-platinum-500">Live orders from guests and room service</p>
        </div>
        <button
          onClick={reload}
          className="flex items-center gap-2 rounded-lg border border-platinum-100/10 px-3 py-2 text-sm text-platinum-300 hover:bg-platinum-100/5"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-platinum-500">Loading orders...</p>}
      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {!isLoading && !error && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <GlassCard key={order.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-platinum-100">
                    {order.roomNumber ? `Room ${order.roomNumber}` : "Walk-in"}
                  </p>
                  <p className="text-xs text-platinum-500">{formatDateTime(order.createdAt)}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[order.status] || ""}`}>
                  {order.status}
                </span>
              </div>

              <ul className="mt-3 space-y-1">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm text-platinum-300">
                    <span>
                      {item.quantity}× {item.menuItem.name}
                    </span>
                    <span>{formatBirr(Number(item.price) * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-between border-t border-platinum-100/10 pt-3">
                <span className="text-sm text-platinum-500">Total</span>
                <span className="font-semibold text-champagne-300">{formatBirr(order.totalAmount)}</span>
              </div>

              {(STATUS_FLOW[order.status] || []).length > 0 && (
                <div className="mt-4 flex gap-2">
                  {STATUS_FLOW[order.status].map((action) => (
                    <button
                      key={action.next}
                      onClick={() => updateStatus(order.id, action.next)}
                      className="flex-1 rounded-lg bg-champagne-400 py-2 text-sm font-medium text-navy-950 hover:bg-champagne-300"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      )}

      {!isLoading && !error && orders.length === 0 && (
        <GlassCard className="mt-6 p-6 text-center">
          <p className="text-sm text-platinum-500">No orders yet.</p>
        </GlassCard>
      )}
    </div>
  );
}