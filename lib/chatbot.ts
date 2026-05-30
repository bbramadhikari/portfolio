import {
  profile,
  about,
  skillCategories,
  experience,
  projects,
  certifications,
  education,
  stats,
} from "@/data/resume";

// Lightweight rule-based chatbot answering questions strictly from the
// local resume data. Word-boundary matching avoids substring false
// positives (e.g. "capabilities" no longer matches "bi"). No external API
// is required — `answer()` is fully deterministic.

type Match = { score: number; reply: string };

const FALLBACK = `I'm Baburam's portfolio assistant and I can only answer using information from his CV and projects. I couldn't find that detail here — for anything specific, please email him at ${profile.email} or use the contact form on this page.`;

const SUGGESTIONS = [
  "What data tools does Baburam use?",
  "What Power BI experience does he have?",
  "Tell me about his fraud analytics project",
  "Is he suitable for a Data Analyst role?",
  "What is his education background?",
  "What certifications does he hold?",
  "How can I contact him?",
];

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 +#./-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Word-boundary keyword match. Multi-word phrases use substring match;
// single tokens use \b ... \b to avoid false positives like
// "capabilities" matching "bi".
function score(q: string, keywords: string[]): number {
  let n = 0;
  for (const kw of keywords) {
    if (kw.includes(" ")) {
      if (q.includes(kw)) n++;
    } else {
      const re = new RegExp(`\\b${escapeRe(kw)}\\b`);
      if (re.test(q)) n++;
    }
  }
  return n;
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function allSkills(): string {
  return skillCategories
    .map((c) => `**${c.title}**: ${c.skills.map((s) => s.name).join(", ")}`)
    .join("\n");
}

function projectSummary(title: string): string | null {
  const p = projects.find((x) =>
    x.title.toLowerCase().includes(title.toLowerCase())
  );
  if (!p) return null;
  return [
    `**${p.title}**${p.published ? ` (${p.published})` : ""}`,
    p.description,
    `Tools: ${p.tools.join(", ")}.`,
    `Business value: ${p.value}`,
    `Key results: ${p.metrics.join(" · ")}.`,
  ].join("\n");
}

export function getSuggestions(): string[] {
  return SUGGESTIONS;
}

export function answer(question: string): string {
  const q = norm(question);
  if (!q) return "Ask me anything about Baburam's skills, experience, or projects.";

  const m: Match[] = [];

  if (score(q, ["hi", "hello", "hey", "namaste"]) > 0) {
    m.push({ score: 5, reply: `Hi! I'm Baburam's portfolio assistant. Ask about his skills, projects, experience, certifications, or how to contact him.` });
  }

  if (score(q, ["who", "about", "summary", "introduce", "background", "bio"]) > 0) {
    m.push({ score: 4, reply: about.summary });
  }

  if (score(q, ["tool", "tools", "tech", "stack", "skill", "skills", "technologies", "technology"]) > 0) {
    m.push({ score: 7, reply: `Baburam works across the following stack:\n\n${allSkills()}` });
  }

  if (score(q, ["power bi", "powerbi", "dashboard", "dashboards"]) > 0) {
    m.push({ score: 8, reply: `Yes — Power BI is one of Baburam's core tools. At Leapfrog Technology he designed and deployed interactive Power BI dashboards (alongside automated Matplotlib visuals) that reduced manual reporting effort by about 20%. At APAR Nepal he built Excel + Power BI dashboards tracking website performance, user engagement, and operational KPIs for management review.` });
  }

  if (score(q, ["tableau", "looker", "looker studio"]) > 0) {
    m.push({ score: 8, reply: `Beyond Power BI, Baburam has worked with Tableau and Looker Studio for executive reporting and data storytelling, plus Matplotlib and Seaborn for Python-based visualization.` });
  }

  if (score(q, ["sql", "query", "queries", "postgres", "postgresql", "mysql", "sql server", "mongodb"]) > 0) {
    m.push({ score: 7, reply: `SQL is a core skill. Baburam writes complex queries with joins, CTEs, and window functions for ad-hoc questions, trend analysis, and recurring reporting. He has worked with PostgreSQL, MySQL, SQL Server, and MongoDB, and is comfortable with query optimization.` });
  }

  if (score(q, ["python", "pandas", "numpy", "scipy"]) > 0) {
    m.push({ score: 7, reply: `Python is one of Baburam's primary tools. He uses Pandas, NumPy, and SciPy for cleaning, EDA, feature engineering, and ETL — including a 500K+ record dataset at Leapfrog Technology where he lifted data quality and analysis accuracy by ~30%.` });
  }

  if (score(q, ["etl", "pipeline", "pipelines", "ingestion", "transform"]) > 0) {
    m.push({ score: 7, reply: `At Leapfrog Technology, Baburam built and maintained end-to-end ETL workflows covering ingestion, transformation, feature engineering, and pipeline monitoring — producing a more reliable and scalable analytics layer. At APAR Nepal he supported lightweight ETL tasks including extraction, cleaning, deduplication, and consolidation into structured reporting tables.` });
  }

  if (score(q, ["machine learning", "model", "models", "random forest", "xgboost", "isolation forest", "clustering", "scikit", "sklearn"]) > 0) {
    m.push({ score: 7, reply: `Baburam has hands-on ML experience with regression, classification, clustering, Random Forest, XGBoost, and Isolation Forest using Scikit-learn. He's applied these to fraud detection, recommendation systems, NLP sentiment analysis, and a CNN-based retinal image classifier (91.14% precision).` });
  }

  if (score(q, ["fraud", "bank", "transaction", "anomaly"]) > 0) {
    const s = projectSummary("Bank Transaction Fraud");
    if (s) m.push({ score: 9, reply: s });
  }

  if (score(q, ["ecommerce", "e-commerce", "recommendation", "recommender", "amazon", "collaborative filtering"]) > 0) {
    const s = projectSummary("E-Commerce Recommendation");
    if (s) m.push({ score: 9, reply: s });
  }

  if (score(q, ["nepali", "nepal", "sentiment", "nlp", "language", "transformer", "bilstm"]) > 0) {
    const s = projectSummary("Nepali Sentiment");
    if (s) m.push({ score: 9, reply: s });
  }

  if (score(q, ["retinal", "retina", "cnn", "image", "vision", "computer vision", "cataract", "glaucoma"]) > 0) {
    const s = projectSummary("Retinal Image");
    if (s) m.push({ score: 9, reply: s });
  }

  if (score(q, ["project", "projects", "portfolio", "case study"]) > 0) {
    m.push({ score: 3, reply: `Featured projects:\n- ${projects.map((p) => p.title).join("\n- ")}\n\nAsk me about any of them by name.` });
  }

  if (score(q, ["experience", "work history", "job", "jobs", "company", "leapfrog", "apar", "role", "roles", "internship"]) > 0) {
    m.push({
      score: 5,
      reply: experience
        .map((e) => `**${e.role} — ${e.company}** (${e.start} – ${e.end}, ${e.location})\n` + e.bullets.map((b) => `• ${b}`).join("\n"))
        .join("\n\n"),
    });
  }

  if (score(q, ["education", "degree", "msc", "btech", "b.tech", "university", "algoma", "sardar patel", "school", "study", "studies"]) > 0) {
    m.push({
      score: 6,
      reply: education
        .map((e) => `**${e.degree}** — ${e.school}, ${e.location} (${e.start} – ${e.end}). ${e.note}`)
        .join("\n\n"),
    });
  }

  if (score(q, ["cert", "certification", "certifications", "ibm", "azure", "microsoft"]) > 0) {
    m.push({
      score: 6,
      reply: `Certifications:\n- ${certifications.map((c) => `${c.title} — ${c.issuer}${c.year !== "—" ? ` (${c.year})` : ""}`).join("\n- ")}`,
    });
  }

  if (score(q, ["suitable", "fit", "hire", "hiring", "canada", "remote", "data analyst", "business analyst", "bi analyst", "ready", "available"]) > 0) {
    m.push({
      score: 8,
      reply: `Yes — Baburam is well-suited for Data Analyst, Business Intelligence Analyst, or Business Analyst roles. He's IBM Data Analyst certified, finishing an MSc in Computer Science at Algoma University (Ontario), and has shipped measurable results: ${stats.map((s) => `${s.value} ${s.label.toLowerCase()}`).join(", ")}. He is based in Edmonton, AB and open to roles across Canada.`,
    });
  }

  if (score(q, ["where", "based", "located", "location", "edmonton", "ontario", "alberta"]) > 0) {
    m.push({
      score: 6,
      reply: `Baburam is based in ${profile.location} and is finishing his MSc at Algoma University in Sault Ste. Marie, Ontario. He's open to Data Analyst, BI Analyst, and Business Analyst roles across Canada (remote, hybrid, or on-site).`,
    });
  }

  if (score(q, ["contact", "email", "reach", "phone", "linkedin", "github", "connect", "message"]) > 0) {
    m.push({
      score: 6,
      reply: `You can reach Baburam at ${profile.email}, ${profile.phone}, ${profile.linkedin}, or ${profile.github}. He's based in ${profile.location}.`,
    });
  }

  if (score(q, ["resume", "cv", "download"]) > 0) {
    m.push({ score: 4, reply: `You can download his resume from the Hero section, or directly here: ${profile.resumeUrl}` });
  }

  if (score(q, ["award", "awards", "recognition", "robocon", "mustang", "locus", "honor"]) > 0) {
    m.push({ score: 5, reply: `Selected awards: Best Engineering Award & First Runner-up — ABU Robocon; First Place — Journey to Mustang (Robotic Association of Nepal); Best Innovative Award (Solar Panel Cleaning) — LOCUS.` });
  }

  m.sort((a, b) => b.score - a.score);
  if (m.length === 0) return FALLBACK;
  return m[0].reply;
}

export function chatbotMeta() {
  return {
    name: "Ask about Baburam",
    suggestions: SUGGESTIONS,
    welcome: `Hi! I'm trained on ${joinList(["Baburam's CV", "projects", "skills"])}. Ask me anything below.`,
  };
}
