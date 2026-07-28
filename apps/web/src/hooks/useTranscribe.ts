import { useState, useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export function useTranscribe() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transcribe = useCallback(async (blob: Blob): Promise<{ text: string }> => {
    setIsPending(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");

      const res = await fetch(`${API_URL}/ai/transcribe`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Transcription failed");
      }

      return json.data as { text: string };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Transcription failed";
      setError(message);
      return { text: "" };
    } finally {
      setIsPending(false);
    }
  }, []);

  return { transcribe, isPending, error };
}