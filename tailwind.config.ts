import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6D28D9',
          light: '#8B5CF6',
          dark: '#4C1D95',
        },
      },
    },
  },
  plugins: [],
};
export default config;
