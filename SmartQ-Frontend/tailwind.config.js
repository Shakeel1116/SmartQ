/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode using the 'class' strategy
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 4s infinite',
        'bounce-slower': 'bounce 6s infinite',
        'bounce-slowest': 'bounce 8s infinite',
      },
    },
  },
  plugins: [],
};
