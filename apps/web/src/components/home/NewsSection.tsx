import { ArrowRight } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";

const NEWS = [
  {
    title: "Heroy Hotel Launches New Spa Wing",
    date: "June 2026",
    excerpt: "A brand new wellness sanctuary featuring six treatment rooms and a private sauna.",
  },
  {
    title: "Introducing Our AI Concierge",
    date: "May 2026",
    excerpt: "Guests can now book, ask questions, and get recommendations through our new AI assistant.",
  },
  {
    title: "Seasonal Menu at Heroy Restaurant",
    date: "April 2026",
    excerpt: "Our executive chef unveils a new seasonal tasting menu inspired by local ingredients.",
  },
];

const readMore =
  "mt-4 flex items-center gap-1 text-sm font-semibold " +
  "text-gold-300 transition hover:text-gold-200";

export function NewsSection() {
  return (
    <section className="bg-gradient-luxury px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-white">Latest</span> <GradientText>News</GradientText>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {NEWS.map((item) => (
            <GlassCard key={item.title} className="p-6 transition hover:border-gold-400/40">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-300">
                {item.date}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.excerpt}</p>
              <a href="#" className={readMore}>
                Read more <ArrowRight size={14} />
              </a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}