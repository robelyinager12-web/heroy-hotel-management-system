"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuthStore, restoreAuthFromStorage } from "@/store/authStore";

const STAFF_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "MANAGER",
  "RECEPTIONIST",
  "HOUSEKEEPING",
  "RESTAURANT",
  "CASHIER",
  "ACCOUNTANT",
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    restoreAuthFromStorage();
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (!isChecking && (!user || !STAFF_ROLES.includes(user.role))) {
      router.push("/login");
    }
  }, [isChecking, user, router]);

  if (isChecking || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <p className="text-sm text-platinum-500">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-navy-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
