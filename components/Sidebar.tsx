"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  FolderKanban,
  Briefcase,
  Sparkles,
  Award,
  GraduationCap,
  Mail,
  Download,
  Menu,
  X,
  Linkedin,
} from "lucide-react";
import { profile } from "@/data/resume";
import { GithubIcon } from "./GithubIcon";
import { ThemeSwitch } from "./ThemeSwitch";

const NAV = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

function Logo() {
  return (
    <Link
      href="#hero"
      aria-label={`${profile.name} — home`}
      className="flex items-center gap-2.5"
    >
      <Image
        src="/logo.png"
        alt="Baburam Adhikari logo"
        width={44}
        height={44}
        priority
        className="h-11 w-11 object-contain"
      />
      <span className="text-sm font-bold leading-tight lg:hidden xl:inline">
        Baburam
        <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
          Adhikari
        </span>
      </span>
    </Link>
  );
}

function NavList({ active, onNavigate }: { active: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Primary" className="flex flex-col gap-1">
      {NAV.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <Link
            key={id}
            href={`#${id}`}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
              isActive
                ? "bg-coral-50 text-coral-700 shadow-[inset_3px_0_0_0_#ff5a5f] dark:bg-coral-500/10 dark:text-coral-300 dark:shadow-[inset_3px_0_0_0_#ff7b80]"
                : "text-slate-500 hover:bg-slate-100 hover:text-navy-900 dark:text-slate-400 dark:hover:bg-navy-800/60 dark:hover:text-white"
            }`}
          >
            <Icon
              size={18}
              className={`shrink-0 ${isActive ? "text-coral-500 dark:text-coral-300" : ""}`}
              aria-hidden
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="space-y-4">
      <ThemeSwitch />

      <a
        href={profile.resumeUrl}
        download
        onClick={onNavigate}
        className="btn-primary w-full"
      >
        <Download size={16} aria-hidden /> Download Resume
      </a>

      <div>
        <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Connect with me
        </p>
        <div className="flex items-center gap-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:-translate-y-0.5 hover:border-coral-300 hover:text-coral-600 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-400 dark:hover:text-coral-300"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:-translate-y-0.5 hover:border-coral-300 hover:text-coral-600 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-400 dark:hover:text-coral-300"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            title={profile.email}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:-translate-y-0.5 hover:border-coral-300 hover:text-coral-600 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-400 dark:hover:text-coral-300"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      <p className="px-1 text-[11px] leading-relaxed text-slate-400">
        © {new Date().getFullYear()} {profile.name}.
        <br />
        All rights reserved.
      </p>
    </div>
  );
}

export function Sidebar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  // Scroll-spy: the active link is the section whose top has most recently
  // crossed a detection line ~30% down the viewport. This is height-agnostic
  // (unlike intersectionRatio, which under-weights tall sections).
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    let raf = 0;

    const update = () => {
      raf = 0;
      const lineY = window.innerHeight * 0.3;

      // Bottom of the page → force the last section active so the final
      // (often short) section can still be reached.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      let bestTop = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - lineY;
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          current = id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop: floating fixed sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col border-r border-slate-200 bg-white/80 px-5 py-6 backdrop-blur-xl lg:flex dark:border-navy-800 dark:bg-navy-950/80">
        <Logo />
        <div className="mt-9 flex-1 overflow-y-auto pr-1">
          <NavList active={active} />
        </div>
        <SidebarFooter />
      </aside>

      {/* Mobile: top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur-xl lg:hidden dark:border-navy-800 dark:bg-navy-950/85">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-navy-800 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-100"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile: drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col border-r border-slate-200 bg-white px-5 py-6 lg:hidden dark:border-navy-800 dark:bg-navy-950"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-navy-800 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-100"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="mt-8 flex-1 overflow-y-auto pr-1">
                <NavList active={active} onNavigate={() => setOpen(false)} />
              </div>
              <SidebarFooter onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
