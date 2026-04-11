export type JobStatus = "saved" | "applied" | "interviewing" | "offer" | "rejected";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  skills: string[];
  summary: string;
  coverLetter: string;
  status: JobStatus;
  notes: string;
  rawDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParsedJob {
  title: string;
  company: string;
  location: string;
  type: string;
  skills: string[];
  summary: string;
  coverLetter: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}