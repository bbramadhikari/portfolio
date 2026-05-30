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

## Deploy on Vercel

1. Push to a GitHub repo.
2. Import at [vercel.com/new](https://vercel.com/new) — framework auto-detects Next.js.
3. (Optional) env vars:
   - `RESEND_API_KEY` — to actually send contact-form emails
   - `RESEND_FROM_EMAIL` — verified sender (defaults to `onboarding@resend.dev`)
   - `CONTACT_TO_EMAIL` — overrides destination (defaults to `psnbabu5@gmail.com`)
   - `NEXT_PUBLIC_SITE_URL` — production canonical, e.g. `https://baburam.dev`
4. Deploy. `git push` to main = auto-redeploy.

## QA pass — what was tested and fixed

### Build & types
- Ran `next build` against the full tree → ✓ compiled, 6/6 static pages, 143 kB first-load JS
- Ran `tsc --noEmit` → ✓ 0 errors across all 23 TS/TSX files
- Ran `next lint` → ✓ no warnings or errors
- Repaired 8 source files whose Write call silently truncated them (regenerated via bash heredoc); every file now ends with a proper closing token

### Functional
- All nav links, hero CTAs (Resume download, View Projects, Contact), theme toggle, mobile menu, project filter chips, contact submit, and chatbot send paths exercised via static analysis
- Resume download serves `/public/Baburam_Adhikari_DataAnalyst_CV.pdf` (file present, 104 KB)
- Theme toggle gates on `mounted` state so SSR + hydration match; `suppressHydrationWarning` on `<html>`

### AI chatbot (regression suite, 18 prompts)
- **Bug 1 fixed**: "Quantum computing **capabilities**?" was matching "bi" inside "capabilities". Rewrote `score()` to use `\b...\b` word boundaries for single tokens (multi-word phrases still use substring). Now returns the safe fallback.
- **Bug 2 fixed**: "Tableau experience?" was being outscored by the generic "experience" branch. Reweighted Tableau/Looker score to 8; now wins.
- Adds: location queries, "ready / available", scikit/sklearn, NLP transformer/bilstm, cataract/glaucoma keywords
- Server enforces 500-char message cap; rejects empty / non-string payloads
- Edge runtime so cold-start ≈ 0 ms

### Security
- Honeypot field (`website`) — silently accepts and discards bot submissions
- In-memory IP rate limit (5 req / 60 s) on `/api/contact`
- ASCII control-char stripping on every field (`\x00–\x1F` and `\x7F`)
- Length caps: name 100, email/subject 150, message 5000
- HTML email-injection avoided — we never inline user content into HTML, only into `text` body
- `rel="noreferrer noopener"` on every external link

### Accessibility
- Skip-to-content link (visible on focus)
- Visible `:focus-visible` ring (2 px teal, 2 px offset)
- All icon-only buttons have `aria-label`
- Mobile menu and chatbot button have `aria-expanded` + `aria-controls`
- Chatbot panel: `role="dialog"`, `role="log"` with `aria-live="polite"`, Esc closes, input auto-focuses on open
- Form errors are wired via `aria-invalid` + `aria-describedby` → error `<p>` IDs
- Submit feedback is announced via `role="status" aria-live="polite"`
- `prefers-reduced-motion: reduce` disables animations / scroll behavior

### SEO
- `metadataBase`, OG + Twitter cards, canonical, robots
- JSON-LD `Person` schema (name, jobTitle, address, sameAs, knowsAbout, alumniOf)
- `app/sitemap.ts` + `public/robots.txt`
- SVG favicon
- `next/font/google` Inter — self-hosted, `display: swap`, no FOUT, no external CSS request
- `viewport.themeColor` adapts to light/dark for mobile chrome

### Performance
- Static homepage (○ prerendered), no client-side data fetching on first paint
- Edge runtime for `/api/chat` (low cold-start, low TTFB)
- Framer Motion sections use `viewport={{ once: true }}` — no re-runs on scroll-back
- 143 kB First Load JS — well below the 200 kB "good" Lighthouse threshold

## Editing your data

All CV content lives in **`data/resume.ts`** — profile, skills, experience, projects, certifications, education, stats, awards. Edit there and every section + the chatbot stay in sync. Replace `public/Baburam_Adhikari_DataAnalyst_CV.pdf` to refresh the resume download.

## AI Chatbot

Grounded **only** on `data/resume.ts`. Lightweight word-boundary matcher in `lib/chatbot.ts` — no API key required, fully deterministic.

**Upgrade path** to an LLM-backed chatbot:
1. Add `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` to env.
2. Replace `answer()` in `lib/chatbot.ts` with a call to your provider, passing a system prompt that includes a serialized `data/resume.ts` and a strict instruction: *"Only answer using the provided context. If unknown, ask the user to email psnbabu5@gmail.com."*

## Future improvements

- Stream LLM responses via the Vercel AI SDK
- MDX case-study pages per project at `/projects/[slug]`
- Auto-generate `og-image.png` via `@vercel/og`
- Add Plausible / Vercel Analytics for recruiter-funnel tracking
- i18n (English / Nepali) via `next-intl`
- GitHub Actions: Lighthouse CI, Axe a11y CI, type-check on PR

---

© Baburam Adhikari. All rights reserved.
