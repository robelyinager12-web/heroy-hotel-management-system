import { z } from "zod";

export const createReservationSchema = z.object({
  branchId: z.string().min(1),
  roomId: z.string().min(1),
  guestId: z.string().optional(),
  guest: z
    .object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  checkInDate: z.string().datetime(),
  checkOutDate: z.string().datetime(),
  adults: z.number().int().positive().default(1),
  children: z.number().int().min(0).default(0),
  promoCode: z.string().optional(),
  source: z.string().default("WEBSITE"),
  notes: z.string().optional(),
}).refine((data) => data.guestId || data.guest, {
  message: "Either guestId or guest details must be provided",
  path: ["guestId"],
});

export const updateReservationStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "CHECKED_IN",
    "CHECKED_OUT",
    "CANCELLED",
    "NO_SHOW",
  ]),
});

export const listReservationsQuerySchema = z.object({
  branchId: z.string().optional(),
  status: z.string().optional(),
  guestId: z.string().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
export type UpdateReservationStatusInput = z.infer<typeof updateReservationStatusSchema>;
export type ListReservationsQuery = z.infer<typeof listReservationsQuerySchema>;