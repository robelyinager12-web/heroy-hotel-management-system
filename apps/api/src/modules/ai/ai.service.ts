import { prisma } from "../../config/database";
import { env } from "../../config/env";
import { ChatMessageInput } from "./ai.dto";

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_TRANSCRIBE_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const GROQ_CHAT_MODEL = "llama-3.3-70b-versatile";
const GROQ_WHISPER_MODEL = "whisper-large-v3";

const SYSTEM_PROMPT = `You are Heroy, the AI receptionist for Heroy Hotel. You help guests with:
- Room availability and booking questions
- Hotel facilities, restaurant, spa, pool, and gym info
- Local tourism recommendations
- General FAQs about check-in/check-out, policies, and pricing
Be warm, concise, and professional. If you don't know something specific to this hotel, say so and offer to connect them with staff.`;

export async function sendChatMessage(input: ChatMessageInput, userId?: string) {
  if (!env.aiProviderApiKey) {
    throw { statusCode: 500, message: "AI provider is not configured" };
  }

  let conversation = input.conversationId
    ? await prisma.aiConversation.findUnique({
        where: { id: input.conversationId },
        include: { messages: { orderBy: { createdAt: "asc" } } },
      })
    : null;

  if (!conversation) {
    conversation = await prisma.aiConversation.create({
      data: { userId, title: input.message.slice(0, 60) },
      include: { messages: true },
    });
  }

  await prisma.aiMessage.create({
    data: { conversationId: conversation.id, role: "USER", content: input.message },
  });

  const history = [...conversation.messages, { role: "USER", content: input.message }];

  const response = await fetch(GROQ_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.aiProviderApiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_CHAT_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map((m) => ({
          role: m.role === "USER" ? "user" : "assistant",
          content: m.content,
        })),
      ],
      temperature: 0.6,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw { statusCode: 502, message: `AI provider error: ${errorText}` };
  }

  const data = await response.json();
  const replyText: string = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't process that.";

  const assistantMessage = await prisma.aiMessage.create({
    data: { conversationId: conversation.id, role: "ASSISTANT", content: replyText },
  });

  return {
    conversationId: conversation.id,
    message: { id: assistantMessage.id, role: "ASSISTANT", content: replyText },
  };
}

export async function listConversations(userId: string) {
  return prisma.aiConversation.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getConversation(id: string) {
  const conversation = await prisma.aiConversation.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!conversation) throw { statusCode: 404, message: "Conversation not found" };
  return conversation;
}

export async function deleteConversation(id: string) {
  const existing = await prisma.aiConversation.findUnique({ where: { id } });
  if (!existing) throw { statusCode: 404, message: "Conversation not found" };
  await prisma.aiConversation.delete({ where: { id } });
}

export async function transcribeAudio(fileBuffer: Buffer, filename: string) {
  if (!env.aiProviderApiKey) {
    throw { statusCode: 500, message: "AI provider is not configured" };
  }

  const form = new FormData();
  form.append("file", new Blob([fileBuffer]), filename);
  form.append("model", GROQ_WHISPER_MODEL);

  const response = await fetch(GROQ_TRANSCRIBE_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.aiProviderApiKey}` },
    body: form as any,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw { statusCode: 502, message: `Transcription error: ${errorText}` };
  }

  const data = await response.json();
  return { text: data.text ?? "" };
}