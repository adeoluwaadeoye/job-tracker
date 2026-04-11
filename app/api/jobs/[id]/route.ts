import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

type Context = {
  params: { id: string };
};

export async function PATCH(req: NextRequest, { params }: Context) {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const updates = await req.json();

    const allowedFields = [
      "status",
      "notes",
      "title",
      "company",
      "location",
      "type",
      "skills",
      "coverLetter",
    ];

    const safeUpdate: Record<string, unknown> = {};

    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        safeUpdate[field] = updates[field];
      }
    });

    const job = await Job.findByIdAndUpdate(
      id,
      { $set: safeUpdate },
      { new: true, runValidators: true }
    ).lean();

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job }, { status: 200 });
  } catch (err) {
    console.error("PATCH job error:", err);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const job = await Job.findByIdAndDelete(id).lean();

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE job error:", err);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}