import { z } from "zod";

export const reportRangeSchema = z.object({
  branchId: z.string().optional(),
  from: z.string().datetime(),
  to: z.string().datetime(),
  format: z.enum(["pdf", "excel"]).default("pdf"),
});

export type ReportRangeInput = z.infer<typeof reportRangeSchema>;