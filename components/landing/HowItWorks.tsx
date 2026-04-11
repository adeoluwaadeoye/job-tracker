"use client";

import { useInView } from "react-intersection-observer";
import { ClipboardPaste, Cpu, BookCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardPaste,
    title: "Paste the job description",
    description:
      "Copy the full posting from LinkedIn, Indeed, or any job board and paste it in. No formatting required.",
    detail: "Supports any job board format",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI extracts everything",
    description:
      "Title, company, location, type, top skills, summary — all parsed and structured in under 3 seconds.",
    detail: "Powered by Llama 3.3 · Groq inference",
  },
  {
    number: "03",
    icon: BookCheck,
    title: "Get your cover letter",
    description:
      "A confident, role-specific opening paragraph written automatically. No templates, no generic filler.",
    detail: "Tailored to every role",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track your pipeline",
    description:
      "Save to your board, update status as you progress, add interview notes, and watch your analytics grow.",
    detail: "From saved → offer in one place",
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="how-it-works" className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16"
      >
        <div>
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            How it works
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
            From job post to tracked
            <br className="hidden md:block" /> application in 30 seconds
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-xs md:text-right leading-relaxed">
          No manual entry. No spreadsheets.
          <br /> Paste and go.
        </p>
      </motion.div>

      {/* Steps */}
      <div ref={ref} className="relative">
        <div className="hidden lg:block absolute left-6.75 top-8 bottom-8 w-px bg-border" />

        <div className="flex flex-col gap-0">
          {steps.map(({ number, icon: Icon, title, description, detail }, index) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
              className="relative grid grid-cols-1 lg:grid-cols-[56px_1fr_1fr] gap-6 lg:gap-10 py-10 border-b border-border last:border-0"
            >
              {/* Step indicator */}
              <div className="hidden lg:flex flex-col items-center gap-2 pt-1">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="relative z-10 w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center shrink-0"
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>
              </div>

              {/* Left content */}
              <div className="flex flex-col justify-center gap-3">
                <div className="lg:hidden w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-heading font-bold text-4xl md:text-5xl text-border leading-none">
                  {number}
                </span>
                <h3 className="font-heading font-bold text-lg md:text-xl">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Right visual block */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <div className="w-full rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                  {index === 0 && (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                        <span className="ml-2 text-xs text-muted-foreground font-mono">
                          job-description.txt
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {[90, 70, 80, 60].map((w, i) => (
                          <motion.div
                            key={i}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${w}%` } : {}}
                            transition={{ delay: index * 0.12 + i * 0.08 + 0.3, duration: 0.5 }}
                            className="h-2 rounded-full bg-muted"
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {index === 1 && (
                    <>
                      <p className="text-xs font-mono text-muted-foreground mb-1">
                        extracted.json
                      </p>
                      <div className="flex flex-col gap-2 font-mono text-xs">
                        {[
                          { key: "title", value: '"Senior Frontend Engineer"', color: "text-green-500" },
                          { key: "company", value: '"Stripe"', color: "text-blue-500" },
                          { key: "type", value: '"Full-time"', color: "text-yellow-500" },
                          { key: "skills", value: '["React", "TS", ...]', color: "text-primary" },
                        ].map(({ key, value, color }, i) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.12 + i * 0.08 + 0.3 }}
                            className="flex gap-2"
                          >
                            <span className="text-muted-foreground">{key}:</span>
                            <span className={color}>{value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}

                  {index === 2 && (
                    <>
                      <p className="text-xs font-mono text-muted-foreground mb-1">
                        cover-letter.txt
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {[95, 88, 92, 75, 60].map((w, i) => (
                          <motion.div
                            key={i}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${w}%` } : {}}
                            transition={{ delay: index * 0.12 + i * 0.06 + 0.3, duration: 0.5 }}
                            className="h-2 rounded-full bg-muted"
                          />
                        ))}
                      </div>
                      <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-primary font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Generated in 2.4s
                      </div>
                    </>
                  )}

                  {index === 3 && (
                    <div className="flex flex-col gap-2">
                      {[
                        { label: "Stripe", status: "Interviewing", dot: "bg-yellow-500" },
                        { label: "Vercel", status: "Applied", dot: "bg-blue-500" },
                        { label: "Linear", status: "Offer", dot: "bg-green-500" },
                      ].map(({ label, status, dot }, i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, x: 10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.12 + i * 0.08 + 0.3 }}
                          className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${dot}`} />
                            <span className="text-xs font-semibold">{label}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{status}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="mt-1 pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">{detail}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 p-6 rounded-2xl border border-border bg-card"
      >
        <div>
          <p className="font-heading font-semibold text-base mb-1">
            Ready to start tracking?
          </p>
          <p className="text-sm text-muted-foreground">
            Your entire job pipeline, organized in seconds.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}