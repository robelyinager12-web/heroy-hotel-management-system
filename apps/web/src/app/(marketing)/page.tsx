import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { RoomShowcase } from "@/components/home/RoomShowcase";
import { SpecialOffers } from "@/components/home/SpecialOffers";
import { FacilitiesSection } from "@/components/home/FacilitiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <RoomShowcase />
      <SpecialOffers />
      <FacilitiesSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}