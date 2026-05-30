import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
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
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "gradient": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "gradient": "gradient 8s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
