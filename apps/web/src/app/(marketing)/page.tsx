import AiAssistantWidget from "@/components/ai/AiAssistantWidget";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="gradient-text text-5xl font-bold sm:text-6xl">Heroy Hotel</h1>
      <p className="mt-4 max-w-lg text-white/60">
        Luxury, redefined. Book your stay and chat with our AI receptionist for anything you need.
      </p>
      <AiAssistantWidget />
    </main>
  );
}