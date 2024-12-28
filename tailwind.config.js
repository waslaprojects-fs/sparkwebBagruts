module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure your JS, JSX, TS, and TSX files are included
  ],
  theme: {
    extend: {
      animation: {
        "pulse-twice": "pulse 1s ease-out 2",
      },
    },
  },

  plugins: [require("tailwind-scrollbar-hide")],
};
