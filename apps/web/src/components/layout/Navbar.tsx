"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";

const NAV_LINKS = [
  { label: "Rooms", href: "/rooms" },
  { label: "Facilities", href: "/facilities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const bookNowBtn =
  "rounded-lg bg-gold-400 px-5 py-2 text-sm font-semibold " +
  "text-ink-900 transition hover:bg-gold-300";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-white/10 bg-ink-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          <GradientText>Heroy</GradientText>
          <span className="text-white"> Hotel</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition hover:text-gold-300"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/rooms" className={bookNowBtn}>
            Book Now
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm text-white/80"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}