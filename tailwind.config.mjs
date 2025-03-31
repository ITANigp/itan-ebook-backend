/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {  
        xs: { min: "390px", max: "490px"},
        medium: { min: "500px", max: "900px" },
        large: { min: "900px", max: "1280px" },
        xl: { min: "1280px" },
      },
    },
  },
  plugins: [],
};