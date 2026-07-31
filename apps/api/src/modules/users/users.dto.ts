import { z } from "zod";

const ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "RECEPTIONIST",
  "MANAGER",
  "HOUSEKEEPING",
  "RESTAURANT",
  "KITCHEN",
  "CASHIER",
  "ACCOUNTANT",
  "CUSTOMER",
  "GUEST",
  "SECURITY",
  "MAINTENANCE",
  "HR",
  "STORE_KEEPER",
  "LAUNDRY",
  "PARKING",
  "DRIVER",
] as const;

export const createStaffUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  role: z.enum(ROLES),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  role: z.enum(ROLES).optional(),
  isActive: z.boolean().optional(),
});

export const listUsersQuerySchema = z.object({
  role: z.enum(ROLES).optional(),
  search: z.string().optional(),
});

export type CreateStaffUserInput = z.infer<typeof createStaffUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;