"use client";

import { Job } from "@/types/job";
import { JobStatusBadge } from "./JobStatusBadge";
import { MapPin, Briefcase, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

export function JobCard({ job }: { job: Job }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/dashboard/jobs/${job._id}`}
        className="block p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="font-heading font-semibold text-base truncate">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-muted-foreground truncate">
              {job.company}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <JobStatusBadge status={job.status} />
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
          {job.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
          )}
          {job.type && (
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {job.type}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </span>
        </div>

        {job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {job.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-full bg-accent text-xs font-medium text-muted-foreground"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-2 py-0.5 rounded-full bg-accent text-xs font-medium text-muted-foreground">
                +{job.skills.length - 4}
              </span>
            )}
          </div>
        )}
      </Link>
    </motion.div>
  );
}