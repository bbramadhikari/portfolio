"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { education } from "@/data/resume";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <motion.article
            key={e.degree}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="card p-6"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <GraduationCap size={20} />
              </span>
              <div>
                <h3 className="text-base font-bold">{e.degree}</h3>
                <p className="mt-0.5 text-sm font-semibold text-teal-600 dark:text-teal-400">
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
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                  {e.note}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
