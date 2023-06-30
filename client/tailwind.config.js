module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'title': '#061647',
      },
      screens: {
        sm: { min: "0px", max: "767px" },
        tablet: { min: "0px", max: "1024px" },
      },
      keyframes: {
        bgAnimation: {
          '100%': { transform: 'translate(0,0)' },
          '0%': { transform: 'translate(0,50px)' },
        }
      },
      animation: {
        bgAnimationTop: 'bgAnimation 6s ease-in-out 2s infinite alternate',
        bgAnimationBot: 'bgAnimation 8s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}

