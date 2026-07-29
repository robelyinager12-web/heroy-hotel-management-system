import { z } from "zod";

export const createHousekeepingLogSchema = z.object({
  roomId: z.string().min(1),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
});

export const updateHousekeepingLogSchema = z.object({
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
});

export const listHousekeepingQuerySchema = z.object({
  roomId: z.string().optional(),
  completed: z.enum(["true", "false"]).optional(),
});

export type CreateHousekeepingLogInput = z.infer<typeof createHousekeepingLogSchema>;
export type UpdateHousekeepingLogInput = z.infer<typeof updateHousekeepingLogSchema>;
export type ListHousekeepingQuery = z.infer<typeof listHousekeepingQuerySchema>;