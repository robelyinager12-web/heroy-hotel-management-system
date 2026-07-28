"use client";

import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";
import { useRoomTypes } from "@/hooks/useRoomTypes";

export function RoomShowcase() {
  const { roomTypes, isLoading, error } = useRoomTypes();

  return (
    <section className="bg-gradient-luxury px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <GradientText>Luxury</GradientText> <span className="text-white">Accommodations</span>
          </h2>
          <p className="mt-3 text-white/60">Handpicked rooms designed for every kind of stay</p>
        </div>

        {isLoading && <p className="text-center text-white/50">Loading rooms...</p>}

        {error && <p className="text-center text-red-400">{error}</p>}

        {!isLoading && !error && roomTypes.length === 0 && (
          <p className="text-center text-white/50">
            No room types have been added yet. Check back soon.
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roomTypes.map((room) => (
            <GlassCard key={room.id} className="overflow-hidden transition hover:border-gold-400/40">
              <div className="flex h-48 items-center justify-center bg-white/5">
                {room.imageUrls[0] ? (
                  <img
                    src={room.imageUrls[0]}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-white/30">No image yet</span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">{room.name}</h3>
                {room.description && (
                  <p className="mt-1 text-sm text-white/60 line-clamp-2">{room.description}</p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gold-300">${room.basePrice}</span>
                    <span className="text-xs text-white/50"> / night</span>
                  </div>
                  <span className="text-xs text-white/50">Up to {room.maxOccupancy} guests</span>
                </div>

                {room.amenities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}