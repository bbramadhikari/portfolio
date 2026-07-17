"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, MapPin, Send, TrendingUp } from "lucide-react";
import { profile } from "@/data/resume";

export function Hero() {
  return (
    <section id="hero" className="scroll-mt-8">
      <div className="relative overflow-hidden rounded-3xl bg-navy-950 text-white shadow-card">
        {/* Decorative background */}
        <div className="hero-aurora absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_75%)]"
          aria-hidden
        />
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-coral-500/30 blur-3xl"
          aria-hidden
        />

        <div className="relative grid items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-6 lg:px-14">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="text-sm font-semibold tracking-wide text-coral-400">
              Hello, I&apos;m
            </p>
            <h1 className="mt-1 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {profile.name}
              <span className="text-coral-500">.</span>
            </h1>
            <p className="mt-3 text-sm font-medium text-slate-300 sm:text-base">
              Data Analyst <span className="text-coral-400">|</span> Business
              Intelligence <span className="text-coral-400">|</span> Machine
              Learning
            </p>

            <h2 className="mt-6 max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl">
              Turning Data Into{" "}
              <span className="gradient-text">Business Decisions</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              I&apos;m a data analyst with 4+ years of experience. I take raw,
              messy data and turn it into dashboards and reports that help teams
              make decisions without second-guessing the numbers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#projects" className="btn-primary">
                View Projects <ArrowRight size={16} aria-hidden />
              </Link>
              <a href={profile.resumeUrl} download className="btn-dark">
                <Download size={16} aria-hidden /> Download Resume
              </a>
              <Link href="#contact" className="btn-dark">
                Contact Me <Send size={15} aria-hidden />
              </Link>
            </div>

            <p className="mt-7 inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <MapPin size={14} aria-hidden /> {profile.location} · Data Analyst
              &amp; BI
            </p>
          </motion.div>

          {/* Right: portrait + floating analytics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-sm lg:col-span-5"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-square w-full">
      {/* Ambient glow anchoring the composition */}
      <div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral-500/20 blur-3xl"
        aria-hidden
      />

      {/* Top-left: Data Quality donut */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute left-0 top-2 z-20 w-36 -rotate-3 p-3 text-white shadow-lift"
      >
        <p className="text-[10px] font-medium leading-tight text-slate-200">
          Data Quality
          <br />
          Improvement
        </p>
        <div className="mt-2 grid place-items-center">
          <Donut value={30} />
        </div>
      </motion.div>

      {/* Top-right: Insights Generated sparkline */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
        className="glass absolute right-0 top-16 z-30 w-44 rotate-2 p-3 text-white shadow-lift"
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-slate-100">
            Records Analysed
          </p>
          <span className="rounded-md bg-coral-500/90 px-1.5 py-0.5 text-[10px] font-bold">
            500K+
          </span>
        </div>
        <Sparkline />
      </motion.div>

      {/* Center accent chip — ties the cluster together */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9,
        }}
        className="glass absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-3.5 py-2 text-white shadow-lift"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral-500" />
        </span>
        <span className="text-[11px] font-semibold tracking-wide">
          IBM Data Analyst Certified
        </span>
      </motion.div>

      {/* Bottom: Reports Automated bars */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.1,
        }}
        className="glass absolute bottom-2 left-1/2 z-20 w-40 -translate-x-1/2 -rotate-2 p-3 text-white shadow-lift"
      >
        <p className="text-[11px] font-semibold text-slate-100">
          Less Manual Reporting
        </p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-2xl font-extrabold">20%</span>
          <TrendingUp size={14} className="text-coral-400" aria-hidden />
        </div>
        <div className="mt-2 flex h-8 items-end gap-1">
          {[35, 50, 42, 64, 58, 78, 70, 92].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-sm bg-gradient-to-t from-coral-600 to-coral-400"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Donut({ value }: { value: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-16 w-16">
      <svg viewBox="0 0 56 56" className="h-16 w-16 -rotate-90">
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="6"
        />
        <motion.circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#ff5a5f"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-sm font-extrabold">
        {value}%
      </span>
    </div>
  );
}

function Sparkline() {
  const pts = "0,28 14,22 28,25 42,14 56,18 70,8 84,12 98,3";
  return (
    <svg viewBox="0 0 100 32" className="mt-2 h-10 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff5a5f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff5a5f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,32 ${pts} 100,32`} fill="url(#spark)" />
      <motion.polyline
        points={pts}
        fill="none"
        stroke="#ff7b80"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  );
}
