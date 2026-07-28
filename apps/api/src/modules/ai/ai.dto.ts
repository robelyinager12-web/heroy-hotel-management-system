import { z } from "zod";

export const chatMessageSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string().min(1),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;