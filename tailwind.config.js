/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },

      colors: {
        // BASE BACKGROUND (soft biru putih)
        base: {
          light: '#F5F9FF',
          white: '#FFFFFF',
        },

        // PRIMARY — Bright Blue (#3572EF)
        primary: {
          50: '#EAF1FF',
          100: '#D6E4FF',
          200: '#AEC6FF',
          300: '#85A7FF',
          400: '#5C8BFF',
          500: '#3572EF', // WARNA UTAMA
          600: '#2D63D1',
          700: '#234EAD',
          800: '#193A85',
          900: '#10265C',
        },

        // SECONDARY — Aqua Blue (cocok sebagai pendamping)
        secondary: {
          50: '#EAFDFF',
          100: '#CCF9FF',
          200: '#99F1FF',
          300: '#66E8FF',
          400: '#33DEFF',
          500: '#00D4FF',
          600: '#00B4D6',
          700: '#008EAD',
          800: '#006885',
          900: '#00435C',
        },

        // CHART COLORS (selaras dengan primary #3572EF)
        chart: {
          blue: '#3B82F6',
          green: '#10B981',
          amber: '#F59E0B',
          indigo: '#6366F1',
          pink: '#EC4899',
          rose: '#F43F5E',
        },

        // Modern Gray (UI Friendly)
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        fadeSlideIn: 'fadeSlideIn 0.80s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
