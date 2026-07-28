import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { RoomShowcase } from "@/components/home/RoomShowcase";
import { FacilitiesSection } from "@/components/home/FacilitiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <RoomShowcase />
      <FacilitiesSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}