/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      padding: {
        38: '9.5rem',
        15: '3.5rem',
      },
    },
  },
  plugins: [],
};
