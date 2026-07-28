import Link from "next/link";
import { GradientText } from "@/components/shared/GradientText";

const FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      { label: "Rooms", href: "/rooms" },
      { label: "Facilities", href: "/facilities" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40 px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-bold">
            <GradientText>Heroy</GradientText> <span className="text-white">Hotel</span>
          </p>
          <p className="mt-3 text-sm text-white/40">
            A sanctuary of elegance, crafted for your perfect stay.
          </p>
        </div>

        {FOOTER_LINKS.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold text-white">{column.title}</p>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 pt-6 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Heroy Hotel. All rights reserved.
      </div>
    </footer>
  );
}