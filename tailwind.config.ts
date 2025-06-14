import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
   darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(240 5.9% 90%)", // or any color value you want
      },
    },
  },
  plugins: [],
};

export default config;
