import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          300: "#f0d488",
          400: "#e6c368",
          500: "#d4a94a",
          600: "#b8892f",
        },
        ink: {
          900: "#0b0c10",
          800: "#14161d",
          700: "#1c1f29",
        },
      },
      backgroundImage: {
        "gradient-luxury": "linear-gradient(160deg, #0b0c10 0%, #14161d 45%, #1c1f29 100%)",
      },
    },
  },
  plugins: [],
};

export default config;