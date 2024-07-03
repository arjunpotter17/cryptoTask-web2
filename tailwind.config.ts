import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cryptoTask-orange": "#E06600",
        "cryptoTask-white": "#F7F7F7",
        "cryptoTask-dark-white": "#F2F2F2",
        "cryptoTask-dark-orange": "#A04000",
        "cryptoTask-black": "#000000",
        "cryptoTask-popup-bg": "#2d3748",
      },
      fontFamily: {
        "cryptoTask-bold": ["Space Grotesk Bold", "sans-serif"],
        "cryptoTask-regular": ["Space Grotesk Regular", "sans-serif"],
        "cryptoTask-light": ["Space Grotesk light", "sans-serif"],
        "cryptoTask-semibold": ["Space Grotesk Semibold", "sans-serif"],
      },
      fontSize: {
        "cryptoTask-banner-header": "3.25rem",
        "cryptoTask-banner-header-mobile": "2rem",
        "cryptoTask-title": "1.5rem",
        "cryptoTask-title-mobile": "1rem",
        "cryptoTask-subtitle": "1rem",
        "cryptoTask-subtitle-mobile": "0.75rem",
        "cryptoTask-text": "0.75rem",
        "cryptoTask-text-mobile": "0.5rem",
      },
      screens: {
        "ct-sm": "321px",
        "ct-md": "688px",
        "ct-lg": "980px",
        "ct-xl": "1248px",
      },
    },
  },
  plugins: [],
};
export default config;
