"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const stats = [
  { value: 2400, suffix: "+", label: "Engineers" },
  { value: 3, prefix: "< ", suffix: "s", label: "Parse time" },
  { value: 100, suffix: "%", label: "Free" },
];

// Company logos using SVG paths from Simple Icons
const companies = [
  {
    name: "Google",
    color: "#4285F4",
    path: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
  },
  {
    name: "Microsoft",
    color: "#F25022",
    path: "M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z",
  },
  {
    name: "Amazon",
    color: "#FF9900",
    path: "M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 0 1-4.445.572c-2.52 0-4.795-.438-6.834-1.323-1.44-.614-2.74-1.462-3.9-2.544-.427-.395-.476-.73-.308-1.02v.046zm17.224-7.82c.54 0 .976.17 1.304.514.33.343.493.792.493 1.347 0 .56-.17 1.015-.507 1.366-.337.35-.78.525-1.328.525-.545 0-.985-.175-1.32-.525-.337-.35-.506-.806-.506-1.366 0-.555.169-1.004.506-1.347.335-.343.775-.514 1.358-.514zm-8.85 0c.54 0 .977.17 1.306.514.33.343.494.792.494 1.347 0 .56-.17 1.015-.507 1.366-.337.35-.78.525-1.328.525-.545 0-.985-.175-1.32-.525-.337-.35-.505-.806-.505-1.366 0-.555.168-1.004.505-1.347.335-.343.775-.514 1.357-.514zM12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12C24 5.372 18.628 0 12 0zm0 3.6c4.64 0 8.4 3.76 8.4 8.4 0 4.64-3.76 8.4-8.4 8.4-4.64 0-8.4-3.76-8.4-8.4 0-4.64 3.76-8.4 8.4-8.4z",
  },
  {
    name: "Apple",
    color: "#555555",
    path: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z",
  },
  {
    name: "Meta",
    color: "#0082FB",
    path: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.186-.325.372-.65.558-.975.372-.65.743-1.3 1.115-1.95l.372-.65.186-.325.186-.325.186-.325.186-.325.186-.325.186-.325.186-.325.186-.325.186-.325.186-.325c.186-.325.372-.65.558-.975.372-.65.743-1.3 1.115-1.95l.372-.65.186-.325.186-.325.186-.325.186-.325.186-.325.186-.325.186-.325.186-.325.186-.325.186-.325c.186-.325.372-.65.558-.975C20.37 5.49 21.5 4.03 23.085 4.03c1.775 0 2.897.768 3.593 1.927a5.297 5.297 0 0 0 .371.761c.098.28.186.563.265.86.14.604.21 1.267.21 1.973 0 2.566-.704 5.24-2.044 7.306-1.188 1.833-2.903 3.113-4.871 3.113-1.497 0-2.633-.671-3.965-2.444-.76-1.012-1.144-1.626-2.663-4.32l-.756-1.339-.186-.325c-.186-.325-.372-.65-.558-.975-.372-.65-.743-1.3-1.115-1.95l-.372-.65-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325c-.186-.325-.372-.65-.558-.975-.372-.65-.743-1.3-1.115-1.95l-.372-.65-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325-.186-.325C9.548 5.49 8.42 4.03 6.915 4.03z",
  },
  {
    name: "Netflix",
    color: "#E50914",
    path: "M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z",
  },
  {
    name: "Spotify",
    color: "#1DB954",
    path: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
  },
  {
    name: "Airbnb",
    color: "#FF5A5F",
    path: "M11.994 0C5.367 0 0 5.367 0 12c0 6.633 5.367 12 11.994 12C18.633 24 24 18.633 24 12c0-6.633-5.367-12-12.006-12zM12 3.76c1.307 0 2.37 1.063 2.37 2.37 0 1.307-1.063 2.37-2.37 2.37-1.307 0-2.37-1.063-2.37-2.37C9.63 4.823 10.693 3.76 12 3.76zm5.77 12.193c-.068.233-.344.403-.608.36-1.75-.52-3.482-.767-5.204-.756-1.722-.011-3.455.236-5.205.756-.263.043-.54-.127-.607-.36-.067-.24.093-.48.34-.553 1.862-.553 3.716-.815 5.472-.804 1.757-.011 3.61.251 5.472.804.247.073.407.313.34.553zm-.627-2.79c-.09.286-.43.462-.765.354-2.042-.616-4.09-.923-6.376-.923-2.283 0-4.334.307-6.376.923-.335.108-.676-.068-.765-.354-.09-.286.09-.593.424-.7 2.175-.658 4.366-.98 6.717-.98 2.35 0 4.54.322 6.717.98.334.107.513.414.424.7zm.524-2.927c-.1.327-.487.527-.87.403-2.349-.703-4.703-1.054-7.299-1.054-2.596 0-4.95.351-7.3 1.054-.383.124-.77-.076-.87-.403-.1-.327.103-.669.487-.793C4.24 9.28 6.743 8.916 9.499 8.916c2.755 0 5.258.364 7.663 1.027.384.124.587.466.487.793h-.002z",
  },
  {
    name: "Twitter",
    color: "#1DA1F2",
    path: "M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z",
  },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let pos = 0;
    let frame: number;
    const tick = () => {
      pos += 0.4;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative overflow-hidden px-6 md:px-10 pt-16 pb-12 max-w-6xl mx-auto">
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full bg-primary/8 blur-3xl -z-10 pointer-events-none"
      />

      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-6">
            <Sparkles className="w-3 h-3 text-primary" />
            AI-powered · Built for engineers
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-[1.08]"
        >
          Your job search,
          <br />
          <span className="text-primary">finally organized.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Paste any job description. AI extracts every detail and writes a
          tailored cover letter in seconds. Track every application from first
          click to signed offer.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              See how it works
            </Link>
          </motion.div>
        </motion.div>

        {/* CountUp stats */}
        <motion.div
          ref={inViewRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-10 mb-12"
        >
          {stats.map(({ value, prefix, suffix, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading font-bold text-2xl text-foreground">
                {prefix}
                {inView ? (
                  <CountUp end={value} duration={2} separator="," />
                ) : (
                  "0"
                )}
                {suffix}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Company logos slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <p className="text-xs text-center text-muted-foreground mb-4 uppercase tracking-widest font-medium">
          Trusted by engineers at
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
          <div
            ref={ref}
            className="flex gap-4 overflow-hidden"
            style={{ scrollBehavior: "auto" }}
          >
            {[...companies, ...companies].map((company, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border bg-card shrink-0"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 shrink-0"
                  style={{ fill: company.color }}
                >
                  <path d={company.path} />
                </svg>
                <span className="text-xs font-medium text-muted-foreground">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}