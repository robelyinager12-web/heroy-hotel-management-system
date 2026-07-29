"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Wallet,
  LogOut,
} from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Rooms", href: "/dashboard/rooms", icon: BedDouble },
  { label: "Reservations", href: "/dashboard/reservations", icon: CalendarCheck },
  { label: "Finance", href: "/dashboard/finance", icon: Wallet },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-platinum-100/10 bg-navy-900 px-4 py-6">
      <div className="mb-8 px-2">
        <p className="text-lg font-bold">
          <GradientText>Heroy</GradientText> <span className="text-platinum-100">Admin</span>
        </p>
        {user && (
          <p className="mt-1 text-xs text-platinum-500">
            {user.firstName} {user.lastName} · {user.role}
          </p>
        )}
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-champagne-400/15 text-champagne-300"
                  : "text-platinum-300 hover:bg-platinum-100/5 hover:text-platinum-100"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-platinum-500 transition hover:bg-platinum-100/5 hover:text-red-400"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </aside>
  );
}