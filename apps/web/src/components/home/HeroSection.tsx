import { GradientText } from "@/components/shared/GradientText";
import { BookingWidget } from "@/components/booking/BookingWidget";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-luxury px-6 pt-24">
      {/* Ambient gradient orbs for depth */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="mb-4 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1 text-xs font-medium text-gold-400">
          Luxury Redefined
        </span>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight sm:text-6xl md:text-7xl">
          <GradientText>Experience</GradientText>
          <br />
          <span className="text-white">Unmatched Comfort</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-white/60">
          Discover a sanctuary of elegance, where every detail is crafted for your perfect stay.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          
            href="/rooms"
            className="rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Book Now
          </a>
          
            href="/rooms"
            className="rounded-lg border border-white/20 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Explore Rooms
          </a>
        </div>
      </div>

      <div className="relative z-10 mt-16 w-full max-w-4xl">
        <BookingWidget />
      </div>
    </section>
  );
}