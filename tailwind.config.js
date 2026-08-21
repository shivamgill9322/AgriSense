/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f4',
          100: '#e1f3e5',
          200: '#c5e7cc',
          300: '#9bd2a7',
          400: '#6bb57b',
          500: '#469858',
          600: '#347a44',
          700: '#2b6137',
          800: '#254e2f',
          900: '#1e4128',
          950: '#0b2314',
        },
        earth: {
          50: '#faf7f2',
          100: '#f3ece0',
          200: '#e5d7c2',
          300: '#d4bc9e',
          400: '#c29d78',
          500: '#b4855d',
          600: '#a57251',
          700: '#895a43',
          800: '#714b3b',
          900: '#5c3e32',
          950: '#321f1a',
        },
        dark: {
          bg: '#080d09',
          card: '#101912',
          surface: '#152218',
          border: '#1f3324',
          hover: '#273e2d',
        },
        neon: {
          green: '#70e000',
          lime: '#38b000',
          amber: '#ffb703',
          gold: '#e9c46a',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '95%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
