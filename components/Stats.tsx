"use client";

import { motion } from "framer-motion";
import {
  Database,
  TrendingUp,
  Clock,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { stats } from "@/data/resume";

const iconMap: Record<string, LucideIcon> = {
  Database,
  TrendingUp,
  Clock,
  FileText,
};

export function Stats() {
  return (
    <section className="relative z-10 -mt-8 px-1 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="card grid grid-cols-2 gap-y-6 p-6 sm:p-8 lg:grid-cols-4 lg:divide-x lg:divide-slate-200 dark:lg:divide-navy-800"
      >
        {stats.map((s, i) => {
          const Icon = iconMap[s.icon] ?? Database;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex items-start gap-3.5 px-2 lg:px-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-coral-50 text-coral-500 transition-transform group-hover:scale-110 dark:bg-coral-500/10 dark:text-coral-400">
                <Icon size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-2xl font-black tracking-tight sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-0.5 text-sm font-semibold leading-tight text-navy-800 dark:text-slate-100">
                  {s.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {s.sub}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
