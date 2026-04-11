"use client";

import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import { Job, JobStatus, ParsedJob } from "@/types/job";

// ✅ FIXED fetcher (robust + safe)
const fetcher = async (url: string): Promise<Job[]> => {
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  const data = await res.json();

  if (!data || !Array.isArray(data.jobs)) {
    throw new Error("Invalid API response: expected { jobs: [] }");
  }

  return data.jobs;
};

export function useJobs(status?: JobStatus) {
  const key = status ? `/api/jobs?status=${status}` : "/api/jobs";

  const {
    data: jobs = [],
    isLoading: loading,
    error,
  } = useSWR<Job[]>(key, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5000,
  });

  // ✅ FIXED: revalidate ALL job keys (important)
  const revalidateJobs = () =>
    mutate((key) => typeof key === "string" && key.startsWith("/api/jobs"));

  const createJob = useCallback(
    async (job: Omit<Job, "_id" | "createdAt" | "updatedAt">) => {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create job");
      }

      revalidateJobs();
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

    if (!res.ok) {
      throw new Error(data?.error || "Failed to update job");
    }

    revalidateJobs();
    return data.job as Job;
  }, []);

  const deleteJob = useCallback(async (id: string) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Failed to delete job");
    }

    revalidateJobs();
  }, []);

  const parseJob = useCallback(
    async (description: string, background?: string): Promise<ParsedJob> => {
      const res = await fetch("/api/jobs/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, background }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to parse job");
      }

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