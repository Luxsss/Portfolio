import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        "on-ink": "var(--on-ink)",
        "on-ink-muted": "var(--on-ink-muted)",
      },
      fontFamily: {
        sans: ["var(--font-nohemi)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
