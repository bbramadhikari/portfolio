import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f1f4f9",
          100: "#dde4ef",
          200: "#b8c8de",
          300: "#8aa4c5",
          400: "#5b7fa9",
          500: "#3d6390",
          600: "#2f4d73",
          700: "#243c5a",
          800: "#1a2b42",
          900: "#0f1a2b",
          950: "#080f1c",
        },
        // Primary brand accent — Airbnb-inspired coral.
        coral: {
          50: "#fff1f1",
          100: "#ffe1e2",
          200: "#ffc8ca",
          300: "#ffa1a5",
          400: "#ff7b80",
          500: "#ff5a5f",
          600: "#ed3d43",
          700: "#c82b31",
          800: "#a5272c",
          900: "#88262a",
          950: "#4b0f12",
        },
        // Kept for backwards-compatible references in legacy components.
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2.5xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(15, 26, 43, 0.08), 0 4px 24px -4px rgba(15, 26, 43, 0.06)",
        card: "0 1px 2px rgba(15, 26, 43, 0.04), 0 8px 32px -8px rgba(15, 26, 43, 0.12)",
        lift: "0 12px 40px -12px rgba(15, 26, 43, 0.22)",
        glow: "0 8px 32px -8px rgba(255, 90, 95, 0.45)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "pulse-slow": "pulse-slow 5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
