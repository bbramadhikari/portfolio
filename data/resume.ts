export const profile = {
  name: "Baburam Adhikari",
  title: "Data Analyst | SQL | Python | Power BI | Business Intelligence",
  tagline:
    "Turning complex, messy data into clear, decision-ready insights that move business KPIs.",
  location: "Edmonton, AB, Canada",
  phone: "+1-705-987-5536",
  email: "psnbabu5@gmail.com",
  linkedin: "https://linkedin.com/in/baburam-adhikari",
  github: "https://github.com/bbramadhikari",
  resumeUrl: "/Baburam_Adhikari_Resume.pdf",
  portrait: "/baburam.png",
};

export const about = {
  summary: `Data Analyst with hands-on experience delivering business insights through SQL, Python, and BI dashboards across operational, customer, and financial datasets. IBM Data Analyst certified and currently completing an MSc in Computer Science at Algoma University (Canada), with proven results: improved data quality by 30%, reduced manual reporting time by 20–25%, and built automated ETL workflows that streamlined stakeholder reporting.`,
  highlights: [
    "MSc in Computer Science — Algoma University, Ontario",
    "IBM Data Analyst Professional Certificate (2025)",
    "2+ years of analytics experience across product, ops & finance datasets",
    "Authorised to work in Canada and open to Data Analyst / BI Analyst / Business Analyst roles",
  ],
};

export type Skill = { name: string; level: number };
export type SkillCategory = { title: string; icon: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming & Querying",
    icon: "Code2",
    skills: [
      { name: "Python (Pandas, NumPy, SciPy)", level: 92 },
      { name: "SQL", level: 95 },
      { name: "R", level: 70 },
      { name: "Advanced Excel", level: 90 },
      { name: "VBA", level: 75 },
    ],
  },
  {
    title: "Data Analytics",
    icon: "LineChart",
    skills: [
      { name: "EDA", level: 92 },
      { name: "ETL Pipelines", level: 88 },
      { name: "Data Cleaning", level: 95 },
      { name: "KPI Tracking", level: 90 },
      { name: "Forecasting", level: 82 },
      { name: "Anomaly Detection", level: 85 },
    ],
  },
  {
    title: "BI & Visualization",
    icon: "BarChart3",
    skills: [
      { name: "Power BI", level: 92 },
      { name: "Tableau", level: 85 },
      { name: "Looker Studio", level: 80 },
      { name: "Matplotlib", level: 90 },
      { name: "Seaborn", level: 88 },
    ],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MySQL", level: 88 },
      { name: "MongoDB", level: 78 },
      { name: "SQL Server", level: 85 },
    ],
  },
  {
    title: "Machine Learning",
    icon: "Brain",
    skills: [
      { name: "Regression / Classification", level: 88 },
      { name: "Clustering", level: 85 },
      { name: "Random Forest", level: 88 },
      { name: "XGBoost", level: 82 },
      { name: "Isolation Forest", level: 80 },
      { name: "Scikit-learn / NLP", level: 85 },
    ],
  },
  {
    title: "Cloud & Tools",
    icon: "Cloud",
    skills: [
      { name: "Microsoft Azure", level: 78 },
      { name: "Docker", level: 75 },
      { name: "Git / GitHub", level: 90 },
      { name: "Jupyter", level: 92 },
      { name: "FastAPI / Flask", level: 80 },
      { name: "Jira / Agile-Scrum", level: 85 },
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "Data Analyst",
    company: "Leapfrog Technology, Inc.",
    location: "Kathmandu, Nepal (Hybrid)",
    start: "Feb 2024",
    end: "Nov 2024",
    bullets: [
      "Cleaned, validated, and performed EDA on 500K+ records using Python (Pandas, NumPy) and SQL, improving data quality and analysis accuracy by ~30%.",
      "Designed and deployed interactive Power BI dashboards and automated Matplotlib visualizations, reducing manual reporting effort by 20% and accelerating stakeholder access to KPIs.",
      "Built and maintained end-to-end ETL workflows covering ingestion, transformation, feature engineering, and pipeline monitoring, producing a more reliable and scalable analytics layer.",
      "Wrote complex SQL queries (joins, CTEs, window functions) to support ad-hoc business questions, trend analysis, and recurring reporting for cross-functional teams.",
      "Partnered with product, engineering, and operations stakeholders to translate business problems into measurable analytics deliverables and communicate findings in plain language.",
    ],
    stack: ["Python", "SQL", "Power BI", "ETL", "Pandas", "Matplotlib"],
  },
  {
    role: "Data & Business Analyst (Analytics Support)",
    company: "APAR Nepal",
    location: "Kathmandu, Nepal",
    start: "Sep 2022",
    end: "Dec 2023",
    bullets: [
      "Analyzed operational and customer datasets using SQL and Excel to surface usage trends, conversion drop-offs, and workflow bottlenecks.",
      "Built Excel and Power BI dashboards tracking website performance, user engagement, and key operational KPIs for management review.",
      "Automated recurring reporting workflows using Excel formulas, pivot tables, and SQL scripts, reducing weekly manual reporting effort by ~25%.",
      "Conducted exploratory data analysis on user behavior and product data to generate actionable insights that informed feature and UX decisions.",
      "Supported lightweight ETL tasks — data extraction, cleaning, deduplication, and consolidation into structured reporting tables.",
      "Collaborated with technical and non-technical stakeholders to gather reporting requirements, define KPIs, and present findings through clear visual summaries.",
    ],
    stack: ["SQL", "Excel", "Power BI", "VBA", "ETL", "KPI Design"],
  },
];

export type ProjectCategory =
  | "Data Analytics"
  | "BI"
  | "Machine Learning"
  | "NLP"
  | "Computer Vision"
  | "Security";

export type Project = {
  title: string;
  description: string;
  tools: string[];
  value: string;
  metrics: string[];
  category: ProjectCategory[];
  link?: string;
  repos?: { label: string; url: string }[];
  published?: string;
  doi?: string;
  pdf?: string;
  // Card-display metadata (Featured Projects grid)
  accent?: "fraud" | "ecommerce" | "nlp" | "vision" | "security" | "drone";
  headline?: { value: string; label: string };
};

export const projects: Project[] = [
  {
    title: "Bank Transaction Fraud Analytics",
    description:
      "Full EDA on a large-scale banking transaction dataset to identify spending patterns, high-risk customer segments, and behavioral anomalies. Benchmarked multiple fraud-detection models and delivered visual fraud-trend summaries for risk and compliance stakeholders.",
    tools: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Random Forest",
      "Isolation Forest",
      "K-Means",
      "Matplotlib",
      "Seaborn",
    ],
    value:
      "Helps risk teams catch suspicious transactions earlier and reduces investigation overhead with targeted KPI dashboards.",
    metrics: [
      "Compared Random Forest, K-Means & Isolation Forest on precision, recall, F1",
      "Surface-level KPI dashboards built for risk & compliance",
      "Identified high-risk customer segments via behavioral anomaly scoring",
    ],
    category: ["Data Analytics", "Machine Learning"],
    link: "https://github.com/bbramadhikari/banking_EDA",
    accent: "fraud",
    headline: { value: "3 models", label: "Benchmarked on P/R/F1" },
  },
  {
    title: "Password Manager with Biometric Authentication",
    description:
      "Full-stack secure password manager that layers facial recognition and email OTP on top of a master password for multi-factor authentication. Built with a Next.js client and a Django REST API; credentials are AES-encrypted and master passwords bcrypt-hashed before storage, with JWT-secured sessions and input validation against SQL injection and XSS.",
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Django REST",
      "PostgreSQL",
      "face-api.js",
      "OpenCV",
      "PyOTP",
      "JWT",
    ],
    value:
      "Removes the single-point-of-failure of a master password by requiring live biometric + OTP verification before any credential can be viewed — a model leading vendors are moving toward with passkeys.",
    metrics: [
      "Multi-factor auth: facial recognition (face_recognition / OpenCV) + time-based email OTP",
      "AES-encrypted credential storage with bcrypt-hashed master passwords",
      "JWT-secured Django REST API with SQL-injection & XSS input validation",
    ],
    category: ["Security", "Computer Vision"],
    accent: "security",
    headline: { value: "Face + OTP", label: "Multi-factor auth" },
    repos: [
      {
        label: "Frontend",
        url: "https://github.com/bbramadhikari/password-manager-frontend",
      },
      {
        label: "Backend",
        url: "https://github.com/bbramadhikari/password-manager-backend",
      },
    ],
  },
  {
    title:
      "Trust-Aware Generative Explanations for E-Commerce Product Recommendations",
    description:
      "Analyzed the Amazon 2023 e-commerce dataset to extract purchasing behavior, product-affinity patterns, and customer segmentation insights. Built a hybrid recommendation system combining collaborative filtering and content-based features.",
    tools: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Collaborative Filtering",
      "Content-Based Filtering",
      "ETL",
    ],
    value:
      "Surfaces customer segments and product affinities that directly drive cross-sell, retention, and merchandising decisions.",
    metrics: [
      "Evaluated with Hit Rate@K, Diversity@K, and Novelty",
      "Extensive cleaning + ETL: filtering, missing-value treatment, text preprocessing",
      "User–item matrix construction for hybrid recommender",
    ],
    category: ["Data Analytics", "Machine Learning"],
    published: "Published, ICAIII 2026",
    doi: "https://doi.org/10.1109/ICAIII69475.2026.11521172",
    link: "https://github.com/bbramadhikari",
    accent: "ecommerce",
    headline: { value: "Hit Rate@K", label: "Hybrid recommender" },
  },
  {
    title: "Nepali Sentiment Analysis — NLP Insights",
    description:
      "Cleaned and processed a bi-script (Devanagari & Romanized) Nepali text dataset for large-scale sentiment classification. Built a hybrid Transformer + CNN + BiLSTM pipeline to surface customer-opinion trends in a low-resource language.",
    tools: ["Python", "PyTorch", "Transformers", "CNN", "BiLSTM", "NLP"],
    value:
      "Enables product and marketing teams to track Nepali customer sentiment across reviews and social mentions.",
    metrics: [
      "73.88% accuracy",
      "Macro-F1 of 0.737",
      "Hybrid Transformer + CNN + BiLSTM pipeline",
    ],
    category: ["NLP", "Machine Learning"],
    link: "https://github.com/bbramadhikari",
    accent: "nlp",
    headline: { value: "73.88%", label: "Model Accuracy" },
  },
  {
    title:
      "Lightweight CNN for Multi-Class Classification of Retinal Fundus Images",
    description:
      "Designed a lightweight CNN to classify four retinal conditions (Cataract, Diabetic Retinopathy, Glaucoma, Normal). Conducted rigorous model evaluation using confusion matrices, ROC/AUC, and class-wise performance reporting.",
    tools: ["Python", "TensorFlow / Keras", "CNN", "Scikit-learn"],
    value:
      "Demonstrates production-aware modeling for clinical decision-support workflows with transparent, class-wise performance reporting.",
    metrics: [
      "91.14% precision across 4 retinal classes",
      "ROC/AUC and confusion-matrix evaluation",
      "Lightweight CNN suitable for low-resource deployment",
    ],
    category: ["Computer Vision", "Machine Learning"],
    published: "Published, SNPD 2025",
    pdf: "/SNPD2025_Lightweight_CNN_Retinal_Fundus.pdf",
    link: "https://github.com/bbramadhikari",
    accent: "vision",
    headline: { value: "91.14%", label: "Model Precision" },
  },
  {
    title: "Lost in Woods — AI Drone Search & Rescue",
    description:
      "AI-driven search-and-rescue platform that detects missing people in aerial drone imagery of dense forest using a YOLOv8 object-detection model. Built as two web apps: a public portal for reporting missing persons and an admin dashboard that runs detection on uploaded drone images and emails reporters when a confident match is found.",
    tools: [
      "Python",
      "Flask",
      "YOLOv8",
      "OpenCV",
      "PostgreSQL",
      "AWS S3",
      "SMTP",
    ],
    value:
      "Replaces blind, manpower-heavy manual sweeps with automated aerial detection and precise location data — giving rescue teams a head start and shrinking search time across large, hard-to-reach areas.",
    metrics: [
      "Custom-trained YOLOv8 model detects humans in dense-foliage drone imagery",
      "Two-app design: public missing-person reporting portal + admin detection dashboard",
      "Automated SMTP email alerts to reporters on confident matches (<5s/image target)",
    ],
    category: ["Computer Vision", "Machine Learning"],
    accent: "drone",
    headline: { value: "YOLOv8", label: "Aerial human detection" },
    link: "https://github.com/bbramadhikari/human-detection-with-drone-image",
  },
];

export const stats = [
  { value: "500K+", label: "Records Analyzed", sub: "Across multiple datasets", icon: "Database" },
  { value: "30%", label: "Data Quality Improvement", sub: "Enhanced accuracy & reliability", icon: "TrendingUp" },
  { value: "20%", label: "Reporting Time Reduction", sub: "Through automation & ETL", icon: "Clock" },
  { value: "6", label: "Featured Projects", sub: "ML, NLP, Vision & Security", icon: "FileText" },
];

// Curated, recruiter-facing skill highlights for the "Skills Dashboard" grid.
export type SkillHighlight = {
  name: string;
  caption: string;
  icon: string;
  accent: string; // tailwind text/border accent class for the icon chip
};

export const skillHighlights: SkillHighlight[] = [
  { name: "SQL", caption: "Advanced Querying", icon: "Database", accent: "sky" },
  { name: "Python", caption: "Data Analysis & Automation", icon: "Code2", accent: "amber" },
  { name: "Power BI", caption: "Dashboard & Reporting", icon: "BarChart3", accent: "yellow" },
  { name: "Tableau", caption: "Data Viz & Storytelling", icon: "PieChart", accent: "blue" },
  { name: "Machine Learning", caption: "ML Models & Algorithms", icon: "Brain", accent: "violet" },
  { name: "Azure", caption: "Cloud & Data Engineering", icon: "Cloud", accent: "cyan" },
];

export const certifications = [
  {
    title: "IBM Data Analyst Professional Certificate",
    issuer: "IBM",
    year: "2025",
  },
  {
    title: "IBM Generative AI: Prompt Engineering",
    issuer: "IBM",
    year: "—",
  },
  {
    title: "Microsoft Azure Machine Learning Fundamentals",
    issuer: "Microsoft",
    year: "—",
  },
  {
    title: "Career Essentials in System Administration",
    issuer: "Microsoft",
    year: "—",
  },
];

export const education = [
  {
    degree: "Master of Science, Computer Science",
    school: "Algoma University",
    location: "Sault Ste. Marie, ON, Canada",
    start: "Jan 2025",
    end: "Dec 2025",
    focus:
      "Graduate studies focused on data analytics, machine learning, database systems, and business intelligence — forming the technical foundation behind my analytical and data-driven problem-solving approach. Coursework combined statistical analysis, predictive modeling, data visualization, and modern data engineering practices with hands-on industry-oriented projects. Gained practical experience working with SQL, Python, ETL pipelines, dashboard development, exploratory data analysis (EDA), and machine learning workflows to transform complex datasets into actionable business insights. The program emphasized both technical depth and real-world application, strengthening my ability to bridge data, technology, and strategic decision-making.",
    coursework: [
      "Data Analytics",
      "Machine Learning",
      "Database Systems",
      "Statistical Methods",
    ],
  },
];

export const awards = [
  "Best Engineering Award & First Runner-up — ABU Robocon",
  "First Place — Journey to Mustang (Robotic Association of Nepal)",
  "Best Innovative Award (Solar Panel Cleaning) — LOCUS",
];
