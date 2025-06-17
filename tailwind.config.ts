/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Montserrat", "Arial", "Helvetica", "sans-serif"],
        },
        colors: {
          background: '#faf6ff', // light background
          foreground: '#2d234a', // main text
          muted: '#94a3b8',      // secondary text
          card: '#fff',          // card background
          border: '#e3d7fa',     // borders/dividers
          primary: '#2d234a',    // deep purple (for text)
          highlight: '#6c3fd1',  // accent purple (for bg)
          'slate-900': '#0f172a', // for strong headings
          'slate-700': '#334155', // for muted headings
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