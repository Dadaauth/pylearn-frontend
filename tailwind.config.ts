import type { Config } from "tailwindcss";
const {heroui} = require("@heroui/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // typography: (theme: (path: string) => string) => ({
      //   DEFAULT: {
      //     css: {
      //       h1: {
      //         color: theme('colors.white'),
      //       },
      //       h2: {
      //         color: theme('colors.white'),
      //       },
      //       p: {
      //         color: theme('colors.gray.700'),
      //       },
      //     },
      //   },
      // }),
    },
  },
  darkMode: "class",
  plugins: [heroui(), require('@tailwindcss/typography')],
};
export default config;
