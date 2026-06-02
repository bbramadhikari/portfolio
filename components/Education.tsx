"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";
import { education } from "@/data/resume";
import { Section } from "./Section";

export function Education() {
  const e = education[0];
  if (!e) return null;

  const details = [
    { label: "Degree", value: "Master of Science (MSc)" },
    { label: "Field", value: "Computer Science" },
    { label: "Campus", value: e.location },
    { label: "Duration", value: `${e.start} – ${e.end}` },
  ];

  return (
    <Section id="education" eyebrow="Education" title="Academic background">
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="card card-hover overflow-hidden"
      >
        <div className="grid gap-0 lg:grid-cols-5">
          {/* Main */}
          <div className="p-7 sm:p-8 lg:col-span-3">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral-50 text-coral-500 dark:bg-coral-500/10 dark:text-coral-400">
                <GraduationCap size={24} />
              </span>
              <div>
                <h3 className="text-lg font-bold leading-snug">{e.degree}</h3>
                <p className="mt-0.5 text-sm font-semibold text-coral-700 dark:text-coral-400">
                  {e.school}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} /> {e.start} – {e.end}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} /> {e.location}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {e.focus}
            </p>

            <div className="mt-6">
              <p className="mb-2.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <BookOpen size={13} /> Relevant coursework
              </p>
              <div className="flex flex-wrap gap-1.5">
                {e.coursework.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Details panel */}
          <div className="border-t border-slate-100 bg-slate-50/70 p-7 sm:p-8 lg:col-span-2 lg:border-l lg:border-t-0 dark:border-navy-800 dark:bg-navy-900/40">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Program details
            </p>
            <dl className="mt-4 space-y-3.5">
              {details.map((d) => (
                <div key={d.label} className="flex flex-col">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {d.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-navy-800 dark:text-slate-100">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </motion.article>
    </Section>
  );
}
