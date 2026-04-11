"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Is JobTracker really free?",
    answer: "Yes. You bring your own Groq API key (free tier) and MongoDB database (free M0 on Atlas). No subscription, no hidden fees.",
  },
  {
    question: "How accurate is the AI parsing?",
    answer: "Very accurate for standard job descriptions. Extracts title, company, location, type, top 5 skills, and a 2-sentence summary. Unusual formats may need a minor touch-up.",
  },
  {
    question: "Where is my data stored?",
    answer: "All data lives in your own MongoDB Atlas database. We never have access to your applications, notes, or cover letters.",
  },
  {
    question: "Can I use this on mobile?",
    answer: "Absolutely. Fully responsive across phones and tablets. The native app is coming soon.",
  },
  {
    question: "What AI model powers it?",
    answer: "Llama 3.3 70B via Groq — one of the fastest open-source models available. Results in under 3 seconds.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">FAQ</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Questions & answers
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll get back to you.
          </p>
        </motion.div>

        <div className="lg:col-span-2 flex flex-col divide-y divide-border">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="py-4"
            >
              <button
                className="w-full flex items-center justify-between gap-4 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-heading font-medium text-sm md:text-base group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open === i
                    ? <Minus className="w-4 h-4 shrink-0 text-primary" />
                    : <Plus className="w-4 h-4 shrink-0 text-muted-foreground" />
                  }
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}