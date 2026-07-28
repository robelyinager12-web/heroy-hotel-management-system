import { z } from "zod";

export const createPaymentSchema = z.object({
  reservationId: z.string().min(1),
  amount: z.number().positive(),
  method: z.enum(["CASH", "CARD", "BANK_TRANSFER", "MOBILE_MONEY", "ONLINE"]),
  transactionRef: z.string().optional(),
});

export const updatePaymentStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "PARTIALLY_PAID", "REFUNDED", "FAILED"]),
});

export const refundPaymentSchema = z.object({
  reason: z.string().optional(),
});

export const listPaymentsQuerySchema = z.object({
  reservationId: z.string().optional(),
  status: z.string().optional(),
  method: z.string().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentStatusInput = z.infer<typeof updatePaymentStatusSchema>;
export type RefundPaymentInput = z.infer<typeof refundPaymentSchema>;
export type ListPaymentsQuery = z.infer<typeof listPaymentsQuerySchema>;