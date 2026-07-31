import { z } from "zod";

export const createGuestSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  nationalId: z.string().optional(),
  nationality: z.string().optional(),
  dateOfBirth: z.string().datetime().optional(),
  vipStatus: z.boolean().default(false),
});

export const updateGuestSchema = createGuestSchema.partial();

export const listGuestsQuerySchema = z.object({
  search: z.string().optional(),
  vipStatus: z.enum(["true", "false"]).optional(),
});

export type CreateGuestInput = z.infer<typeof createGuestSchema>;
export type UpdateGuestInput = z.infer<typeof updateGuestSchema>;
export type ListGuestsQuery = z.infer<typeof listGuestsQuerySchema>;