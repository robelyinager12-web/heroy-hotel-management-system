import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          400: "#d4af37",
          500: "#c19a2e",
        },
      },
      backgroundImage: {
        "gradient-luxury": "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      },
    },
  },
  plugins: [],
};

export default config;