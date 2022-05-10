module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      keyframes: {
        slidein: {
          '0%': { bottom: '-100%' },
          '100%': { bottom: '0' }
        },
        slideout: {
          '0%': { bottom: '0' },
          '100%': { bottom: '-100%' }
        }
      }
    },
  },
  plugins: [],
}