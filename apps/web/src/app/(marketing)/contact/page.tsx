"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend contact endpoint yet — this is a UI-only placeholder submit for now.
    setIsSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-gradient-luxury">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold">
            <span className="text-platinum-100">Get in</span> <GradientText>Touch</GradientText>
          </h1>
          <p className="mt-3 text-platinum-300">
            We&apos;d love to hear from you — reach out with any questions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <GlassCard className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-champagne-400/15 text-champagne-300">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-semibold text-platinum-100">Address</p>
                <p className="mt-1 text-sm text-platinum-300">Bole Road, Addis Ababa, Ethiopia</p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-champagne-400/15 text-champagne-300">
                <Phone size={18} />
              </div>
              <div>
                <p className="font-semibold text-platinum-100">Phone</p>
                <p className="mt-1 text-sm text-platinum-300">+251 911 000 000</p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-champagne-400/15 text-champagne-300">
                <Mail size={18} />
              </div>
              <div>
                <p className="font-semibold text-platinum-100">Email</p>
                <p className="mt-1 text-sm text-platinum-300">reservations@heroyhotel.com</p>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-6">
            {isSubmitted ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <p className="text-lg font-semibold text-platinum-100">Message sent</p>
                <p className="mt-2 text-sm text-platinum-300">
                  Thank you for reaching out — our team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-platinum-500">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-platinum-500">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-platinum-500">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-platinum-100/10 bg-platinum-100/5 px-3 py-2 text-sm text-platinum-100 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-champagne-400 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-champagne-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>

      <Footer />
    </main>
  );
}