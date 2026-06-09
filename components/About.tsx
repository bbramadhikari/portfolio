"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BadgeCheck, MapPin, Briefcase } from "lucide-react";
import { about, profile } from "@/data/resume";
import { Section } from "./Section";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About Me"
      title="A little about how I work"
    >
      <div className="grid items-start gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {about.summary}
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            I&apos;m a data analyst based in {profile.location}, with an MSc in
            Computer Science from Algoma University. Day to day I work in SQL,
            Python, and Power BI, and I spend a fair bit of time talking to
            stakeholders to figure out what they actually need. I&apos;m at my
            best taking a vague business question and turning it into a clear
            answer — a query, a dashboard, or a report someone can act on.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {about.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-navy-800 dark:bg-navy-900/40"
              >
                <BadgeCheck className="mt-0.5 shrink-0 text-coral-500" size={18} />
                <span className="text-slate-700 dark:text-slate-300">{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-coral-700 dark:text-coral-400">
              Quick facts
            </h3>
            <ul className="mt-4 space-y-4 text-sm">
              <Fact
                icon={<MapPin size={16} />}
                label="Location"
                value="Edmonton, AB, Canada"
              />
              <Fact
                icon={<GraduationCap size={16} />}
                label="Education"
                value="MSc Computer Science — Algoma University, ON"
              />
              <Fact
                icon={<BadgeCheck size={16} />}
                label="Certification"
                value="IBM Data Analyst Professional Certificate, 2025"
              />
              <Fact
                icon={<Briefcase size={16} />}
                label="Experience"
                value="Data Analyst @ Leapfrog Technology · Data & Business Analyst @ APAR Nepal"
              />
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-coral-500/10 text-coral-600 dark:text-coral-400">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-slate-700 dark:text-slate-200">{value}</p>
      </div>
    </li>
  );
}
