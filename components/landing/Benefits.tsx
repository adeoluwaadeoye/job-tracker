"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { label: "Parse time", value: "< 3s", sub: "Any job description" },
  { label: "Models", value: "Llama 3", sub: "Groq-powered inference" },
  { label: "Storage", value: "Yours", sub: "Own MongoDB database" },
  { label: "Cost", value: "$0", sub: "Free to use" },
];

const list = [
  "Auto-extract title, company, skills & location",
  "AI-generated cover letter for every role",
  "Pipeline from saved → offer in one board",
  "Interview notes per application",
  "Top skills analytics across all roles",
  "Fully responsive — phone, tablet, desktop",
];

export function Benefits() {
  return (
    <section id="benefits" className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
      {/* Metrics strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-16">
        {items.map(({ label, value, sub }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-card px-6 py-6"
          >
            <p className="font-heading font-bold text-3xl md:text-4xl text-primary mb-1">
              {value}
            </p>
            <p className="text-sm font-semibold mb-0.5">{label}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            Why JobTracker
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The smartest way to
            <br /> manage your job search
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
            Most engineers track jobs in a messy spreadsheet — or don&apos;t
            track them at all. JobTracker gives you a clean, AI-powered system
            that does the heavy lifting.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 gap-2">
          {list.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 px-5 py-3.5 rounded-xl border border-border hover:border-primary/30 hover:bg-accent/30 transition-colors cursor-default"
            >
              <span className="font-heading font-bold text-xs text-muted-foreground/40 w-5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}