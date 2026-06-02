import { Linkedin, Mail } from "lucide-react";
import { GithubIcon } from "./GithubIcon";
import { profile } from "@/data/resume";

const iconClass =
  "rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-navy-800 dark:text-slate-400 dark:hover:bg-navy-800 dark:hover:text-white";

const socials = [
  {
    href: profile.linkedin,
    label: "LinkedIn",
    icon: <Linkedin size={18} />,
    external: true,
  },
  {
    href: profile.github,
    label: "GitHub",
    icon: <GithubIcon size={18} />,
    external: true,
  },
  {
    href: `mailto:${profile.email}`,
    label: "Email",
    icon: <Mail size={18} />,
    external: false,
    title: profile.email,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-navy-800 dark:bg-navy-950">
      <div className="container-px flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {socials.map(({ href, label, icon, external, title }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={title}
              className={iconClass}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
