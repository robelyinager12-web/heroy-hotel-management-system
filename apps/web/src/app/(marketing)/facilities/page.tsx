import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";
import { Utensils, Waves, Dumbbell, Sparkles as SpaIcon, Users, Wifi, Car, Bell } from "lucide-react";

const FACILITIES = [
  { icon: Utensils, name: "Restaurant", description: "Fine dining with international and local cuisine, open all day for breakfast, lunch, and dinner." },
  { icon: SpaIcon, name: "Spa", description: "Full-service spa offering massages, facials, and rejuvenating body treatments." },
  { icon: Waves, name: "Swimming Pool", description: "Infinity pool with panoramic city views, open from sunrise to sunset." },
  { icon: Dumbbell, name: "Gym", description: "Fully equipped 24-hour fitness center with modern cardio and strength equipment." },
  { icon: Users, name: "Conference Rooms", description: "Modern meeting and event spaces equipped for business gatherings of any size." },
  { icon: Wifi, name: "Free Wi-Fi", description: "High-speed internet access throughout the entire property, at no extra cost." },
  { icon: Car, name: "Valet Parking", description: "Complimentary valet parking service available for all hotel guests." },
  { icon: Bell, name: "24/7 Concierge", description: "Round-the-clock concierge service ready to assist with any request." },
];

const iconWrap =
  "mb-4 flex h-12 w-12 items-center justify-center rounded-xl " +
  "bg-champagne-400/15 text-champagne-300";

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-gradient-luxury">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold">
            <span className="text-platinum-100">World-Class</span>{" "}
            <GradientText>Facilities</GradientText>
          </h1>
          <p className="mt-3 text-platinum-300">
            Everything you need for a perfect stay, all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((facility) => {
            const Icon = facility.icon;
            return (
              <GlassCard key={facility.name} className="p-6 transition hover:border-champagne-400/40">
                <div className={iconWrap}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-platinum-100">{facility.name}</h3>
                <p className="mt-1 text-sm text-platinum-300">{facility.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}