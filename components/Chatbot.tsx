"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageSquare, Send, Sparkles, X } from "lucide-react";
import { profile } from "@/data/resume";

type Msg = { from: "user" | "bot"; text: string };

const STARTERS = [
  "What data tools does Baburam use?",
  "What Power BI experience does he have?",
  "Tell me about his fraud analytics project",
  "Is he suitable for a Data Analyst role?",
];

const MAX_INPUT = 500;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! I'm trained on Baburam's CV, projects and skills. Ask me anything below.",
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
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-navy-800 px-4 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-black/5 transition-all hover:scale-105 hover:bg-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-500 dark:text-navy-950 dark:hover:bg-teal-400 dark:focus-visible:ring-offset-navy-950"
      >
        {open ? <X size={18} aria-hidden /> : <MessageSquare size={18} aria-hidden />}
        <span className="hidden sm:inline">
          {open ? "Close" : "Ask about Baburam"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-40 flex w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-navy-700 dark:bg-navy-950"
            role="dialog"
            aria-modal="false"
            aria-label="Ask about Baburam"
            id="chatbot-panel"
          >
            <header className="flex items-center gap-3 border-b border-slate-200 bg-gradient-to-r from-navy-800 to-navy-700 px-4 py-3 text-white dark:border-navy-700 dark:from-navy-900 dark:to-navy-800">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-500 text-navy-950" aria-hidden>
                <Bot size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight">Ask about Baburam</p>
                <p className="text-[11px] text-slate-200/80">
                  Answers come from his CV &amp; portfolio
                </p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                <Sparkles size={10} aria-hidden /> AI
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
                        ? "rounded-br-sm bg-navy-800 text-white dark:bg-teal-500 dark:text-navy-950"
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
                        className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 transition-colors hover:border-teal-400 hover:text-navy-800 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-300 dark:hover:text-white"
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
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-100"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-white transition-colors hover:bg-navy-900 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-500 dark:text-navy-950 dark:hover:bg-teal-400"
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
