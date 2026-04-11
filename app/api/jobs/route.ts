import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const filter = status ? { status } : {};
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/jobs]", err);
    return NextResponse.json({ error: "Failed to fetch jobs." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, company, location, type, skills, summary, coverLetter, status = "saved", rawDescription = "" } = body;

    if (!title || !company) {
      return NextResponse.json(
        { error: "title and company are required." },
        { status: 400 }
      );
    }

    const job = await Job.create({
      title, company, location, type, skills,
      summary, coverLetter, status, rawDescription,
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/jobs]", err);
    return NextResponse.json({ error: "Failed to create job." }, { status: 500 });
  }
}