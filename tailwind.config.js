module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure your JS, JSX, TS, and TSX files are included
  ],
  theme: {
    extend: {},
  },

  plugins: [require("tailwind-scrollbar-hide")],
};
