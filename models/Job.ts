import mongoose, { Schema, Document, Model } from "mongoose";

export type JobStatus = "saved" | "applied" | "interviewing" | "offer" | "rejected";

export interface IJob extends Document {
  userEmail: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    userEmail:      { type: String, required: true },
    title:          { type: String, required: true, trim: true },
    company:        { type: String, required: true, trim: true },
    location:       { type: String, default: "" },
    type:           { type: String, default: "" },
    skills:         { type: [String], default: [] },
    summary:        { type: String, default: "" },
    coverLetter:    { type: String, default: "" },
    status: {
      type: String,
      enum: ["saved", "applied", "interviewing", "offer", "rejected"],
      default: "saved",
    },
    notes:          { type: String, default: "" },
    rawDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

if (mongoose.models.Job) {
  delete mongoose.models.Job;
}

const Job: Model<IJob> = mongoose.model<IJob>("Job", JobSchema);

export default Job;