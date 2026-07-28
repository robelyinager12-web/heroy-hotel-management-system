import { useState, useCallback } from "react";
import { apiRequest } from "@/lib/api-client";

export interface AiMessage {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
}

interface ChatResponse {
  conversationId: string;
  message: AiMessage;
}

export function useAiAssistant() {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: AiMessage = {
        id: `local-${Date.now()}`,
        role: "USER",
        content: text,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const result = await apiRequest<ChatResponse>("/api/ai/chat", {
          method: "POST",
          body: JSON.stringify({ conversationId: conversationId || undefined, message: text }),
        });

        setConversationId(result.conversationId);
        setMessages((prev) => [...prev, result.message]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, isLoading]
  );

  const reset = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setError(null);
  }, []);

  return { messages, sendMessage, isLoading, error, reset };
}