"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Briefcase, Mail, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const password = searchParams.get("password") ?? "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit when all filled
    if (value && index === 5 && newCode.every((d) => d !== "")) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newCode = pasted.split("");
      setCode(newCode);
      inputRefs.current[5]?.focus();
      handleVerify(pasted);
    }
  };

  const handleVerify = async (codeStr?: string) => {
    const finalCode = codeStr ?? code.join("");
    if (finalCode.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: finalCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        setLoading(false);
        return;
      }

      // Auto sign in
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        setSuccess("New code sent to your email.");
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        setCountdown(60);
        setCanResend(false);
      }
    } catch {
      setError("Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-4">
          <Briefcase className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="font-heading font-bold text-2xl tracking-tight">
          Verify your email
        </h1>
        <p className="text-sm text-muted-foreground mt-1 text-center">
          We sent a 6-digit code to
        </p>
        <p className="text-sm font-semibold text-foreground mt-0.5">{email}</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
        <div className="flex items-center justify-center gap-1">
          <Mail className="w-4 h-4 text-primary shrink-0" />
          <span className="text-xs text-muted-foreground">
            Check your inbox and spam folder
          </span>
        </div>

        {/* OTP inputs */}
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-11 h-13 text-center text-xl font-bold border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                error
                  ? "border-destructive focus:ring-destructive"
                  : digit
                  ? "border-primary"
                  : "border-border"
              }`}
            />
          ))}
        </div>

        {error && (
          <div className="px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}

        {success && (
          <div className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-center">
            <p className="text-xs text-primary">{success}</p>
          </div>
        )}

        <button
          onClick={() => handleVerify()}
          disabled={loading || code.some((d) => d === "")}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              Verify email
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors disabled:opacity-60"
            >
              <RotateCcw className="w-3 h-3" />
              {resending ? "Sending..." : "Resend code"}
            </button>
          ) : (
            <p className="text-xs text-muted-foreground">
              Resend code in{" "}
              <span className="font-semibold text-foreground">{countdown}s</span>
            </p>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Wrong email?{" "}
        <Link
          href="/auth/register"
          className="text-foreground font-medium hover:text-primary transition-colors underline underline-offset-4"
        >
          Start over
        </Link>
      </p>
    </div>
  );
}