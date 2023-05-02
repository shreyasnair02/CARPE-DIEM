/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#404040",
          200: "#1e1e1e",
          300: "#0d0d0d",
          400: "#191919",
        },
        primary: "#faa401",
        danger: {
          100: "#FB4039",
          200: "#3e0002;",
        },
        accent: {
          100: "#fefefe",
          200: "#E9E9E97a",
        },
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      adelia: ["ADELIA", "cursive"],
    },
  },
  plugins: [],
};
