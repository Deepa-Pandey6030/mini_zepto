// tailwind.config.js
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
        primary: '#FF5733',
        secondary: '#33FF57',
        dark: '#1a202c',
        light: '#f7fafc',
      },
      // --- ADD THESE KEYFRAMES ---
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'ping-pulse': { // More subtle ping
          '0%': {
            transform: 'scale(1)',
            opacity: '0.7'
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '0.7'
          }
        }
      },
      // --- ADD THESE ANIMATIONS ---
      animation: {
        'bounce-slow': 'bounce-slow 3s infinite ease-in-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards', // 'forwards' keeps the end state
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'ping-pulse': 'ping-pulse 2s infinite ease-in-out',
      },
      // --- ENSURE TEXT SHADOW IS HERE (from previous steps) ---
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        md: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    // --- ENSURE TEXT SHADOW PLUGIN IS HERE (from previous steps) ---
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: theme('textShadow.sm', '0 1px 2px rgba(0, 0, 0, 0.2)'),
        },
        '.text-shadow-md': {
          textShadow: theme('textShadow.md', '0 2px 4px rgba(0, 0, 0, 0.3)'),
        },
        '.text-shadow-lg': {
          textShadow: theme('textShadow.lg', '0 8px 16px rgba(0, 0, 0, 0.4)'),
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}