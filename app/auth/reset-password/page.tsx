"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, Mail } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-4">
          <Briefcase className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="font-heading font-bold text-2xl tracking-tight">
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground mt-1 text-center">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      {sent ? (
        <div className="text-center p-6 rounded-2xl border border-border bg-card">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-lg mb-2">Email sent</h2>
          <p className="text-sm text-muted-foreground mb-4">
            If an account exists for{" "}
            <span className="font-medium text-foreground">{email}</span>, you
            will receive a password reset link shortly.
          </p>
          <Link
            href="/auth/login"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Back to sign in
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Send reset link
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-6">
        Remembered your password?{" "}
        <Link
          href="/auth/login"
          className="text-foreground font-medium hover:text-primary transition-colors underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}