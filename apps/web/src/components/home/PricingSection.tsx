import { Check } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";
import { formatBirr } from "@/lib/currency";

const PLANS = [
  {
    name: "Standard",
    price: formatBirr(4500),
    period: "/ night",
    features: ["Queen or twin bed", "Free Wi-Fi", "Daily housekeeping", "Access to pool & gym"],
    highlighted: false,
  },
  {
    name: "Deluxe",
    price: formatBirr(8200),
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
    price: formatBirr(19500),
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
  "mt-6 block w-full rounded-lg bg-champagne-400 py-2.5 text-center " +
  "text-sm font-semibold text-navy-950 transition hover:bg-champagne-300";

const secondaryCta =
  "mt-6 block w-full rounded-lg border border-platinum-100/20 py-2.5 " +
  "text-center text-sm font-semibold text-platinum-100 transition hover:bg-platinum-100/10";

export function PricingSection() {
  return (
    <section className="bg-gradient-luxury px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-platinum-100">Room</span> <GradientText>Pricing</GradientText>
          </h2>
          <p className="mt-3 text-platinum-300">Transparent rates for every kind of stay</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <GlassCard key={plan.name} className={`p-6 ${plan.highlighted ? "border-champagne-400/50" : ""}`}>
              {plan.highlighted && (
                <span className="mb-3 inline-block rounded-full bg-champagne-400/15 px-3 py-1 text-xs font-semibold text-champagne-300">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-platinum-100">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-champagne-300">{plan.price}</span>
                <span className="text-sm text-platinum-500">{plan.period}</span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-platinum-300">
                    <Check size={16} className="mt-0.5 shrink-0 text-champagne-300" />
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