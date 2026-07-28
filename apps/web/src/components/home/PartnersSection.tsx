const PARTNERS = [
  "Ethiopian Airlines",
  "Visa",
  "Booking.com",
  "TripAdvisor",
  "Mastercard",
  "Expedia",
];

export function PartnersSection() {
  return (
    <section className="border-y border-white/10 bg-ink-800 px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-white/40">
          Trusted By Leading Brands
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {PARTNERS.map((partner) => (
            <span
              key={partner}
              className="text-lg font-semibold text-white/40 transition hover:text-white/70"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}