"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { experience } from "@/data/resume";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Professional Experience"
      title="Roles where I shipped analytics that moved KPIs"
      intro="Hands-on Data & Business Analyst experience across product, operations, and finance datasets."
    >
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-teal-500/40 via-slate-200 to-transparent sm:block dark:via-navy-800" />

        <div className="space-y-8">
          {experience.map((e, i) => (
            <motion.article
              key={e.company}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative sm:pl-14"
            >
              <span className="absolute left-0 top-3 hidden h-8 w-8 place-items-center rounded-full border-2 border-teal-500 bg-white text-teal-600 sm:grid dark:bg-navy-950 dark:text-teal-400">
                <Briefcase size={14} />
              </span>

              <div className="card p-6">
                <header className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold">{e.role}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-teal-600 dark:text-teal-400">
                      {e.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} /> {e.start} – {e.end}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} /> {e.location}
                    </span>
                  </div>
                </header>

                <ul className="mt-4 space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                  {e.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {e.stack.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
