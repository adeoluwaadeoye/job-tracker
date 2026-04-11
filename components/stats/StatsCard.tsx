"use client";

import { Job } from "@/types/job";
import { motion } from "framer-motion";
import {
  Briefcase,
  Send,
  MessageSquare,
  Trophy,
  XCircle,
  TrendingUp,
} from "lucide-react";

interface StatCard {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

interface StatsCardsProps {
  jobs: Job[];
}

export function StatsCards({ jobs }: StatsCardsProps) {
  const counts = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "applied").length,
    interviewing: jobs.filter((j) => j.status === "interviewing").length,
    offer: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  };

  const responseRate =
    counts.applied > 0
      ? Math.round(
          ((counts.interviewing + counts.offer) / counts.applied) * 100
        )
      : 0;

  const cards: StatCard[] = [
    {
      label: "Total applications",
      value: counts.total,
      icon: Briefcase,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Applied",
      value: counts.applied,
      icon: Send,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Interviewing",
      value: counts.interviewing,
      icon: MessageSquare,
      color: "text-yellow-600",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      label: "Offers received",
      value: counts.offer,
      icon: Trophy,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "Rejected",
      value: counts.rejected,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
    {
      label: "Response rate",
      value: `${responseRate}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className="flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bg}`}
          >
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </div>
          <div>
            <p className="font-heading font-bold text-3xl">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}