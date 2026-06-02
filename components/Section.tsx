"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  action,
  align = "left",
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  action?: ReactNode;
  align?: "left" | "center";
  children: ReactNode;
}) {
  const centered = align === "center";
  return (
    <section id={id} className="section">
      {(eyebrow || title || intro) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={`mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
            centered ? "text-center sm:flex-col sm:items-center" : ""
          }`}
        >
          <div className={centered ? "mx-auto max-w-2xl" : "max-w-2xl"}>
            {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
            {title && <h2 className="section-title mt-2">{title}</h2>}
            {intro && (
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {intro}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </motion.div>
      )}
      {children}
    </section>
  );
}
