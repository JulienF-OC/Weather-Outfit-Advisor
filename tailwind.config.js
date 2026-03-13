module.exports = {
  theme: {
    extend: {
      keyframes: {
        pulse: { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.1)' } },
        fall: { '0%': { transform: 'translateY(-50px)' }, '100%': { transform: 'translateY(100vh)' } },
        slide: { '0%': { transform: 'translateX(-20px)' }, '100%': { transform: 'translateX(20px)' } },
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
        fall: 'fall 3s linear infinite',
        slide: 'slide 6s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};