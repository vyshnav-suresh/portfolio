/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Montserrat", "Arial", "Helvetica", "sans-serif"],
        },
        colors: {
          background: '#0f172a', // dark navy
          foreground: '#f1f5f9', // light text
          muted: '#94a3b8',      // secondary text
          card: '#1e293b',       // card background
          border: '#334155',     // borders/dividers
          accent: {
            DEFAULT: '#38bdf8',  // primary accent blue
            hover: '#0ea5e9',    // accent hover
          },
          success: '#22c55e',
          warning: '#facc15',
          danger: '#ef4444',
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};