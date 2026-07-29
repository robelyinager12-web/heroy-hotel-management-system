import { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

export function StatCard({ label, value, icon: Icon, trend }: StatCardProps) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-platinum-500">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-champagne-400/15 text-champagne-300">
          <Icon size={16} />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-platinum-100">{value}</p>
      {trend && <p className="mt-1 text-xs text-platinum-500">{trend}</p>}
    </GlassCard>
  );
}