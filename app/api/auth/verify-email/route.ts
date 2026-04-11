import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb-client";
import { connectDB } from "@/lib/mongodb";
import VerificationToken from "@/models/VerificationToken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required." },
        { status: 400 }
      );
    }

    const tokenDoc = await VerificationToken.findOne({ email });

    if (!tokenDoc) {
      return NextResponse.json(
        { error: "No verification code found. Please register again." },
        { status: 404 }
      );
    }

    if (new Date() > tokenDoc.expires) {
      await VerificationToken.deleteOne({ email });
      return NextResponse.json(
        { error: "Code has expired. Please request a new one." },
        { status: 410 }
      );
    }

    if (tokenDoc.attempts >= 3) {
      await VerificationToken.deleteOne({ email });
      return NextResponse.json(
        { error: "Too many attempts. Please request a new code." },
        { status: 429 }
      );
    }

    const hashedInput = crypto
      .createHash("sha256")
      .update(code.trim())
      .digest("hex");

    if (hashedInput !== tokenDoc.code) {
      await VerificationToken.updateOne({ email }, { $inc: { attempts: 1 } });
      const remaining = 3 - (tokenDoc.attempts + 1);
      return NextResponse.json(
        { error: `Invalid code. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.` },
        { status: 400 }
      );
    }

    // Mark email as verified
    const client = await clientPromise;
    const db = client.db();

    await db.collection("users").updateOne(
      { email },
      { $set: { emailVerified: new Date(), updatedAt: new Date() } }
    );

    await VerificationToken.deleteOne({ email });

    return NextResponse.json({ message: "Email verified successfully." });
  } catch (err) {
    console.error("[POST /api/auth/verify-email]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}