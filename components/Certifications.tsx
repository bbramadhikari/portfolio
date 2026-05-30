"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";
import { certifications, awards } from "@/data/resume";
import { Section } from "./Section";

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications & Awards"
      title="Credentials that back the work"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card flex items-start gap-3 p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <CheckCircle2 size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-bold leading-snug">{c.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {c.issuer} {c.year !== "—" && `· ${c.year}`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="card p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-amber-500/10 text-amber-500">
                <Award size={20} />
              </span>
              <h3 className="text-base font-bold">Awards & Recognition</h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              {awards.map((a) => (
                <li key={a} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
