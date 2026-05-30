"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, TrendingUp } from "lucide-react";
import { projects, type ProjectCategory } from "@/data/resume";
import { Section } from "./Section";

const FILTERS: ("All" | ProjectCategory)[] = [
  "All",
  "Data Analytics",
  "BI",
  "Machine Learning",
  "NLP",
  "Computer Vision",
];

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category.includes(filter as ProjectCategory)),
    [filter]
  );

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected analytics & data science work"
      intro="Production-aware projects spanning fraud analytics, e-commerce recommendation, NLP, and computer vision."
    >
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
              filter === f
                ? "border-transparent bg-navy-800 text-white dark:bg-teal-500 dark:text-navy-950"
                : "border-slate-200 bg-white text-slate-600 hover:border-teal-400 hover:text-navy-800 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((p, i) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="card group flex flex-col p-6"
            >
              <header className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  {p.published && (
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400">
                      <Award size={12} /> {p.published}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap justify-end gap-1">
                  {p.category.map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </header>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {p.description}
              </p>

              <div className="mt-4 rounded-lg border border-teal-500/20 bg-teal-500/5 p-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  <TrendingUp size={12} /> Business value
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  {p.value}
                </p>
              </div>

              <ul className="mt-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                {p.metrics.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tools.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:underline dark:text-teal-400"
                >
                  View Case Study / GitHub <ExternalLink size={14} />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </AnimatePresence>
    </Section>
  );
}
