import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#3DBA6F", // Evergreen
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F2B441", // Harvest Gold
          foreground: "#001E2B",
        },
        accent: {
          DEFAULT: "#001E2B", // Midnight
          foreground: "#FFFFFF",
        },
        neutral: {
          cloud: "#F9FAFB",
          mist: "#E2E8F0",
          steel: "#64748B",
        },
        destructive: {
          DEFAULT: "#FF5252",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "20px",
        md: "12px",
        sm: "8px",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        display: ["Sora", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "confetti-sweep": {
          "0%": { transform: "translateY(-300px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(0) rotate(20deg)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "confetti-sweep": "confetti-sweep 1.6s cubic-bezier(.17,.67,.83,.67) forwards",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.06)",
      },
      spacing: {
        gutter: "72px",
        rhythm: "24px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config; 