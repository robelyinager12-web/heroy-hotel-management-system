import { z } from "zod";

export const createRoomTypeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  basePrice: z.number().positive(),
  maxOccupancy: z.number().int().positive(),
  amenities: z.array(z.string()).default([]),
  imageUrls: z.array(z.string()).default([]),
});

export const updateRoomTypeSchema = createRoomTypeSchema.partial();

export const createRoomSchema = z.object({
  branchId: z.string().min(1),
  roomTypeId: z.string().min(1),
  number: z.string().min(1),
  floor: z.number().int().optional(),
});

export const updateRoomSchema = createRoomSchema.partial();

export const updateRoomStatusSchema = z.object({
  status: z.enum([
    "AVAILABLE",
    "OCCUPIED",
    "RESERVED",
    "CLEANING",
    "MAINTENANCE",
    "OUT_OF_SERVICE",
  ]),
});

export const checkAvailabilitySchema = z.object({
  branchId: z.string().min(1),
  checkInDate: z.string().datetime(),
  checkOutDate: z.string().datetime(),
  roomTypeId: z.string().optional(),
  adults: z.number().int().positive().default(1),
  children: z.number().int().min(0).default(0),
});

export type CreateRoomTypeInput = z.infer<typeof createRoomTypeSchema>;
export type UpdateRoomTypeInput = z.infer<typeof updateRoomTypeSchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
export type UpdateRoomStatusInput = z.infer<typeof updateRoomStatusSchema>;
export type CheckAvailabilityInput = z.infer<typeof checkAvailabilitySchema>;