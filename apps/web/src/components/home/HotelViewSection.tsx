import { GradientText } from "@/components/shared/GradientText";
import { HotelScene } from "@/components/three/HotelScene";

export function HotelViewSection() {
  return (
    <section className="bg-gradient-luxury px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-white">Explore Our</span> <GradientText>Property</GradientText>
          </h2>
          <p className="mt-3 text-white/60">Drag to rotate and explore Heroy Hotel in 3D</p>
        </div>

        <HotelScene />
      </div>
    </section>
  );
}