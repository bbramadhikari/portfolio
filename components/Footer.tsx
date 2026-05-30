import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-navy-800 dark:bg-navy-950">
      <div className="container-px flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind, Framer Motion.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-navy-800 dark:text-slate-400 dark:hover:bg-navy-800 dark:hover:text-white"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-navy-800 dark:text-slate-400 dark:hover:bg-navy-800 dark:hover:text-white"
          >
            <Github size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-navy-800 dark:text-slate-400 dark:hover:bg-navy-800 dark:hover:text-white"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
