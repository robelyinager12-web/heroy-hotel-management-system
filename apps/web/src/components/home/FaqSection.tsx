"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";

const FAQS = [
  {
    question: "What time is check-in and check-out?",
    answer: "Check-in is from 2:00 PM and check-out is by 12:00 PM. Early check-in and late check-out can be arranged based on availability.",
  },
  {
    question: "Do you offer airport transfers?",
    answer: "Yes, we offer airport pickup and drop-off services. Please contact our front desk or the AI assistant to arrange this in advance.",
  },
  {
    question: "Is breakfast included in the room rate?",
    answer: "This depends on the room package selected. Many of our rates include complimentary breakfast — check the room details when booking.",
  },
  {
    question: "Can I cancel or modify my reservation?",
    answer: "Reservations can be modified or cancelled based on the rate policy selected at booking. Contact our reception team for assistance.",
  },
  {
    question: "Do you have facilities for guests with disabilities?",
    answer: "Yes, we offer accessible rooms and facilities. Please let us know your requirements when booking so we can prepare accordingly.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gradient-luxury px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-white">Frequently Asked</span>{" "}
            <GradientText>Questions</GradientText>
          </h2>
          <p className="mt-3 text-white/60">
            Can&apos;t find what you&apos;re looking for? Ask our AI assistant in the corner.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <GlassCard key={faq.question} className="overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-white">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-white/50 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-white/60">{faq.answer}</p>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}