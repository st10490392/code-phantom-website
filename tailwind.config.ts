import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "phantom-black": "#05070D",
        "midnight-navy": "#09111F",
        surface: "#0D1627",
        "surface-raised": "#121D33",
        "phantom-purple": "#7C3AED",
        "cyber-blue": "#168BFF",
        "electric-blue": "#00BFFF",
        "metallic-silver": "#C9CDD5",
        "muted-text": "#8792A5",
        "ghost-white": "#F5F7FA",
        // Accent — premium gold. Pairs with the purple→blue gradient for an
        // established, New York feel. Used sparingly on CTAs and highlights.
        "accent-gold": "#E0A850",
        "accent-gold-deep": "#B8893A",
        "accent-gold-soft": "rgba(224, 168, 80, 0.15)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "phantom-gradient":
          "linear-gradient(135deg, #7C3AED 0%, #168BFF 60%, #00BFFF 100%)",
        "phantom-radial":
          "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.18), transparent 60%)",
        "grid-pattern":
          "linear-gradient(rgba(201,205,213,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,205,213,0.06) 1px, transparent 1px)",
        "accent-gold-gradient":
          "linear-gradient(135deg, #E0A850 0%, #D4933A 50%, #B8893A 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,58,237,0.25)",
        "glow-blue": "0 0 40px rgba(22,139,255,0.25)",
        "glow-gold": "0 0 40px rgba(224,168,80,0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "gold-pulse": "goldPulse 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        goldPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;