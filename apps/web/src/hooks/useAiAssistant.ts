import { useState, useCallback } from "react";
import { apiPost } from "@/lib/api-client";

interface ChatMessage {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
}

interface ChatResponse {
  conversationId: string;
  message: { id: string; role: "ASSISTANT"; content: string };
}

export function useAiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: `local-${Date.now()}`,
        role: "USER",
        content: text,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const data = await apiPost<ChatResponse>("/ai/chat", {
          conversationId,
          message: text,
        });

        setConversationId(data.conversationId);
        setMessages((prev) => [
          ...prev,
          { id: data.message.id, role: "ASSISTANT", content: data.message.content },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, isLoading]
  );

  return { messages, sendMessage, isLoading, error };
}