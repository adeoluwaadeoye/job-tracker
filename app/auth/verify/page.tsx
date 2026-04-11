import { Mail } from "lucide-react";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function VerifyPage() {
  return (
    <div className="w-full max-w-sm text-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-4">
          <Briefcase className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-xl mb-2">
            Check your inbox
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We sent you a magic link. Click it to sign in — no password needed.
            The link expires in 10 minutes.
          </p>
        </div>
        <div className="w-full h-px bg-border" />
        <p className="text-xs text-muted-foreground">
          Didn&apos;t receive it? Check your spam folder or{" "}
          <Link
            href="/auth/login"
            className="text-foreground font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            try again
          </Link>
        </p>
      </div>
    </div>
  );
}