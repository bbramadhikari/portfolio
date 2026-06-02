"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:border-coral-300 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-100 dark:hover:border-coral-400/60"
    >
      <span className="inline-flex items-center gap-2">
        {isDark ? (
          <Moon size={16} className="text-coral-400" aria-hidden />
        ) : (
          <Sun size={16} className="text-coral-500" aria-hidden />
        )}
        Dark Mode
      </span>
      <span
        aria-hidden
        className={`relative h-5 w-9 rounded-full transition-colors ${
          isDark ? "bg-coral-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
            isDark ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
