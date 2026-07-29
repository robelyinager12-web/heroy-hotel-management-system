import type { Metadata } from "next";
import "./globals.css";
import { AiAssistantWidget } from "@/components/ai/AiAssistantWidget";

export const metadata: Metadata = {
  title: "Heroy Hotel",
  description: "Luxury hotel booking and management system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <AiAssistantWidget />
      </body>
    </html>
  );
}
