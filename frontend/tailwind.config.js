/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#00527A',
        'brand-secondary': '#009DFF',
        'brand-light': '#E6F6FF',
        'brand-dark': '#002A3F',
        'neutral-light': '#F8F9FA',
        'neutral-medium': '#E9ECEF',
        'neutral-dark': '#343A40',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}