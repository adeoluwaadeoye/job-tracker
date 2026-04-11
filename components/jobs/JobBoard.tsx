"use client";

import { Job, JobStatus } from "@/types/job";
import { JobCard } from "./JobCard";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";
import Link from "next/link";

const filters: { label: string; value: JobStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Saved", value: "saved" },
  { label: "Applied", value: "applied" },
  { label: "Interviewing", value: "interviewing" },
  { label: "Offer", value: "offer" },
  { label: "Rejected", value: "rejected" },
];

export function JobBoard({ jobs }: { jobs: Job[] }) {
  const [filter, setFilter] = useState<JobStatus | "all">("all");

  const filtered =
    filter === "all" ? jobs : jobs.filter((j) => j.status === filter);

  const counts = filters.reduce(
    (acc, f) => {
      acc[f.value] =
        f.value === "all"
          ? jobs.length
          : jobs.filter((j) => j.status === f.value).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 flex-wrap mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150",
              filter === f.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80"
            )}
          >
            {f.label}
            {counts[f.value] > 0 && (
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                  filter === f.value
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-background text-muted-foreground"
                )}
              >
                {counts[f.value]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Job grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-base mb-2">
              {filter === "all" ? "No applications yet" : `No ${filter} jobs`}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              {filter === "all"
                ? "Paste a job description and AI will parse it for you instantly."
                : `You have no jobs with status "${filter}" yet.`}
            </p>
            {filter === "all" && (
              <Link
                href="/dashboard/add"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Add your first job
              </Link>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {filtered.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}