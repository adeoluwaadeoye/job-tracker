import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/landing/LayoutWrapper";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JobTracker — AI-Powered Job Application Tracker",
    template: "%s | JobTracker",
  },
  description:
    "Paste any job description and AI instantly extracts the role details, required skills, and writes a tailored cover letter. Track every application from first click to signed offer.",
  keywords: [
    "job tracker",
    "job application tracker",
    "AI job search",
    "cover letter generator",
    "job board",
    "career tracker",
  ],
  authors: [{ name: "JobTracker" }],
  creator: "JobTracker",
  metadataBase: new URL(
    process.env.NEXTAUTH_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    title: "JobTracker — AI-Powered Job Application Tracker",
    description:
      "Paste any job description and AI instantly extracts the role details, required skills, and writes a tailored cover letter.",
    siteName: "JobTracker",
    images: [
      {
        url: "/bg.jpg",
        width: 800,
        height: 1200,
        alt: "JobTracker — AI-Powered Job Application Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobTracker — AI-Powered Job Application Tracker",
    description:
      "Track every job application with AI-powered parsing and cover letter generation.",
    images: ["/bg.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster
            richColors
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: "var(--font-inter)",
                borderRadius: "12px",
                fontSize: "13px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}