/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#1A1310",
          light: "#241A15",
        },
        coffee: {
          DEFAULT: "#2E1D14",
          light: "#3D2A1E",
        },
        burgundy: {
          DEFAULT: "#6B1F2E",
          light: "#8A2A3C",
          dark: "#4E1521",
        },
        cream: {
          DEFAULT: "#F5EEE1",
          soft: "#EFE5D2",
          deep: "#E7D9BE",
        },
        gold: {
          DEFAULT: "#B9924F",
          light: "#D4B47E",
          dark: "#8F7139",
        },
        terracotta: {
          DEFAULT: "#C1602B",
          light: "#D97F4C",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ['"Manrope"', "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(26, 19, 16, 0.45)",
        card: "0 12px 30px -12px rgba(26, 19, 16, 0.35)",
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
      },
    },
  },
  plugins: [],
};
