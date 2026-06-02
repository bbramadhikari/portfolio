"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { GithubIcon } from "./GithubIcon";
import { profile } from "@/data/resume";
import { Section } from "./Section";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type Status = "idle" | "loading" | "success" | "error";

const INITIAL: FormState = { name: "", email: "", message: "", website: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    else if (form.name.length > 100) e.name = "Name is too long.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.message.trim() || form.message.length < 10)
      e.message = "Message should be at least 10 characters.";
    else if (form.message.length > 5000)
      e.message = "Message must be 5000 characters or fewer.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerMsg("");
    try {
      const res = await fetch("https://formspree.io/f/xdajvayy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Something went wrong.");
      setStatus("success");
      setServerMsg(data?.message || "Thanks — I'll get back to you shortly.");
      setForm(INITIAL);
    } catch (err) {
      setStatus("error");
      setServerMsg(
        err instanceof Error ? err.message : "Unable to send. Email me directly.",
      );
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Work Together"
      intro="Have a project or opportunity? I'd love to hear from you. Available for Data Analyst, BI Analyst, and Business Analyst roles across Canada."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          onSubmit={onSubmit}
          noValidate
          className="card p-7 lg:col-span-3"
          aria-label="Contact form"
        >
          {/* Honeypot */}
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
          >
            <label htmlFor="website">Website (leave blank)</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Your Name"
              name="name"
              autoComplete="name"
              maxLength={100}
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              error={errors.name}
              placeholder="Jane Recruiter"
              required
            />
            <Field
              label="Your Email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={150}
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              error={errors.email}
              placeholder="you@company.com"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="message"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Your Message{" "}
              <span className="text-coral-500" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={5000}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Tell me a bit about the role, team, and stack…"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm shadow-sm outline-none transition focus:border-coral-400 focus:bg-white focus:ring-2 focus:ring-coral-500/20 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-100"
            />
            <div className="mt-1 flex items-center justify-between text-xs">
              {errors.message ? (
                <p id="message-error" className="text-coral-700 dark:text-coral-300">
                  {errors.message}
                </p>
              ) : (
                <span />
              )}
              <span className="text-slate-400">{form.message.length}/5000</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden /> Send Message
                </>
              )}
            </button>
            <p role="status" aria-live="polite" className="m-0">
              {status === "success" && (
                <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={16} aria-hidden /> {serverMsg}
                </span>
              )}
              {status === "error" && (
                <span className="inline-flex items-center gap-1.5 text-sm text-coral-700 dark:text-coral-300">
                  <AlertCircle size={16} aria-hidden /> {serverMsg}
                </span>
              )}
            </p>
          </div>
        </motion.form>

        {/* Get in touch */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="lg:col-span-2"
        >
          <div className="card h-full p-7">
            <h3 className="text-base font-bold">Get in touch</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Fastest reach via email or LinkedIn — I usually reply within 24
              hours.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <ContactRow
                icon={<Mail size={16} />}
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <ContactRow
                icon={<Phone size={16} />}
                label="Phone"
                value={profile.phone}
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
              />
              <ContactRow
                icon={<MapPin size={16} />}
                label="Location"
                value={profile.location}
              />
            </ul>

            <div className="mt-6 border-t border-slate-100 pt-5 dark:border-navy-800">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Follow me
              </p>
              <div className="flex items-center gap-2.5">
                <Social href={profile.linkedin} label="LinkedIn">
                  <Linkedin size={18} />
                </Social>
                <Social href={profile.github} label="GitHub">
                  <GithubIcon size={18} />
                </Social>
                <Social href={`mailto:${profile.email}`} label="Email" external={false}>
                  <Mail size={18} />
                </Social>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Social({
  href,
  label,
  external = true,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition-all hover:-translate-y-0.5 hover:border-coral-300 hover:text-coral-600 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-400 dark:hover:text-coral-300"
    >
      {children}
    </a>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-coral-50 text-coral-500 dark:bg-coral-500/10 dark:text-coral-400">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
          {value}
        </p>
      </div>
    </>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-navy-800/60"
        >
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-3 p-2">{content}</div>
      )}
    </li>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
  autoComplete,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-coral-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm shadow-sm outline-none transition focus:border-coral-400 focus:bg-white focus:ring-2 focus:ring-coral-500/20 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-100"
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs text-coral-700 dark:text-coral-300">
          {error}
        </p>
      )}
    </div>
  );
}
