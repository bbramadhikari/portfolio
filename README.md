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
│   ├── Sidebar.tsx         # Floating left dashboard nav · scroll-spy · mobile drawer · resume + socials
│   ├── ThemeSwitch.tsx     # Labeled "Dark Mode" toggle row (used in sidebar)
│   ├── Hero.tsx            # Dark dashboard hero · portrait panel + floating analytics cards (donut/sparkline/bars)
│   ├── About.tsx           # Summary + quick facts card
│   ├── Stats.tsx           # KPI bar overlapping hero (500K+, 30%, 20%, 4 projects)
│   ├── Skills.tsx          # "Skills Dashboard" — 6 branded skill tiles
│   ├── Experience.tsx      # Vertical timeline with coral indicators
│   ├── Projects.tsx        # Filterable cards w/ themed thumbnails, DOI/PDF/GitHub links
│   ├── Certifications.tsx  # IBM, Microsoft, Azure + Awards card
│   ├── Education.tsx       # Algoma MSc + B.Tech
│   ├── Contact.tsx         # "Let's Work Together" — validated form, honeypot, get-in-touch panel
│   ├── Chatbot.tsx         # Floating coral "Ask About Baburam" AI assistant — Esc-close, ARIA log
│   ├── Section.tsx, ThemeProvider.tsx, GithubIcon.tsx
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
