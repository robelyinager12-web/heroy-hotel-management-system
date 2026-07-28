import { Check } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";

const PLANS = [
  {
    name: "Standard",
    price: "$120",
    period: "/ night",
    features: ["Queen or twin bed", "Free Wi-Fi", "Daily housekeeping", "Access to pool & gym"],
    highlighted: false,
  },
  {
    name: "Deluxe",
    price: "$220",
    period: "/ night",
    features: [
      "King bed with city view",
      "Complimentary breakfast",
      "Late check-out",
      "Access to spa",
      "Priority concierge",
    ],
    highlighted: true,
  },
  {
    name: "Presidential Suite",
    price: "$480",
    period: "/ night",
    features: [
      "Private terrace suite",
      "Personal butler",
      "Airport transfer included",
      "All-day dining access",
      "VIP amenities",
    ],
    highlighted: false,
  },
];

const primaryCta =
  "mt-6 block w-full rounded-lg bg-gold-400 py-2.5 text-center " +
  "text-sm font-semibold text-ink-900 transition hover:bg-gold-300";

const secondaryCta =
  "mt-6 block w-full rounded-lg border border-white/20 py-2.5 " +
  "text-center text-sm font-semibold text-white transition hover:bg-white/10";

export function PricingSection() {
  return (
    <section className="bg-gradient-luxury px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-white">Room</span> <GradientText>Pricing</GradientText>
          </h2>
          <p className="mt-3 text-white/60">Transparent rates for every kind of stay</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <GlassCard
              key={plan.name}
              className={`p-6 ${plan.highlighted ? "border-gold-400/50" : ""}`}
            >
              {plan.highlighted && (
                <span className="mb-3 inline-block rounded-full bg-gold-400/15 px-3 py-1 text-xs font-semibold text-gold-300">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gold-300">{plan.price}</span>
                <span className="text-sm text-white/50">{plan.period}</span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                    <Check size={16} className="mt-0.5 shrink-0 text-gold-300" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="/rooms" className={plan.highlighted ? primaryCta : secondaryCta}>
                Book Now
              </a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}