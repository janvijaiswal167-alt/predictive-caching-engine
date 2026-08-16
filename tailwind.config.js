/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          purple: '#7C3AED',
          cyan: '#06B6D4',
          dark: '#030712',
          card: 'rgba(15, 23, 42, 0.65)',
          glass: 'rgba(255, 255, 255, 0.05)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(37, 99, 235, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(124, 58, 237, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, rgba(37, 99, 235, 0.15), rgba(124, 58, 237, 0.15), transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glow-gradient': 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
      }
    },
  },
  plugins: [],
}
