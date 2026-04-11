import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { App } from "@/components/landing/App";
import { Benefits } from "@/components/landing/Benefits";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <App />
      <Benefits />
      <FAQ />
      <CTA />
    </main>
  );
}