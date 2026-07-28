import { Car, Bell, ShieldCheck, Sparkles as CleanIcon, Plane, HeartHandshake } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";

const SERVICES = [
  { icon: Bell, name: "24/7 Concierge", description: "Round-the-clock assistance for anything you need" },
  { icon: Car, name: "Valet Parking", description: "Complimentary valet service for all guests" },
  { icon: Plane, name: "Airport Transfer", description: "Seamless pickup and drop-off arrangements" },
  { icon: CleanIcon, name: "Daily Housekeeping", description: "Meticulous cleaning throughout your stay" },
  { icon: ShieldCheck, name: "24/7 Security", description: "Round-the-clock monitoring for your safety" },
  { icon: HeartHandshake, name: "Personal Butler", description: "Available for suite and VIP guests" },
];

const iconWrap =
  "mb-4 flex h-12 w-12 items-center justify-center rounded-xl " +
  "bg-gold-400/15 text-gold-300";

export function ServicesSection() {
  return (
    <section className="bg-gradient-luxury px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-white">Our</span> <GradientText>Services</GradientText>
          </h2>
          <p className="mt-3 text-white/60">Thoughtful touches that make your stay effortless</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <GlassCard key={service.name} className="p-6 transition hover:border-gold-400/40">
                <div className={iconWrap}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                <p className="mt-1 text-sm text-white/60">{service.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}