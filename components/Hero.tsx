"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { profile } from "@/data/resume";
import { GithubIcon } from "./GithubIcon";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_80%)]" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/20 via-teal-400/15 to-transparent blur-3xl animate-pulse-slow" />

      <div className="container-px grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <span className="chip mb-5 gap-1.5">
            <Sparkles size={12} className="text-teal-500" aria-hidden />
            Open to Data Analyst roles in Canada
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I'm <span className="gradient-text">{profile.name}</span>
            <br />
            <span className="text-slate-700 dark:text-slate-300">
              I turn data into business decisions.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            {profile.title}. {profile.tagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={profile.resumeUrl} download className="btn-primary">
              <Download size={16} aria-hidden /> Download Resume
            </a>
            <Link href="#projects" className="btn-ghost">
              View Projects <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="#contact" className="btn-ghost">
              Contact Me
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} aria-hidden /> {profile.location}
            </span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-navy-800 dark:hover:text-white"
            >
              <Linkedin size={14} aria-hidden /> LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-navy-800 dark:hover:text-white"
            >
              <GithubIcon size={14} /> GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 hover:text-navy-800 dark:hover:text-white"
            >
              <Mail size={14} aria-hidden /> {profile.email}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5"
        >
          <HeroDashboardCard />
        </motion.div>
      </div>
    </section>
  );
}

function HeroDashboardCard() {
  const bars = [38, 64, 52, 78, 60, 88, 72];
  return (
    <div className="card relative overflow-hidden p-6">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-transparent to-teal-400/10" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-500">
            Live KPI Snapshot
          </p>
          <h3 className="mt-1 text-lg font-bold">Reporting impact</h3>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <MiniStat label="Records" value="500K+" />
        <MiniStat label="Quality" value="+30%" />
        <MiniStat label="Reporting" value="-25%" />
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          Weekly dashboard usage
        </p>
        <div className="flex h-28 items-end gap-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.06 }}
              className="flex-1 rounded-t-md bg-gradient-to-t from-navy-700 to-teal-400 dark:from-teal-500 dark:to-blue-400"
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-500 dark:text-slate-400">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-navy-900">
          <p className="text-slate-500 dark:text-slate-400">Power BI</p>
          <p className="text-base font-bold">Dashboards</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-navy-900">
          <p className="text-slate-500 dark:text-slate-400">Python</p>
          <p className="text-base font-bold">ETL + EDA</p>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-center dark:border-navy-800 dark:bg-navy-900/50">
      <p className="text-xl font-extrabold gradient-text">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}
