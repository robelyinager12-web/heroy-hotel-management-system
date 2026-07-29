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
    <footer className="bg-navy-950 px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-bold">
            <GradientText>Heroy</GradientText> <span className="text-platinum-100">Hotel</span>
          </p>
          <p className="mt-3 text-sm text-platinum-500">
            A sanctuary of elegance, crafted for your perfect stay.
          </p>
        </div>

        {FOOTER_LINKS.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold text-platinum-100">{column.title}</p>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-platinum-300 hover:text-champagne-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-7xl pt-6 text-center text-xs text-platinum-500">
        © {new Date().getFullYear()} Heroy Hotel. All rights reserved.
      </div>
    </footer>
  );
}