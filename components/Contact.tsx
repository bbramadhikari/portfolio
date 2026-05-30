"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { profile } from "@/data/resume";
import { Section } from "./Section";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type Status = "idle" | "loading" | "success" | "error";

const INITIAL: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

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
    if (!form.subject.trim()) e.subject = "Please enter a subject.";
    else if (form.subject.length > 150) e.subject = "Subject is too long.";
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
        err instanceof Error
          ? err.message
          : "Unable to send. Email me directly.",
      );
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk about your data team"
      intro="Available for Data Analyst, Business Intelligence Analyst, and Business Analyst roles across Canada — remote, hybrid, or on-site."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-2"
        >
          <div className="card h-full p-6">
            <h3 className="text-base font-bold">Direct channels</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Fastest reach via email or LinkedIn.
            </p>
            <ul className="mt-5 space-y-4 text-sm">
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
                icon={<Linkedin size={16} />}
                label="LinkedIn"
                value="linkedin.com/in/baburam-adhikari"
                href={profile.linkedin}
              />
              <ContactRow
                icon={<Github size={16} />}
                label="GitHub"
                value="github.com/bbramadhikari"
                href={profile.github}
              />
              <ContactRow
                icon={<MapPin size={16} />}
                label="Location"
                value={profile.location}
              />
            </ul>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          onSubmit={onSubmit}
          noValidate
          className="card p-6 lg:col-span-3"
          aria-label="Contact form"
        >
          <h3 className="text-base font-bold">Send a message</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            I usually reply within 24 hours.
          </p>

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
              onChange={(e) =>
                setForm((f) => ({ ...f, website: e.target.value }))
              }
            />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              label="Your name"
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
              label="Your email"
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
            <Field
              label="Subject"
              name="subject"
              autoComplete="off"
              maxLength={150}
              value={form.subject}
              onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
              error={errors.subject}
              placeholder="Data Analyst opportunity at …"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="message"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Message{" "}
              <span className="text-red-500" aria-hidden="true">
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
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              placeholder="Tell me a bit about the role, team, and stack…"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-100"
            />
            <div className="mt-1 flex items-center justify-between text-xs">
              {errors.message ? (
                <p id="message-error" className="text-red-500">
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
                  <Loader2 size={16} className="animate-spin" aria-hidden />{" "}
                  Sending…
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden /> Send message
                </>
              )}
            </button>
            <p role="status" aria-live="polite" className="m-0">
              {status === "success" && (
                <span className="inline-flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle2 size={16} aria-hidden /> {serverMsg}
                </span>
              )}
              {status === "error" && (
                <span className="inline-flex items-center gap-1.5 text-sm text-red-500">
                  <AlertCircle size={16} aria-hidden /> {serverMsg}
                </span>
              )}
            </p>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm text-slate-700 dark:text-slate-200">
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
          className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-navy-800/60"
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
          <span className="ml-0.5 text-red-500" aria-hidden="true">
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
        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-100"
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
