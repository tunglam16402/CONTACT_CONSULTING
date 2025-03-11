import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"], // Font mặc định
        serif: ["var(--font-merriweather)", "serif"], // Font tiêu đề
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
