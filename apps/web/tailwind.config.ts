import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        champagne: {
          200: "#f3e6c8",
          300: "#e8d4a3",
          400: "#d4b872",
          500: "#c2a052",
          600: "#a3833d",
        },
        navy: {
          950: "#070a10",
          900: "#0d1119",
          800: "#141a26",
          700: "#1c2434",
          600: "#2a3448",
        },
        platinum: {
          100: "#f4f5f7",
          300: "#c9ccd4",
          500: "#8b909e",
        },
      },
      backgroundImage: {
        "gradient-luxury": "linear-gradient(160deg, #070a10 0%, #0d1119 45%, #141a26 100%)",
      },
    },
  },
  plugins: [],
};

export default config;