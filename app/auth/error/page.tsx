"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Briefcase, AlertTriangle } from "lucide-react";

const errors: Record<string, string> = {
  OAuthSignin: "Error starting the OAuth sign-in flow.",
  OAuthCallback: "Error during OAuth callback.",
  OAuthCreateAccount: "Could not create an OAuth account.",
  EmailCreateAccount: "Could not create an email account.",
  Callback: "Error during callback.",
  OAuthAccountNotLinked: "This email is already linked to another provider.",
  EmailSignin: "Failed to send the sign-in email.",
  CredentialsSignin: "Invalid credentials.",
  SessionRequired: "Please sign in to access this page.",
  Default: "An unexpected error occurred.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "Default";
  const message = errors[error] ?? errors.Default;

  return (
    <div className="w-full max-w-sm text-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-4">
          <Briefcase className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-xl mb-2">
            Authentication error
          </h1>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Link
            href="/auth/login"
            className="w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold text-center hover:opacity-90 transition-opacity"
          >
            Try again
          </Link>
          <Link
            href="/"
            className="w-full px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-center hover:bg-accent transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}