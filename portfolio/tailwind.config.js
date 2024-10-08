/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // This should include your Header component
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#E50914', // Adding custom red color
      },
    },
  },
  plugins: [],
}