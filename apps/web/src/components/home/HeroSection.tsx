import { GradientText } from "@/components/shared/GradientText";
import { BookingWidget } from "@/components/booking/BookingWidget";

const primaryBtn =
  "rounded-lg bg-champagne-400 px-8 py-3 text-sm font-semibold " +
  "text-navy-950 transition hover:bg-champagne-300";

const secondaryBtn =
  "rounded-lg border border-platinum-100/25 px-8 py-3 " +
  "text-sm font-semibold text-platinum-100 transition hover:bg-platinum-100/10";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-luxury px-6 pt-24">
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-navy-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-champagne-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="mb-4 rounded-full border border-champagne-400/40 bg-champagne-400/10 px-4 py-1 text-xs font-semibold text-champagne-300">
          Luxury Redefined
        </span>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight sm:text-6xl md:text-7xl">
          <GradientText>Experience</GradientText>
          <br />
          <span className="text-platinum-100">Unmatched Comfort</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-platinum-300">
          Discover a sanctuary of elegance, where every detail is crafted for your perfect stay.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/rooms" className={primaryBtn}>
            Book Now
          </a>
          <a href="/rooms" className={secondaryBtn}>
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