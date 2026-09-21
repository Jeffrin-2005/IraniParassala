/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        ink: "#171717",
        charcoal: "#262626",
        muted: "#737373",

        paper: "#FAFAF9",
        cream: "#F5F5F4",

        coffee: "#4A3728",
        brown: "#6B5140",

        line: "#E5E5E5",
      },

      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Manrope"', "Arial", "sans-serif"],
      },

      boxShadow: {
        minimal: "0 10px 30px rgba(0,0,0,0.06)",
        soft: "0 20px 50px rgba(0,0,0,0.08)",
      },
    },
  },

  plugins: [],
};