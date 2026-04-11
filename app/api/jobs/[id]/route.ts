import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid job ID." }, { status: 400 });
    }

    const updates = await req.json();
    const allowed = ["status", "notes", "title", "company", "location", "type", "skills", "coverLetter"];
    const safe: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in updates) safe[key] = updates[key];
    }

    const job = await Job.findByIdAndUpdate(
      id,
      { $set: safe },
      { new: true, runValidators: true }
    ).lean();

    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

    return NextResponse.json({ job }, { status: 200 });
  } catch (err) {
    console.error("[PATCH /api/jobs/:id]", err);
    return NextResponse.json({ error: "Failed to update job." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid job ID." }, { status: 400 });
    }

    const job = await Job.findByIdAndDelete(id).lean();
    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

    return NextResponse.json({ message: "Job deleted." }, { status: 200 });
  } catch (err) {
    console.error("[DELETE /api/jobs/:id]", err);
    return NextResponse.json({ error: "Failed to delete job." }, { status: 500 });
  }
}