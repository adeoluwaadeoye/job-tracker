"use client";

import Link from "next/link";
import { Apple, MonitorSmartphone, Play } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  "Track jobs on the go",
  "Push notifications for follow-ups",
  "Offline access to your board",
  "Sync across all your devices",
];

function Barcode() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 1, 2, 1];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-end gap-0.5 h-14">
        {bars.map((width, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02, duration: 0.3, ease: "easeOut" }}
            style={{ originY: 1 }}
            className="bg-foreground rounded-[1px]"
          >
            <div
              style={{
                width: `${width * 3}px`,
                height: `${i % 5 === 0 ? 56 : 40 + Math.sin(i) * 10}px`,
              }}
            />
          </motion.div>
        ))}
      </div>
      <p className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground">
        JOB-TRACKER-2025
      </p>
    </div>
  );
}

export function App() {
  return (
    <section id="app" className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            Available everywhere
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Track jobs from
            <br /> any device
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
            JobTracker works seamlessly across your phone, tablet, and desktop.
            Your data syncs everywhere in real time.
          </p>

          <ul className="flex flex-col gap-2.5 mb-8">
            {highlights.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            {[
              { icon: Apple, label: "Download on the", name: "App Store", href: "#" },
              { icon: Play, label: "Get it on", name: "Google Play", href: "#" },
            ].map(({ icon: Icon, label, name, href }) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={href}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-foreground text-background hover:opacity-85 transition-opacity"
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="text-[10px] opacity-60 leading-none mb-0.5">{label}</p>
                    <p className="text-sm font-semibold leading-none">{name}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-border hover:bg-accent transition-colors"
              >
                <MonitorSmartphone className="w-5 h-5 shrink-0 text-primary" />
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none mb-0.5">Use on</p>
                  <p className="text-sm font-semibold leading-none">Web App</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right — phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-72">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="w-full rounded-[2.5rem] border-[3px] border-foreground/10 bg-card shadow-2xl overflow-hidden"
            >
              <div className="bg-muted/50 px-5 pt-4 pb-2 flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">9:41</span>
                <div className="w-16 h-4 rounded-full bg-foreground/10" />
                <div className="w-6 h-3 rounded-sm bg-foreground/15" />
              </div>

              <div className="px-4 pt-4 pb-2 bg-background">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-heading font-bold text-sm">My Applications</p>
                  <span className="text-xs text-primary font-medium">4 active</span>
                </div>

                {[
                  { title: "Frontend Engineer", company: "Stripe", status: "Interviewing", dot: "bg-yellow-500" },
                  { title: "Full Stack Dev", company: "Vercel", status: "Applied", dot: "bg-blue-500" },
                  { title: "React Developer", company: "Linear", status: "Offer", dot: "bg-green-500" },
                  { title: "UI Engineer", company: "Figma", status: "Saved", dot: "bg-purple-500" },
                ].map(({ title, company, status, dot }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                      <div>
                        <p className="text-xs font-semibold leading-none mb-0.5">{title}</p>
                        <p className="text-[11px] text-muted-foreground">{company}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground">{status}</span>
                  </motion.div>
                ))}

                <div className="mt-3 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-dashed border-border text-[11px] text-muted-foreground">
                  + Add new job
                </div>
              </div>

              <div className="px-4 py-4 bg-card border-t border-border flex flex-col items-center gap-1">
                <Barcode />
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.3 }}
              className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md"
            >
              Coming soon
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}