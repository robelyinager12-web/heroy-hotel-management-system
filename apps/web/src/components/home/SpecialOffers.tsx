import { Tag, ArrowRight } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";

const OFFERS = [
  {
    title: "Early Bird Escape",
    discount: "20% OFF",
    description: "Book 30 days in advance and save on any room type.",
    validUntil: "Limited time",
  },
  {
    title: "Weekend Getaway",
    discount: "15% OFF",
    description: "Friday to Sunday stays with complimentary breakfast.",
    validUntil: "Every weekend",
  },
  {
    title: "Extended Stay",
    discount: "25% OFF",
    description: "Stay 7 nights or more and enjoy exclusive savings.",
    validUntil: "Ongoing",
  },
];

const ctaLink =
  "mt-4 flex items-center gap-1 text-sm font-semibold " +
  "text-gold-300 transition hover:text-gold-200";

export function SpecialOffers() {
  return (
    <section className="bg-gradient-luxury px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-white">Special</span> <GradientText>Offers</GradientText>
          </h2>
          <p className="mt-3 text-white/60">Exclusive deals crafted for every kind of traveler</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {OFFERS.map((offer) => (
            <GlassCard
              key={offer.title}
              className="relative overflow-hidden p-6 transition hover:border-gold-400/40"
            >
              <div className="mb-3 flex items-center gap-2">
                <Tag size={16} className="text-gold-300" />
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-300">
                  {offer.discount}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white">{offer.title}</h3>
              <p className="mt-2 text-sm text-white/60">{offer.description}</p>
              <p className="mt-3 text-xs text-white/40">{offer.validUntil}</p>

              <a href="/rooms" className={ctaLink}>
                Book this offer <ArrowRight size={14} />
              </a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}