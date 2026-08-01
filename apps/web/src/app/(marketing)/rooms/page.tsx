"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { useRoomTypes } from "@/hooks/useRoomTypes";
import { formatBirr } from "@/lib/currency";

export default function RoomsPage() {
  const { roomTypes, isLoading, error } = useRoomTypes();

  return (
    <main className="min-h-screen bg-gradient-luxury">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 pt-32 pb-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">
            <GradientText>Our</GradientText> <span className="text-platinum-100">Rooms</span>
          </h1>
          <p className="mt-3 text-platinum-300">
            Every room at Heroy Hotel is crafted for comfort, style, and rest
          </p>
        </div>

        <BookingWidget />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24">
        {isLoading && <p className="mt-6 text-center text-platinum-500">Loading rooms...</p>}
        {error && <p className="mt-6 text-center text-red-400">{error}</p>}

        {!isLoading && !error && roomTypes.length === 0 && (
          <p className="mt-6 text-center text-platinum-500">
            No room types have been added yet. Check back soon.
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roomTypes.map((room) => (
            <GlassCard
              key={room.id}
              className="overflow-hidden transition hover:border-champagne-400/40"
            >
              <div className="flex h-52 items-center justify-center bg-platinum-100/5">
                {room.imageUrls[0] ? (
                  <img
                    src={room.imageUrls[0]}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-platinum-500">No image yet</span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-platinum-100">{room.name}</h3>
                {room.description && (
                  <p className="mt-1 text-sm text-platinum-300">{room.description}</p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-champagne-300">
                      {formatBirr(room.basePrice)}
                    </span>
                    <span className="text-xs text-platinum-500"> / night</span>
                  </div>
                  <span className="text-xs text-platinum-500">
                    Up to {room.maxOccupancy} guests
                  </span>
                </div>

                {room.amenities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {room.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full bg-platinum-100/10 px-2 py-0.5 text-xs text-platinum-300"
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

      <Footer />
    </main>
  );
}