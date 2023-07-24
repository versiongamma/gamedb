/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    screens: {
      sm: { max: "900px" },
      md: { max: "1200px" },
    },
    extend: {
      colors: {
        primary: {
          default: " #9F3EFF",
          100: "#D9C2FD",
          200: "#9F3EFF",
        },
        secondary: "#FFAB32",
        white: "#FEFEFE",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
