/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#FAFAF9',
        graphite: '#2D2D2D',
        gold: '#C5A059',
        'gold-light': '#D4B876',
        'gold-dark': '#A68843',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      animation: {
        'pulse-gold': 'pulseGold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(197, 160, 89, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(197, 160, 89, 0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};
