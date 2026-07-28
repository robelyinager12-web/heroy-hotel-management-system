import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { RoomShowcase } from "@/components/home/RoomShowcase";
import { SpecialOffers } from "@/components/home/SpecialOffers";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FacilitiesSection } from "@/components/home/FacilitiesSection";
import { PricingSection } from "@/components/home/PricingSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { NewsSection } from "@/components/home/NewsSection";
import { FaqSection } from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <RoomShowcase />
      <SpecialOffers />
      <ServicesSection />
      <FacilitiesSection />
      <PricingSection />
      <TestimonialsSection />
      <PartnersSection />
      <NewsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}