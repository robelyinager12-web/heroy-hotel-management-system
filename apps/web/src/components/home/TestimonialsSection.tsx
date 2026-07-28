import { Star } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";

const TESTIMONIALS = [
  {
    name: "Amara T.",
    location: "Addis Ababa",
    quote:
      "The service was impeccable from check-in to check-out. Every staff member went above and beyond.",
    rating: 5,
  },
  {
    name: "James R.",
    location: "London",
    quote:
      "Stunning rooms, incredible restaurant, and the AI assistant made booking a follow-up reservation effortless.",
    rating: 5,
  },
  {
    name: "Sofia M.",
    location: "Madrid",
    quote: "A perfect blend of modern comfort and warm hospitality. I'll definitely be back.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-gradient-luxury px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-white">What Our</span>{" "}
            <GradientText>Guests Say</GradientText>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <GlassCard key={t.name} className="p-6">
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-sm text-white/70">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/40">{t.location}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}