"use client";

import { useState } from "react";
import { FileText, FileSpreadsheet, Loader2, TrendingUp, BedDouble } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { useReportDownload } from "@/hooks/useReportDownload";

function getDefaultRange() {
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return {
    from: firstOfMonth.toISOString().slice(0, 10),
    to: now.toISOString().slice(0, 10),
  };
}

export default function ReportsPage() {
  const defaults = getDefaultRange();
  const [from, setFrom] = useState(defaults.from);
  const [to, setTo] = useState(defaults.to);
  const { download, isDownloading, error } = useReportDownload();

  return (
    <div>
      <h1 className="text-2xl font-bold text-platinum-100">Reports</h1>
      <p className="mt-1 text-sm text-platinum-500">Generate and download hotel performance reports</p>

      <GlassCard className="mt-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs text-platinum-500">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-1 w-full rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-platinum-500">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1 w-full rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      </GlassCard>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-champagne-400/15 text-champagne-300">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-platinum-100">Revenue Report</h3>
              <p className="text-xs text-platinum-500">Payments, totals, and reservation detail</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => download("revenue", "pdf", from, to)}
              disabled={isDownloading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-platinum-100/10 py-2 text-sm text-platinum-300 transition hover:bg-platinum-100/5 disabled:opacity-40"
            >
              {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
              PDF
            </button>
            <button
              onClick={() => download("revenue", "excel", from, to)}
              disabled={isDownloading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-platinum-100/10 py-2 text-sm text-platinum-300 transition hover:bg-platinum-100/5 disabled:opacity-40"
            >
              {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <FileSpreadsheet size={14} />}
              Excel
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-champagne-400/15 text-champagne-300">
              <BedDouble size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-platinum-100">Occupancy Report</h3>
              <p className="text-xs text-platinum-500">Room status and occupancy breakdown</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => download("occupancy", "pdf", from, to)}
              disabled={isDownloading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-platinum-100/10 py-2 text-sm text-platinum-300 transition hover:bg-platinum-100/5 disabled:opacity-40"
            >
              {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
              PDF
            </button>
            <button
              onClick={() => download("occupancy", "excel", from, to)}
              disabled={isDownloading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-platinum-100/10 py-2 text-sm text-platinum-300 transition hover:bg-platinum-100/5 disabled:opacity-40"
            >
              {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <FileSpreadsheet size={14} />}
              Excel
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}