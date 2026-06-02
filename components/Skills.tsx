"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Brain,
  Cloud,
  Code2,
  Database,
  PieChart,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { skillHighlights } from "@/data/resume";
import { Section } from "./Section";

const iconMap: Record<string, LucideIcon> = {
  Database,
  Code2,
  BarChart3,
  PieChart,
  Brain,
  Cloud,
};

// Per-skill icon accent so the grid feels like the reference's branded tiles.
const accentMap: Record<string, string> = {
  sky: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  yellow:
    "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  violet:
    "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills Dashboard"
      title="The analytics toolkit I work with daily"
      intro="From SQL and Python to Power BI, Tableau, and machine learning — the stack I use to clean data, build pipelines, and ship decision-ready dashboards."
      action={
        <Link
          href="#projects"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-coral-700 hover:gap-2.5 transition-all dark:text-coral-400"
        >
          See it applied <ArrowUpRight size={16} aria-hidden />
        </Link>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillHighlights.map((s, i) => {
          const Icon = iconMap[s.icon] ?? Code2;
          const accent = accentMap[s.accent] ?? accentMap.sky;
          return (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card card-hover group flex items-center gap-4 p-6"
            >
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-transform group-hover:scale-110 ${accent}`}
              >
                <Icon size={26} />
              </span>
              <div>
                <h3 className="text-base font-bold">{s.name}</h3>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {s.caption}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
