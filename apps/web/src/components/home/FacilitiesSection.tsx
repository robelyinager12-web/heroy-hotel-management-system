import { Utensils, Waves, Dumbbell, Sparkles as SpaIcon, Users, Wifi } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";

const FACILITIES = [
  { icon: Utensils, name: "Restaurant", description: "Fine dining with international and local cuisine" },
  { icon: SpaIcon, name: "Spa", description: "Relax with rejuvenating treatments and therapies" },
  { icon: Waves, name: "Swimming Pool", description: "Infinity pool with panoramic views" },
  { icon: Dumbbell, name: "Gym", description: "Fully equipped 24-hour fitness center" },
  { icon: Users, name: "Conference Rooms", description: "Modern spaces for meetings and events" },
  { icon: Wifi, name: "Free Wi-Fi", description: "High-speed internet throughout the property" },
];

const iconWrap =
  "mb-4 flex h-12 w-12 items-center justify-center rounded-xl " +
  "bg-champagne-400/15 text-champagne-300";

export function FacilitiesSection() {
  return (
    <section className="bg-gradient-luxury px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-platinum-100">World-Class</span> <GradientText>Facilities</GradientText>
          </h2>
          <p className="mt-3 text-platinum-300">Everything you need for a perfect stay</p>
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
    </section>
  );
}