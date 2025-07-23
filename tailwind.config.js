/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#FF5733', // A vibrant orange for primary actions
        secondary: '#33FF57', // A green for accents or success
        dark: '#1a202c', // Dark gray for text/backgrounds
        light: '#f7fafc', // Light gray for backgrounds
      },
    },
  },
  plugins: [],
}