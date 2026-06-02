"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { experience } from "@/data/resume";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience Timeline"
      title="Roles where I shipped analytics that moved KPIs"
      intro="Hands-on Data & Business Analyst experience across product, operations, and finance datasets."
    >
      <div className="relative">
        {/* Timeline spine */}
        <div className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-coral-500 via-coral-300 to-transparent sm:block dark:via-coral-500/30" />

        <div className="space-y-6">
          {experience.map((e, i) => (
            <motion.article
              key={e.company}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative sm:pl-16"
            >
              <span className="absolute left-0 top-5 z-10 hidden h-10 w-10 place-items-center rounded-full bg-coral-500 text-white shadow-glow ring-4 ring-white sm:grid dark:ring-navy-950">
                <Briefcase size={16} />
              </span>

              <div className="card card-hover p-6">
                <header className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold">{e.role}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-coral-700 dark:text-coral-400">
                      {e.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-1 text-xs text-slate-500 sm:items-end dark:text-slate-400">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-semibold dark:bg-navy-800">
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
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" />
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
