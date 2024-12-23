// tailwind.config.js
import { nextui, colors } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const module = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
        dark: {
          colors: {
            background: "#09090B",
          },
        },
      },
    }),
  ],
};

export default module;
