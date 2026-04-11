import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required." },
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

    const resetToken = await db
      .collection("password_reset_tokens")
      .findOne({ token });

    if (!resetToken) {
      return NextResponse.json(
        { error: "Invalid or expired reset token." },
        { status: 400 }
      );
    }

    if (new Date() > new Date(resetToken.expires)) {
      await db.collection("password_reset_tokens").deleteOne({ token });
      return NextResponse.json(
        { error: "Reset token has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    await db.collection("users").updateOne(
      { email: resetToken.email },
      { $set: { password: hashed, updatedAt: new Date() } }
    );

    await db.collection("password_reset_tokens").deleteOne({ token });

    return NextResponse.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("[POST /api/auth/new-password]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}