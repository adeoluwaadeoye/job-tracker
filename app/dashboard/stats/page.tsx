"use client";

import { useJobs } from "@/hooks/useJobs";
import { StatsCards } from "@/components/stats/StatsCard";
import { motion } from "framer-motion";
import { Job } from "@/types/job";

function TopSkills({ jobs }: { jobs: Job[] }) {
  const skillCounts: Record<string, number> = {};
  jobs.forEach((j) =>
    j.skills.forEach((s) => {
      skillCounts[s] = (skillCounts[s] || 0) + 1;
    })
  );
  const sorted = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  if (sorted.length === 0) return null;

  const max = sorted[0][1];

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-heading font-semibold text-base mb-5">
        Most required skills
      </h3>
      <div className="flex flex-col gap-3">
        {sorted.map(([skill, count], i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-medium w-28 truncate shrink-0">
              {skill}
            </span>
            <div className="flex-1 h-2 rounded-full bg-accent overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(count / max) * 100}%` }}
                transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <span className="text-xs text-muted-foreground w-6 text-right shrink-0">
              {count}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusBreakdown({ jobs }: { jobs: Job[] }) {
  const statuses = ["saved", "applied", "interviewing", "offer", "rejected"] as const;
  const colors = {
    saved: "bg-purple-500",
    applied: "bg-blue-500",
    interviewing: "bg-yellow-500",
    offer: "bg-green-500",
    rejected: "bg-red-500",
  };

  const counts = statuses.map((s) => ({
    status: s,
    count: jobs.filter((j) => j.status === s).length,
    color: colors[s],
  }));

  const total = jobs.length;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-heading font-semibold text-base mb-5">
        Pipeline breakdown
      </h3>
      {total === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <>
          {/* Bar */}
          <div className="flex h-3 rounded-full overflow-hidden mb-4 gap-0.5">
            {counts.map(({ status, count, color }) =>
              count > 0 ? (
                <motion.div
                  key={status}
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / total) * 100}%` }}
                  transition={{ duration: 0.6 }}
                  className={`h-full ${color}`}
                />
              ) : null
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            {counts.map(({ status, count, color }) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-sm capitalize">{status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {total > 0 ? Math.round((count / total) * 100) : 0}%
                  </span>
                  <span className="text-sm font-semibold w-6 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function StatsPage() {
  const { jobs, loading } = useJobs();

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h2 className="font-heading font-bold text-xl mb-1">Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Track your job search performance over time.
        </p>
      </div>

      <StatsCards jobs={jobs} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusBreakdown jobs={jobs} />
        <TopSkills jobs={jobs} />
      </div>
    </motion.div>
  );
}