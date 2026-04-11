import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const filter: Record<string, unknown> = {
      userEmail: session.user.email,
    };

    if (status) filter.status = status;

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (err) {
    console.error("[GET /jobs]", err);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      title,
      company,
      location,
      type,
      skills,
      summary,
      coverLetter,
      status,
      rawDescription,
    } = body;

    if (!title || !company) {
      return NextResponse.json(
        { error: "Title and company required" },
        { status: 400 }
      );
    }

    const job = await Job.create({
      title,
      company,
      location,
      type,
      skills,
      summary,
      coverLetter,
      status: status || "saved",
      rawDescription: rawDescription || "",
      userEmail: session.user.email,
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (err) {
    console.error("[POST /jobs]", err);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}