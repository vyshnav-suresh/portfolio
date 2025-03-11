/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          background: "#121212",
          secondary: "#1E1E1E",
          text: "#F5F5F5",
          accent: "#00A8E8",
          highlight: "#8A2BE2",
        },
      },
    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  };
  