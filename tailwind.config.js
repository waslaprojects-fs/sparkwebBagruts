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
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.45 },
          "50%": { opacity: 0.8 },
        },
        fadeSlideUp: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        slideInRight: {
          "0%": { opacity: 0, transform: "translateX(48px)" },
          "100%": { opacity: 1, transform: "translateX(0px)" },
        },
        slideInLeft: {
          "0%": { opacity: 0, transform: "translateX(-48px)" },
          "100%": { opacity: 1, transform: "translateX(0px)" },
        },
        bigBangRing: {
          "0%": { transform: "translate(-50%, -50%) scale(0.1)", opacity: 0.95 },
          "70%": { opacity: 0.65 },
          "100%": { transform: "translate(-50%, -50%) scale(7)", opacity: 0 },
        },
        starTwinkle: {
          "0%, 100%": { opacity: 0.15, transform: "scale(0.8)" },
          "50%": { opacity: 1, transform: "scale(1.05)" },
        },
        emberRise: {
          "0%": { opacity: 0.25, transform: "translateY(8px) scale(0.85)" },
          "50%": { opacity: 0.95, transform: "translateY(-4px) scale(1)" },
          "100%": { opacity: 0.2, transform: "translateY(-14px) scale(0.8)" },
        },
        bigBangParticle: {
          "0%": {
            transform:
              "translate(-50%, -50%) translate(0px, 0px) scale(0.35)",
            opacity: 0,
          },
          "15%": {
            opacity: 1,
          },
          "65%": {
            transform:
              "translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1.15)",
            opacity: 1,
          },
          "100%": {
            transform:
              "translate(-50%, -50%) translate(calc(var(--tx) + var(--dx)), calc(var(--ty) + var(--dy))) scale(0.9)",
            opacity: 0.7,
          },
        },
        layerReveal: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        emberDrift: {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
            opacity: 0.85,
          },
          "25%": {
            transform: "translate(6px, -7px) scale(1.08)",
            opacity: 1,
          },
          "50%": {
            transform: "translate(-5px, -12px) scale(0.96)",
            opacity: 0.78,
          },
          "75%": {
            transform: "translate(4px, -5px) scale(1.04)",
            opacity: 0.92,
          },
        },
      },
      animation: {
        flyIn: "flyIn 1s ease-out forwards", // "forwards" ensures it stops at the final position
        floatSlow: "floatSlow 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        fadeSlideUp: "fadeSlideUp 700ms ease-out both",
        slideInRight: "slideInRight 850ms ease-out both",
        slideInLeft: "slideInLeft 850ms ease-out both",
        bigBangRing: "bigBangRing 1500ms ease-out forwards",
        starTwinkle: "starTwinkle 2.8s ease-in-out infinite",
        emberRise: "emberRise 2.2s ease-in-out infinite",
        bigBangParticle: "bigBangParticle 2600ms ease-out forwards",
        layerReveal: "layerReveal 700ms ease-out forwards",
        emberDrift: "emberDrift 3.8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
