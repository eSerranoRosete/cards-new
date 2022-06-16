module.exports = {
  darkMode: "class",
  content: ["./views/**/*.{ejs,html}"],
  theme: {
    extend: {
      keyframes: {
        slidein: {
          "0%": { bottom: "-100%" },
          "100%": { bottom: "0" },
        },
        slideout: {
          "0%": { bottom: "0" },
          "100%": { bottom: "-100%" },
        },
      },
    },
  },
  plugins: [],
};
