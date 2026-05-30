import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { profile } from "@/data/resume";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://baburam-adhikari.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Baburam Adhikari — Data Analyst | SQL · Python · Power BI",
    template: "%s | Baburam Adhikari",
  },
  description:
    "Data Analyst based in Edmonton, AB. SQL, Python, Power BI, Tableau, ETL, KPI dashboards, machine learning. IBM Data Analyst certified, MSc Computer Science (Algoma University).",
  keywords: [
    "Data Analyst",
    "Business Analyst",
    "Business Intelligence Analyst",
    "Power BI",
    "Tableau",
    "SQL",
    "Python",
    "ETL",
    "Machine Learning",
    "KPI Dashboards",
    "Edmonton",
    "Canada",
    "Baburam Adhikari",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Baburam Adhikari — Data Analyst",
    description:
      "Turning data into business insights. SQL · Python · Power BI · Tableau · ETL · ML.",
    siteName: "Baburam Adhikari Portfolio",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baburam Adhikari — Data Analyst",
    description:
      "Turning data into business insights. SQL · Python · Power BI · Tableau · ETL · ML.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080f1c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  jobTitle: "Data Analyst",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Edmonton",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: [
    "Data Analysis",
    "Business Intelligence",
    "SQL",
    "Python",
    "Power BI",
    "Tableau",
    "ETL",
    "Machine Learning",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Algoma University" },
    { "@type": "CollegeOrUniversity", name: "Sardar Patel University" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:rounded focus-visible:bg-navy-800 focus-visible:px-3 focus-visible:py-2 focus-visible:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
