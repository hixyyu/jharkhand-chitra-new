/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FAF6F0',      // Soft primary light background
          sand: '#F4EFE6',       // Slightly darker warm accent background
          beige: '#EFE9DF',      // Deep warm beige
          latte: '#E6DFD5',      // Creamy brown
          mocha: '#5C4033',      // Dark chocolate accent color
          espresso: '#1C1412',   // Primary dark background
          cocoa: '#2D1F1C',      // Warm charcoal dark background
          gold: '#D4A373',       // Luxurious ethnic highlight
          bronze: '#E29578',     // Terracotta/copper ethnic highlight
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212, 163, 115, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(212, 163, 115, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
