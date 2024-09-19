/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFAF2A',
        'red-main': '#FF3232',
        'green-main': '#3AC73B',
      },
      padding: {
        38: '9.5rem',
        15: '3.5rem',
      },
      height: {
        88: '22rem',
      },
    },
  },
  plugins: [],
};
