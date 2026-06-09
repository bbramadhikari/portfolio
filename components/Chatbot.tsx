"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { profile } from "@/data/resume";

type Msg = { from: "user" | "bot"; text: string };

const STARTERS = [
  "What data tools does Baburam use?",
  "What Power BI experience does he have?",
  "Tell me about his fraud analytics project",
  "What does Baburam do as a data analyst?",
];

const MAX_INPUT = 500;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! I answer questions straight from Baburam's CV, projects, and skills. Ask me anything below.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text: string) => {
    const message = text.trim().slice(0, MAX_INPUT);
    if (!message || busy) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text: message }]);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const reply =
        data?.reply ||
        `Sorry — I couldn't process that. Please email ${profile.email}.`;
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: `There was a network error. Please try again or email ${profile.email}.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat about Baburam"}
        aria-expanded={open}
        aria-controls="chatbot-panel"
        className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-coral-500 py-2.5 pl-2.5 pr-5 text-left text-white shadow-glow ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:bg-coral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-950"
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white text-coral-500">
          {open ? <X size={18} aria-hidden /> : <Bot size={18} aria-hidden />}
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-navy-900 text-[9px] font-bold text-white ring-2 ring-coral-500">
              1
            </span>
          )}
        </span>
        <span className="hidden leading-tight sm:block">
          <span className="block text-sm font-bold">
            {open ? "Close chat" : "Ask About Baburam"}
          </span>
          <span className="block text-[11px] font-medium text-white/80">
            CV Q&amp;A
          </span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-40 flex w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-navy-700 dark:bg-navy-950"
            role="dialog"
            aria-modal="false"
            aria-label="Ask about Baburam"
            id="chatbot-panel"
          >
            <header className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-coral-500 to-coral-600 px-4 py-3.5 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-coral-500" aria-hidden>
                <Bot size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight">Ask About Baburam</p>
                <p className="text-[11px] text-white/80">
                  Answers come from his CV &amp; portfolio
                </p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                <Sparkles size={10} aria-hidden /> CV
              </span>
            </header>

            <div
              ref={listRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-label="Conversation"
              className="max-h-[55vh] min-h-[260px] space-y-3 overflow-y-auto bg-slate-50 px-3 py-4 text-sm dark:bg-navy-900/40"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 leading-relaxed shadow-sm ${
                      m.from === "user"
                        ? "rounded-br-sm bg-coral-500 text-white"
                        : "rounded-bl-sm border border-slate-200 bg-white text-slate-800 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-100"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-3 py-2 text-slate-500 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-400">
                    <Dots />
                  </div>
                </div>
              )}

              {messages.length <= 1 && (
                <div className="pt-1">
                  <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Try asking
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {STARTERS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 transition-colors hover:border-coral-300 hover:text-coral-600 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-300 dark:hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2.5 dark:border-navy-700 dark:bg-navy-950"
            >
              <label htmlFor="chatbot-input" className="sr-only">
                Your question
              </label>
              <input
                id="chatbot-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
                maxLength={MAX_INPUT}
                placeholder="Ask about skills, projects, experience…"
                autoComplete="off"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-500/20 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-100"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-coral-500 text-white transition-colors hover:bg-coral-600 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2"
                aria-label="Send"
              >
                <Send size={14} aria-hidden />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Assistant is typing">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
    </span>
  );
}
