"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Award, ExternalLink, FileText, Radar, ScanFace, ShieldCheck } from "lucide-react";
import { projects, profile, type Project, type ProjectCategory } from "@/data/resume";
import { Section } from "./Section";
import { GithubIcon } from "./GithubIcon";

const FILTERS: ("All" | ProjectCategory)[] = [
  "All",
  "Data Analytics",
  "BI",
  "Machine Learning",
  "NLP",
  "Computer Vision",
  "Security",
];

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category.includes(filter as ProjectCategory)),
    [filter],
  );

  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Selected analytics & data science work"
      intro="A mix of analytics, machine learning, NLP, and computer-vision projects — two of them peer-reviewed and published."
      action={
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-coral-700 hover:gap-2.5 hover:text-coral-800 transition-all dark:text-coral-400"
        >
          View All Projects <ArrowUpRight size={16} aria-hidden />
        </a>
      }
    >
      <div className="mb-7 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              filter === f
                ? "bg-coral-500 text-white shadow-glow"
                : "border border-slate-200 bg-white text-slate-600 hover:border-coral-300 hover:text-coral-600 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </AnimatePresence>
    </Section>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <Thumb accent={p.accent} headline={p.headline} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {p.published && (
            <span className="inline-flex items-center gap-1 rounded-full bg-coral-50 px-2.5 py-0.5 text-[11px] font-bold text-coral-700 dark:bg-coral-500/10 dark:text-coral-300">
              <Award size={11} /> {p.published}
            </span>
          )}
          {p.category.slice(0, 1).map((c) => (
            <span
              key={c}
              className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:border-navy-700 dark:text-slate-400"
            >
              {c}
            </span>
          ))}
        </div>

        <h3 className="mt-3 text-base font-bold leading-snug">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {p.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tools.slice(0, 5).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 dark:border-navy-800">
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-coral-600 dark:text-slate-100 dark:hover:text-coral-300"
            >
              <GithubIcon size={15} /> GitHub
            </a>
          )}
          {p.repos?.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-coral-600 dark:text-slate-100 dark:hover:text-coral-300"
            >
              <GithubIcon size={15} /> {r.label}
            </a>
          ))}
          {p.doi && (
            <a
              href={p.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-coral-600 dark:text-slate-100 dark:hover:text-coral-300"
            >
              <ExternalLink size={15} /> DOI
            </a>
          )}
          {p.pdf && (
            <a
              href={p.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-coral-600 dark:text-slate-100 dark:hover:text-coral-300"
            >
              <FileText size={15} /> Paper
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

const GRADIENTS: Record<string, string> = {
  fraud: "from-navy-800 via-navy-900 to-navy-950",
  ecommerce: "from-violet-900 via-navy-900 to-navy-950",
  nlp: "from-navy-900 via-emerald-950 to-navy-950",
  vision: "from-amber-950 via-navy-900 to-navy-950",
  security: "from-cyan-950 via-navy-900 to-navy-950",
  drone: "from-emerald-950 via-navy-900 to-navy-950",
  default: "from-navy-800 to-navy-950",
};

function Thumb({
  accent = "default",
  headline,
}: {
  accent?: Project["accent"] | "default";
  headline?: Project["headline"];
}) {
  const gradient = GRADIENTS[accent ?? "default"] ?? GRADIENTS.default;
  return (
    <div
      className={`relative h-40 overflow-hidden bg-gradient-to-br ${gradient}`}
    >
      <div className="grid-bg absolute inset-0 opacity-25" aria-hidden />
      <ThumbMotif accent={accent} />
      {headline && (
        <div className="absolute bottom-3 left-4 z-10">
          <p className="text-2xl font-black text-white drop-shadow">
            {headline.value}
          </p>
          <p className="text-[11px] font-medium text-slate-300">
            {headline.label}
          </p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}

function ThumbMotif({ accent }: { accent?: Project["accent"] | "default" }) {
  if (accent === "ecommerce") {
    return (
      <div className="absolute right-4 top-4 flex h-20 items-end gap-1.5 opacity-90">
        {[40, 64, 52, 80, 70, 95].map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className="w-3 rounded-t bg-gradient-to-t from-coral-600 to-coral-400"
          />
        ))}
      </div>
    );
  }
  if (accent === "vision") {
    return (
      <div className="absolute right-6 top-5 grid place-items-center">
        {[64, 44, 24].map((s, i) => (
          <span
            key={i}
            style={{ height: s, width: s, gridArea: "1 / 1" }}
            className="place-self-center rounded-full border-2 border-coral-400/70"
          />
        ))}
        <span
          style={{ gridArea: "1 / 1" }}
          className="h-2.5 w-2.5 place-self-center rounded-full bg-coral-500"
        />
      </div>
    );
  }
  if (accent === "drone") {
    return (
      <div className="absolute right-5 top-5">
        <div className="relative h-20 w-24">
          {/* detection bounding box */}
          <span className="absolute inset-0 rounded-md border-2 border-coral-400/80" />
          <span className="absolute -left-0.5 -top-0.5 h-3 w-3 border-l-2 border-t-2 border-coral-300" />
          <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 border-b-2 border-r-2 border-coral-300" />
          <span className="absolute left-1.5 top-1 rounded bg-coral-500 px-1 text-[8px] font-bold text-white">
            person
          </span>
          <Radar
            size={22}
            className="absolute bottom-1.5 right-1.5 text-coral-300"
            aria-hidden
          />
        </div>
      </div>
    );
  }
  if (accent === "security") {
    return (
      <div className="absolute right-5 top-5 flex items-center gap-3 opacity-95">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-coral-400/70 text-coral-300">
          <ScanFace size={26} />
        </span>
        <ShieldCheck size={30} className="text-coral-400" aria-hidden />
      </div>
    );
  }
  if (accent === "nlp") {
    return (
      <div className="absolute right-4 top-4 flex w-28 flex-wrap gap-1.5 opacity-90">
        {["भावना", "text", "BiLSTM", "NLP", "रोमन", "CNN"].map((w, i) => (
          <span
            key={w}
            className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
              i % 3 === 0
                ? "bg-coral-500/80 text-white"
                : "bg-white/10 text-slate-200"
            }`}
          >
            {w}
          </span>
        ))}
      </div>
    );
  }
  // fraud / default — sparkline + ring
  return (
    <div className="absolute right-5 top-5">
      <svg viewBox="0 0 90 44" className="h-16 w-28" preserveAspectRatio="none">
        <polyline
          points="0,38 15,30 30,34 45,18 60,24 75,8 90,14"
          fill="none"
          stroke="#ff7b80"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {[
          [15, 30],
          [45, 18],
          [75, 8],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="2.5" fill="#fff" />
        ))}
      </svg>
    </div>
  );
}
