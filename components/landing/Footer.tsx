"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-6 h-6 rounded-md bg-primary flex items-center justify-center"
            >
              <Briefcase className="w-3 h-3 text-primary-foreground" />
            </motion.div>
            <span className="font-heading font-bold text-sm">JobTracker</span>
          </Link>

          <nav className="flex items-center gap-6">
            {[
              { href: "#how-it-works", label: "How it works" },
              { href: "#app", label: "Get the app" },
              { href: "#faq", label: "FAQ" },
              { href: "/dashboard", label: "Dashboard" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JobTracker
          </p>
        </div>
      </div>
    </motion.footer>
  );
}