/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "san-serif"],
        orbitron: ["Orbitron", "san-serif"],
      },
      colors: {
        primary: "#2F8DFF",
        primaryDark: "#00229E"
      }
    },
  },
  plugins: [],
}

