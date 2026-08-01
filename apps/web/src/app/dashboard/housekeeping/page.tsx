"use client";

import { RefreshCw, Clock, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { useHousekeepingAdmin } from "@/hooks/useHousekeepingAdmin";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardHousekeepingPage() {
  const { logs, isLoading, error, startCleaning, completeCleaning, reload } = useHousekeepingAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-platinum-100">Housekeeping</h1>
          <p className="mt-1 text-sm text-platinum-500">Pending cleaning tasks across all rooms</p>
        </div>
        <button
          onClick={reload}
          className="flex items-center gap-2 rounded-lg border border-platinum-100/10 px-3 py-2 text-sm text-platinum-300 hover:bg-platinum-100/5"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-platinum-500">Loading tasks...</p>}
      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {!isLoading && !error && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {logs.map((log) => (
            <GlassCard key={log.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-platinum-100">
                    Room {log.room.number} · Floor {log.room.floor ?? "-"}
                  </p>
                  <p className="text-xs text-platinum-500">{log.room.roomType.name}</p>
                </div>
                {log.startedAt ? (
                  <span className="flex items-center gap-1 rounded-full bg-champagne-400/15 px-2 py-1 text-xs text-champagne-300">
                    <Clock size={12} /> In Progress
                  </span>
                ) : (
                  <span className="rounded-full bg-orange-400/15 px-2 py-1 text-xs text-orange-300">
                    Pending
                  </span>
                )}
              </div>

              {log.notes && <p className="mt-3 text-sm text-platinum-300">{log.notes}</p>}

              <p className="mt-3 text-xs text-platinum-500">Requested {formatDateTime(log.createdAt)}</p>

              <div className="mt-4 flex gap-2">
                {!log.startedAt && (
                  <button
                    onClick={() => startCleaning(log.id)}
                    className="flex-1 rounded-lg border border-platinum-100/10 py-2 text-sm text-platinum-300 hover:bg-platinum-100/5"
                  >
                    Start Cleaning
                  </button>
                )}
                <button
                  onClick={() => completeCleaning(log.id)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-champagne-400 py-2 text-sm font-medium text-navy-950 hover:bg-champagne-300"
                >
                  <CheckCircle2 size={14} />
                  Mark Complete
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {!isLoading && !error && logs.length === 0 && (
        <GlassCard className="mt-6 p-6 text-center">
          <p className="text-sm text-platinum-500">No pending cleaning tasks. All rooms are up to date.</p>
        </GlassCard>
      )}
    </div>
  );
}