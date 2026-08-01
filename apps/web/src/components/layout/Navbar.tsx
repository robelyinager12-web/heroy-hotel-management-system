"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, User, ChevronDown, LogOut } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { useAuthStore, restoreAuthFromStorage } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";

const NAV_LINKS = [
  { label: "Rooms", href: "/rooms" },
  { label: "Facilities", href: "/facilities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const bookNowBtn =
  "rounded-lg bg-champagne-400 px-5 py-2 text-sm font-semibold " +
  "text-navy-950 transition-all duration-200 hover:bg-champagne-300 " +
  "hover:shadow-lg hover:shadow-champagne-400/30 active:scale-95";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative py-1 text-sm transition-colors duration-200 ${
        isActive ? "text-champagne-300" : "text-platinum-300 hover:text-champagne-300"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-champagne-400 to-champagne-200 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();

  useEffect(() => {
    restoreAuthFromStorage();
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-navy-700/95 shadow-lg shadow-black/30 backdrop-blur-md"
          : "bg-navy-700 shadow-md shadow-black/20"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center text-xl font-bold">
          <GradientText className="transition-opacity duration-200 group-hover:opacity-80">
            Heroy
          </GradientText>
          <span className="text-platinum-100"> Hotel</span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-platinum-300 transition-all duration-200 hover:bg-platinum-100/5 hover:text-champagne-300"
              >
                <User size={14} />
                {user.firstName}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isAccountOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-platinum-100/10 bg-navy-800 py-1 shadow-xl shadow-black/40">
                  <div className="border-b border-platinum-100/10 px-3 py-2">
                    <p className="text-xs text-platinum-500">Signed in as</p>
                    <p className="truncate text-sm text-platinum-100">{user.email}</p>
                  </div>
                  <Link
                    href="/account/bookings"
                    onClick={() => setIsAccountOpen(false)}
                    className="block px-3 py-2 text-sm text-platinum-300 transition-colors hover:bg-champagne-400/10 hover:text-champagne-300"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      setIsAccountOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-400/10"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/account/login"
              className="group flex items-center gap-1.5 text-sm text-platinum-300 transition-colors duration-200 hover:text-champagne-300"
            >
              <User size={14} className="transition-transform duration-200 group-hover:scale-110" />
              Sign In
            </Link>
          )}

          <Link
            href="/login"
            className="group flex items-center gap-1.5 text-xs text-platinum-500 transition-colors duration-200 hover:text-platinum-300"
          >
            <LogIn size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            Staff
          </Link>

          <Link href="/rooms" className={bookNowBtn}>
            Book Now
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-platinum-100 transition-transform duration-200 active:scale-90 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4 border-t border-platinum-100/10 px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm text-platinum-300 transition-colors hover:text-champagne-300"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <p className="text-sm text-platinum-100">Hi, {user.firstName}</p>
              <Link
                href="/account/bookings"
                onClick={() => setIsOpen(false)}
                className="text-sm text-platinum-300 transition-colors hover:text-champagne-300"
              >
                My Bookings
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="text-left text-sm text-red-400"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/account/login"
              onClick={() => setIsOpen(false)}
              className="text-sm text-platinum-300 transition-colors hover:text-champagne-300"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="text-xs text-platinum-500"
          >
            Staff Login
          </Link>
        </div>
      )}
    </nav>
  );
}