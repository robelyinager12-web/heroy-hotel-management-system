import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heroy Hotel — Luxury Redefined",
  description: "Book your stay at Heroy Hotel, powered by AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}