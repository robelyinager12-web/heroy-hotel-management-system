"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Loader2, Mic, Square } from "lucide-react";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useTranscribe } from "@/hooks/useTranscribe";

export function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading, error } = useAiAssistant();
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder();
  const { transcribe, isPending: isTranscribing, error: transcribeError } = useTranscribe();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    sendMessage(text);
  }

  async function handleMicClick() {
    if (isRecording) {
      const blob = await stopRecording();
      if (blob.size === 0) return;

      const result = await transcribe(blob);
      if (result.text.trim()) {
        setInput(result.text.trim());
      }
    } else {
      await startRecording();
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 transition hover:scale-105"
        aria-label="Open AI assistant"
      >
        <Sparkles size={22} />
      </button>
    );
  }

  return (
    <div className="glass-panel fixed bottom-6 right-6 z-50 flex h-[520px] w-[360px] flex-col rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Heroy AI</p>
            <p className="text-xs text-white/40">Ask me about rooms, booking, or the hotel</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center text-white/40">
            <Sparkles size={28} className="mb-3 text-white/20" />
            <p className="text-sm">Hi! Ask me anything about Heroy Hotel.</p>
            <p className="mt-1 text-xs">e.g. &quot;What time is checkout?&quot; · Try the mic too</p>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "USER" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.role === "USER"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/5 text-white/90"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2">
              <Loader2 size={14} className="animate-spin text-white/40" />
              <span className="text-xs text-white/40">Thinking...</span>
            </div>
          </div>
        )}

        {(error || transcribeError) && (
          <p className="text-center text-xs text-red-400">{error || transcribeError}</p>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 p-3">
        <button
          onClick={handleMicClick}
          disabled={isTranscribing}
          className={`flex items-center justify-center rounded-lg p-2 text-white transition disabled:opacity-40 ${
            isRecording ? "bg-red-500 hover:bg-red-600" : "border border-white/10 bg-white/5 hover:bg-white/10"
          }`}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          {isTranscribing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : isRecording ? (
            <Square size={16} />
          ) : (
            <Mic size={16} />
          )}
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={isRecording ? "Recording... click mic to stop" : "Type a message..."}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-white disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}