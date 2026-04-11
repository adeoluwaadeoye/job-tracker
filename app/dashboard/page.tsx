"use client";

import { useJobs } from "@/hooks/useJobs";
import { JobBoard } from "@/components/jobs/JobBoard";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function BoardPage() {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <div className="h-7 w-32 bg-muted rounded-xl animate-pulse" />
          <div className="h-9 w-28 bg-muted rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 bg-muted rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-destructive mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-xl">
            My applications
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {jobs?.length ?? 0} total ·{" "}
            {jobs?.filter((j) => j.status === "interviewing").length ?? 0} interviewing
          </p>
        </div>

        <Link
          href="/dashboard/add"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <PlusCircle className="w-4 h-4" />
          Add Job
        </Link>
      </div>

      <JobBoard jobs={jobs} />
    </motion.div>
  );
}