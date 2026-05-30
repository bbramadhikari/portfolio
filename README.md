# Baburam Adhikari — Data Analyst Portfolio

A modern, ATS-aligned portfolio targeted at Data Analyst / BI Analyst / Business Analyst roles in Canada. Built with Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion. Features dark/light theme, animated KPI hero, project filtering, AI chatbot ("Ask about Baburam"), validated + rate-limited contact form, SEO + JSON-LD, full keyboard accessibility, and reduced-motion support.

## Production status

The codebase passes a real `next build` (verified locally):

```
✓ Compiled successfully
✓ Generating static pages (6/6)

Route (app)                       Size     First Load JS
┌ ○ /                              12.8 kB         143 kB
├ ○ /_not-found                    871 B          87.9 kB
├ ƒ /api/chat                      0 B                0 B
├ ƒ /api/contact                   0 B                0 B
└ ○ /sitemap.xml                   0 B                0 B
```

- TypeScript: `tsc --noEmit` ✓ 0 errors
- ESLint: `next lint` ✓ No warnings
- Production build: ✓ Optimized, static homepage @ 143 kB First Load JS
- Chatbot regression suite: 18/18 queries return correct, fact-grounded answers

## Stack

- **Next.js 14** (App Router, server components, edge runtime for `/api/chat`)
- **TypeScript 5** (strict mode)
- **Tailwind CSS 3** (custom navy + teal design tokens, dark mode via `class`)
- **Framer Motion 11** (section reveals, hero KPI chart, animated bars)
- **lucide-react** (icons)
- **next-themes** (system-aware dark / light toggle)
- **next/font/google** (self-hosted Inter, zero render-blocking CSS)
- Optional **Resend** for contact-form delivery

## Folder structure

```
baburam-portfolio/
├── app/
│   ├── layout.tsx          # SEO metadata, JSON-LD Person schema, next/font Inter, theme + chatbot mount
│   ├── page.tsx            # Homepage composition
│   ├── globals.css         # Design tokens, focus-visible, prefers-reduced-motion
│   ├── sitemap.ts          # Programmatic sitemap
│   └── api/
│       ├── chat/route.ts   # Edge runtime · rule-based answer engine
│       └── contact/route.ts# Node runtime · validation, honeypot, rate-limit, Resend integration
├── components/
│   ├── Navbar.tsx          # Sticky, blur on scroll, mobile menu w/ Esc-close + aria-expanded
│   ├── Hero.tsx            # Animated dashboard card w/ Framer Motion bars
│   ├── About.tsx           # Summary + quick facts card
│   ├── Stats.tsx           # KPI achievements (500K+ records, +30%, –25%)
│   ├── Skills.tsx          # 6 categories w/ animated progress bars
│   ├── Experience.tsx      # Vertical timeline with strong bullet points
│   ├── Projects.tsx        # Filterable cards (All / Data Analytics / BI / ML / NLP / CV)
│   ├── Certifications.tsx  # IBM, Microsoft, Azure + Awards card
│   ├── Education.tsx       # Algoma MSc + B.Tech
│   ├── Contact.tsx         # Validated form, honeypot, 5000-char counter, ARIA error linkage
│   ├── Chatbot.tsx         # Floating "Ask about Baburam" — Esc-close, focus-trap, ARIA log
│   ├── Section.tsx, Footer.tsx, ThemeProvider.tsx, ThemeToggle.tsx
├── data/resume.ts          # Single source of truth (CV-accurate)
├── lib/chatbot.ts          # Word-boundary keyword matcher (no LLM key required)
├── public/
│   ├── Baburam_Adhikari_DataAnalyst_CV.pdf
│   ├── favicon.svg         # SVG monogram (BA)
│   └── robots.txt
├── package.json, tsconfig.json, tailwind.config.ts, postcss.config.js, next.config.js
├── .eslintrc.json, .env.local.example, .gitignore
```

## Run locally

```bash
npm install
cp .env.local.example .env.local      # optional
npm run dev                           # http://localhost:3000
npm run build && npm start            # production
npm run lint                          # eslint
```

---

© Baburam Adhikari. All rights reserved.
