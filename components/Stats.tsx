"use client";

import { motion } from "framer-motion";
import { Database, TrendingUp, Clock, BarChart3, type LucideIcon } from "lucide-react";
import { stats } from "@/data/resume";

const iconMap: Record<string, LucideIcon> = { Database, TrendingUp, Clock, BarChart3 };

export function Stats() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/60 py-14 dark:border-navy-800 dark:bg-navy-900/40">
      <div className="container-px">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Database;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="card group p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-500/10 text-teal-600 transition-transform group-hover:scale-110 dark:text-teal-400">
                    <Icon size={18} />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    KPI
                  </span>
                </div>
                <p className="mt-3 text-3xl font-extrabold gradient-text">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {s.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
