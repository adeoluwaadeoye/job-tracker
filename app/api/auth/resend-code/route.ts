import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb-client";
import { connectDB } from "@/lib/mongodb";
import VerificationToken from "@/models/VerificationToken";
import { sendVerificationEmail } from "@/lib/email";

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email." },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email is already verified." },
        { status: 400 }
      );
    }

    const code = generateCode();
    const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

    await VerificationToken.deleteMany({ email });

    await VerificationToken.create({
      email,
      code: hashedCode,
      expires: new Date(Date.now() + 10 * 60 * 1000),
      attempts: 0,
    });

    await sendVerificationEmail(email, code, user.name);

    return NextResponse.json({ message: "New code sent." });
  } catch (err) {
    console.error("[POST /api/auth/resend-code]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}