"use client";

import { motion } from "framer-motion";
import { Bell, Moon, Globe, Shield } from "lucide-react";

const settings = [
  {
    icon: Bell,
    label: "Notifications",
    description: "Email alerts for application updates",
    disabled: true,
  },
  {
    icon: Moon,
    label: "Dark mode",
    description: "Switch between light and dark theme",
    disabled: true,
  },
  {
    icon: Globe,
    label: "Language",
    description: "Set your preferred language",
    disabled: true,
  },
  {
    icon: Shield,
    label: "Privacy",
    description: "Manage your data and privacy settings",
    disabled: true,
  },
];

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto flex flex-col gap-5"
    >
      <div>
        <h2 className="font-heading font-bold text-xl mb-1">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your preferences.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {settings.map(({ icon: Icon, label, description, disabled }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
            {disabled ? (
              <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                Soon
              </span>
            ) : (
              <div className="w-10 h-5 rounded-full bg-primary" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}