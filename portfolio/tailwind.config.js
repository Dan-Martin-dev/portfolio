/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // This should include your Header component
  ],
  theme: {
    extend: {
      colors: {
        strongRed:'#EF0307 ' // Adding custom red color
      },
    },
  },
  plugins: [],
}