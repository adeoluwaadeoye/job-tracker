"use client";

import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import { Job, JobStatus, ParsedJob } from "@/types/job";

const fetcher = (url: string) => fetch(url).then((r) => r.json()).then((d) => d.jobs);

export function useJobs(status?: JobStatus) {
  const key = status ? `/api/jobs?status=${status}` : "/api/jobs";

  const { data: jobs = [], isLoading: loading, error } = useSWR<Job[]>(
    key,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  const createJob = useCallback(
    async (job: Omit<Job, "_id" | "createdAt" | "updatedAt">) => {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create job");
      mutate("/api/jobs");
      return data.job as Job;
    },
    []
  );

  const updateJob = useCallback(async (id: string, updates: Partial<Job>) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update job");
    mutate("/api/jobs");
    return data.job as Job;
  }, []);

  const deleteJob = useCallback(async (id: string) => {
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to delete job");
    mutate("/api/jobs");
  }, []);

  const parseJob = useCallback(
    async (description: string, background?: string): Promise<ParsedJob> => {
      const res = await fetch("/api/jobs/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, background }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to parse job");
      return data as ParsedJob;
    },
    []
  );

  return {
    jobs,
    loading,
    error: error?.message ?? null,
    createJob,
    updateJob,
    deleteJob,
    parseJob,
  };
}