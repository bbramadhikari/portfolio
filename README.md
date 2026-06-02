# Baburam Adhikari — Data Analyst Portfolio

A premium, dashboard-style portfolio for a **Data Analyst / Business Intelligence / Machine Learning** professional. Built with the Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion, with an Airbnb-inspired coral + navy design system, a floating sidebar layout, an on-page AI assistant, and a strong accessibility/SEO baseline.

> **Turning Data Into Business Decisions** — recruiter-focused, fast, and production-ready.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-11-0055FF?logo=framer&logoColor=white">
</p>

---

## Highlights

- **Dashboard layout** — floating, sticky left **sidebar** with scroll-spy active highlighting; collapses to an animated drawer on mobile.
- **Animated hero** — dark, glassmorphic hero with a cut-out portrait and floating analytics cards (donut, sparkline, bar chart).
- **Featured projects** — filterable cards (Data Analytics · BI · ML · NLP · Computer Vision · Security) with themed thumbnails and GitHub / DOI / paper links.
- **AI assistant** — "Ask About Baburam" chatbot answering from a CV-grounded, rule-based engine (no LLM key required).
- **Contact form** — client + server validation, honeypot, character counter, loading/success/error states.
- **Theme** — system-aware dark / light mode, dark by default.
- **Accessible** — semantic HTML, keyboard navigation, focus-visible rings, ARIA live regions, WCAG-AA contrast, and `prefers-reduced-motion` honoured globally.
- **SEO/social** — metadata, canonical, JSON-LD `Person` schema, sitemap, robots, and a dynamically generated Open Graph / Twitter share image.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | **Next.js 14** (App Router, RSC; edge runtime for `/api/chat` & OG image) |
| Language | **TypeScript 5** (strict) |
| Styling | **Tailwind CSS 3** — custom `coral` + `navy` tokens, `class`-based dark mode |
| Animation | **Framer Motion 11** (`MotionConfig reducedMotion="user"`) |
| Icons | **lucide-react** + a custom GitHub glyph |
| Theming | **next-themes** |
| Fonts | **next/font** (self-hosted Inter) |
| Images | **next/image** (AVIF/WebP, responsive, lazy) |
| Contact delivery | **Formspree** (default) · optional **Resend** API route |

## Architecture

```
baburam-portfolio/
├── app/
│   ├── layout.tsx            # Metadata, JSON-LD Person schema, fonts, sidebar + chatbot mount
│   ├── page.tsx              # Homepage section composition
│   ├── globals.css           # Design tokens, component classes, a11y (focus, reduced-motion)
│   ├── opengraph-image.tsx   # Generated 1200×630 OG/Twitter share image (edge)
│   ├── sitemap.ts            # Programmatic sitemap
│   └── api/
│       ├── chat/route.ts     # Edge · rule-based answer engine + input limits
│       └── contact/route.ts  # Node · validation, honeypot, rate-limit, optional Resend
├── components/
│   ├── Sidebar.tsx           # Floating nav · scroll-spy · mobile drawer · resume + socials
│   ├── ThemeProvider.tsx     # next-themes + Framer MotionConfig (reduced-motion)
│   ├── ThemeSwitch.tsx       # Labeled "Dark Mode" toggle
│   ├── Hero.tsx              # Dark hero · portrait + floating donut/sparkline/bar cards
│   ├── Stats.tsx             # KPI bar overlapping the hero
│   ├── About.tsx             # Summary + quick-facts card
│   ├── Projects.tsx          # Filterable project cards w/ themed thumbnails & links
│   ├── Skills.tsx            # "Skills Dashboard" — branded skill tiles
│   ├── Experience.tsx        # Vertical timeline with coral indicators
│   ├── Certifications.tsx    # Certifications + awards
│   ├── Education.tsx         # MSc Computer Science detail card
│   ├── Contact.tsx           # "Let's Work Together" form + get-in-touch panel
│   ├── Chatbot.tsx           # Floating "Ask About Baburam" assistant (Esc-close, ARIA log)
│   ├── Section.tsx           # Shared section header/wrapper
│   └── GithubIcon.tsx        # Inline GitHub icon
├── data/resume.ts            # Single source of truth (profile, skills, projects, etc.)
├── lib/chatbot.ts            # Keyword matcher powering the assistant
├── public/                   # CV + papers (PDF), portrait, logo, favicons, robots.txt
├── .vscode/settings.json     # Pins editor to workspace TypeScript
└── next.config.js · tailwind.config.ts · tsconfig.json · postcss.config.js
```

All page content (profile, skills, projects, experience, education, certifications, stats) lives in **`data/resume.ts`** — edit that one file and every section plus the chatbot update automatically.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # optional — see Configuration
npm run dev                        # http://localhost:3000
```

### Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm start        # serve the production build
npm run lint     # ESLint
```

## Configuration

All environment variables are **optional** — the site runs and deploys without them. Copy `.env.local.example` to `.env.local` for local dev, or set them in your host's dashboard.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, Open Graph, and sitemap |
| `RESEND_API_KEY` | Enables the optional server-side Resend email route (`/api/contact`) |
| `RESEND_FROM_EMAIL` | "From" address for Resend |
| `CONTACT_TO_EMAIL` | Destination inbox for Resend |

**Contact form:** the live form posts to **Formspree** (configured in `components/Contact.tsx`) and needs no environment variables. The `/api/contact` route is a first-party **Resend** alternative — wire the form to it and set the variables above if you prefer to avoid a third party.

## Accessibility & performance

- Single `<h1>`, ordered headings, and semantic landmarks.
- Keyboard-navigable nav, form, and chatbot; visible focus rings.
- ARIA: `aria-current` nav, labeled fields, `aria-live` status regions.
- WCAG-AA color contrast across light and dark themes.
- `prefers-reduced-motion` honoured globally via Framer `MotionConfig`.
- `next/image` with `priority` on the hero (good LCP, no layout shift); AVIF/WebP output.
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) set in `next.config.js`; `X-Powered-By` disabled.

## Quality gates

Verified locally:

- `tsc --noEmit` — **0 errors**
- `next lint` — **no warnings**
- `next build` — compiles successfully (static homepage + edge API/OG routes)

```
Route (app)                         Size     First Load JS
┌ ○ /                               ~21 kB          ~153 kB
├ ○ /_not-found
├ ƒ /api/chat                       (edge)
├ ƒ /api/contact
├ ƒ /opengraph-image                (edge)
└ ○ /sitemap.xml
```

## Deployment (Vercel)

1. Push to GitHub and **import the repo** in Vercel (framework auto-detected).
2. (Recommended) Set `NEXT_PUBLIC_SITE_URL` to your production domain.
3. (Optional) Set the Resend variables if using the server-side contact route.
4. Deploy, then run Lighthouse on the live URL and validate the OG card in a social-share inspector.

---

© Baburam Adhikari. All rights reserved.
