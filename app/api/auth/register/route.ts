import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    await db.collection("users").insertOne({
      name,
      email,
      password: hashed,
      image: null,
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Generate and store OTP
    const code = generateCode();
    const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

    await VerificationToken.deleteMany({ email });

    await VerificationToken.create({
      email,
      code: hashedCode,
      expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      attempts: 0,
    });

    await sendVerificationEmail(email, code, name);

    return NextResponse.json(
      { message: "Account created. Verification code sent." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/auth/register]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}