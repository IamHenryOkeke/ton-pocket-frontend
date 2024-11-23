/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "san-serif"],
        orbitron: ["Orbitron", "san-serif"],
        "tnr-bold": ["tnr-bold", "san-serif"], // Times New Romans
      },
      colors: {
        primary: "#2F8DFF",
        primaryDark: "#00229E",
        secondary: "#7291FF",
        textSecondary: "#606060",
      },
    },
  },
  plugins: [],
};
