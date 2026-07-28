import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: "#e5c07b",
          500: "#d4af37",
          600: "#b8952e",
        },
      },
      backgroundImage: {
        "gradient-aurora": "linear-gradient(120deg, #7c3aed, #db2777, #d4af37)",
      },
    },
  },
  plugins: [],
};

export default config;