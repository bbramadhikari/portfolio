"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Brain,
  Cloud,
  Code2,
  Database,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/data/resume";
import { Section } from "./Section";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  LineChart,
  BarChart3,
  Database,
  Brain,
  Cloud,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Skills"
      title="The analytics toolkit I work with daily"
      intro="From SQL and Python to Power BI and machine learning, here's the stack I use to clean data, build pipelines, and ship dashboards."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] ?? Code2;
          return (
            <motion.article
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="card p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Icon size={20} />
                </span>
                <h3 className="text-base font-bold">{cat.title}</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {cat.skills.map((s) => (
                  <li key={s.name}>
                    <div className="mb-1 flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-200">
                        {s.name}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {s.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-navy-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-navy-700 to-teal-400 dark:from-teal-500 dark:to-blue-400"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
