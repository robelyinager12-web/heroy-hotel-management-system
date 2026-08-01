import { useState, useCallback } from "react";
import { apiPost, apiGet } from "@/lib/api-client";
import { useAuthStore } from "@/store/authStore";

interface CreateReservationParams {
  branchId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
}

export function useCreateReservation() {
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookedRoomId, setBookedRoomId] = useState<string | null>(null);
  const user = useAuthStore((s) => s.user);

  const book = useCallback(
    async (params: CreateReservationParams) => {
      if (!user) {
        setError("Please sign in to complete your booking");
        return false;
      }

      setIsBooking(true);
      setError(null);

      try {
        const { guestId } = await apiGet<{ guestId: string }>("/auth/my-guest-profile");

        await apiPost("/reservations", {
          ...params,
          guestId,
        });

        setBookedRoomId(params.roomId);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Booking failed");
        return false;
      } finally {
        setIsBooking(false);
      }
    },
    [user]
  );

  return { book, isBooking, error, bookedRoomId, isLoggedIn: !!user };
}