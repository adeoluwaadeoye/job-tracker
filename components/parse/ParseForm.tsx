"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useJobs } from "@/hooks/useJobs";
import { ParsedJob, JobStatus } from "@/types/job";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Save,
  MapPin,
  Briefcase,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { JobStatusBadge } from "@/components/jobs/JobStatusBadge";
import { toast } from "sonner";

const statusOptions: JobStatus[] = [
  "saved",
  "applied",
  "interviewing",
  "offer",
  "rejected",
];

export function ParseForm() {
  const router = useRouter();
  const { parseJob, createJob } = useJobs();

  const [description, setDescription] = useState("");
  const [background, setBackground] = useState("");
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [parsed, setParsed] = useState<ParsedJob | null>(null);
  const [status, setStatus] = useState<JobStatus>("applied");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"input" | "review">("input");

  const handleParse = async () => {
    if (!description.trim() || description.trim().length < 50) {
      setError("Please paste a full job description (min 50 characters).");
      return;
    }
    setParsing(true);
    setError("");
    try {
      const result = await parseJob(description, background);
      setParsed(result);
      setStep("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse. Try again.");
    } finally {
      setParsing(false);
    }
  };

  const handleSave = async () => {
    if (!parsed) return;
    setSaving(true);
    try {
      await createJob({
        ...parsed,
        status,
        notes: "",
        rawDescription: description,
      });
      toast.success("Job saved to your board!");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to save job. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setParsed(null);
    setStep("input");
    setDescription("");
    setBackground("");
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {step === "input" ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Job description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Job description
              </label>
              <p className="text-xs text-muted-foreground">
                Paste the full job posting — title, responsibilities, requirements.
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Paste job description here..."
                rows={10}
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none leading-relaxed"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{description.length} characters</span>
                <span className={description.length < 50 ? "text-destructive" : "text-green-500"}>
                  {description.length < 50 ? `${50 - description.length} more needed` : "✓ Ready to parse"}
                </span>
              </div>
            </div>

            {/* Background */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Your background{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <p className="text-xs text-muted-foreground">
                A brief summary improves the cover letter quality.
              </p>
              <textarea
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="e.g. 4 years React + TypeScript, built 3 SaaS products, comfortable with Node.js and REST APIs..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleParse}
              disabled={parsing}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-primary/20"
            >
              {parsing ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Parsing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Parse with AI
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Success header */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Successfully parsed
                </p>
                <p className="text-xs text-green-600 dark:text-green-500">
                  Review the details below and save to your board.
                </p>
              </div>
            </div>

            {/* Extracted details */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="font-heading font-semibold text-base">
                  Extracted details
                </h3>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Title
                    </span>
                    <span className="font-heading font-semibold text-base">
                      {parsed?.title}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Company
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                      {parsed?.company}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Location
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      {parsed?.location || "—"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Type
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                      {parsed?.type || "—"}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Summary
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {parsed?.summary}
                  </p>
                </div>

                {/* Skills */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Key skills
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {parsed?.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cover letter */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h3 className="font-heading font-semibold text-base">
                  Cover letter draft
                </h3>
                <span className="text-xs text-muted-foreground">AI-generated</span>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {parsed?.coverLetter}
                </p>
              </div>
            </div>

            {/* Status selector */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Initial status
              </label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`transition-all duration-150 rounded-full ${
                      status === s ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                  >
                    <JobStatusBadge status={s} />
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Parse another
              </button>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save to board
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}