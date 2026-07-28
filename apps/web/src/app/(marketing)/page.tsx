import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { RoomShowcase } from "@/components/home/RoomShowcase";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <RoomShowcase />
    </main>
  );
}