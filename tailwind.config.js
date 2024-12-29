module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        messiri: ['"El Messiri"', "sans-serif"],
      },
      keyframes: {
        flyIn: {
          "0%": {
            transform: "translateX(100%) translateY(-100%)", // Start from the top-right corner (off-screen)
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0) translateY(0)", // Stop at its final position
            opacity: 1,
          },
        },
      },
      animation: {
        flyIn: "flyIn 1s ease-out forwards", // "forwards" ensures it stops at the final position
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
