"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Job, JobStatus } from "@/types/job";
import { JobStatusBadge } from "@/components/jobs/JobStatusBadge";
import { useJobs } from "@/hooks/useJobs";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Calendar,
  Building2,
  Trash2,
  Save,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const statusOptions: JobStatus[] = [
  "saved",
  "applied",
  "interviewing",
  "offer",
  "rejected",
];

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { jobs, updateJob, deleteJob, loading } = useJobs();
  const [job, setJob] = useState<Job | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const found = jobs.find((j: Job) => j._id === id);
    if (found) {
      setJob(found);
      setNotes(found.notes || "");
    }
  }, [jobs, id]);

  const handleStatusChange = async (status: JobStatus) => {
    if (!job) return;
    try {
      await updateJob(job._id, { status });
      setJob((prev) => (prev ? { ...prev, status } : prev));
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleSaveNotes = async () => {
    if (!job) return;
    setSaving(true);
    try {
      await updateJob(job._id, { notes });
      toast.success("Notes saved");
    } catch {
      toast.error("Failed to save notes");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!job) return;
    if (!confirm("Delete this application? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteJob(job._id);
      toast.success("Application deleted");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to delete");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col gap-5">
        {/* Back button skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-28 bg-muted rounded-lg animate-pulse" />
          <div className="h-8 w-20 bg-muted rounded-xl animate-pulse" />
        </div>

        {/* Header card skeleton */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-7 w-64 bg-muted rounded-lg animate-pulse" />
              <div className="h-4 w-32 bg-muted rounded-lg animate-pulse" />
            </div>
            <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
          </div>
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-muted rounded-lg animate-pulse" />
            <div className="h-4 w-20 bg-muted rounded-lg animate-pulse" />
            <div className="h-4 w-28 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Status skeleton */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="h-4 w-24 bg-muted rounded-lg animate-pulse mb-3" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-muted rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Skills skeleton */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="h-4 w-28 bg-muted rounded-lg animate-pulse mb-3" />
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-muted rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Summary skeleton */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="h-4 w-20 bg-muted rounded-lg animate-pulse mb-3" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-full bg-muted rounded-lg animate-pulse" />
            <div className="h-3 w-5/6 bg-muted rounded-lg animate-pulse" />
            <div className="h-3 w-4/6 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Cover letter skeleton */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="h-4 w-32 bg-muted rounded-lg animate-pulse mb-3" />
          <div className="flex flex-col gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-muted rounded-lg animate-pulse"
                style={{ width: `${[100, 90, 95, 75][i]}%` }}
              />
            ))}
          </div>
        </div>

        {/* Notes skeleton */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="h-4 w-24 bg-muted rounded-lg animate-pulse mb-3" />
          <div className="h-32 w-full bg-muted rounded-xl animate-pulse" />
          <div className="h-9 w-28 bg-muted rounded-xl animate-pulse mt-3" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-muted-foreground mb-4">Job not found.</p>
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
        >
          Back to board
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto flex flex-col gap-5"
    >
      {/* Back + actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/add"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to board
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-60"
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {/* Header card */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="font-heading font-bold text-2xl mb-1">
              {job.title}
            </h2>
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <Building2 className="w-4 h-4" />
              {job.company}
            </div>
          </div>
          <JobStatusBadge status={job.status} />
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          {job.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {job.location}
            </span>
          )}
          {job.type && (
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              {job.type}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Added{" "}
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      {/* Status updater */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-3">
          Update status
        </h3>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`transition-all duration-150 rounded-full ${job.status === s
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
                }`}
            >
              <JobStatusBadge status={s} />
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      {job.skills.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-3">
            Required skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {job.summary && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-2">Summary</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {job.summary}
          </p>
        </div>
      )}

      {/* Cover letter */}
      {job.coverLetter && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-heading font-semibold text-sm">
              Cover letter draft
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {job.coverLetter}
          </p>
        </div>
      )}

      {/* Notes */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-heading font-semibold text-sm mb-3">
          Notes & prep
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Interview prep, contacts, follow-up dates, key talking points..."
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none leading-relaxed"
        />
        <button
          onClick={handleSaveNotes}
          disabled={saving}
          className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save notes
        </button>
      </div>
    </motion.div>
  );
}