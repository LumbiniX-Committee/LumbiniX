/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7E4A9E', // Logo Purple
          dark: '#62387B',
          light: '#9B6BBA',
        },
        accent: {
          DEFAULT: '#F9D423', // Logo Yellow/Gold
          dark: '#D4AF37',
          light: '#FFEB3B',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#F8FAFC',
          light: '#F1F5F9',
        },
        bg: {
          DEFAULT: '#FFFFFF',
          alt: '#F8FAFC',
        },
        muted: {
          DEFAULT: '#64748B',
          light: '#94A3B8',
        },
        // Dark mode specific colors
        dark: {
          bg: '#0a0a0f',
          surface: '#12121a',
          card: '#1a1a2e',
          border: '#2a2a3e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(126, 74, 158, 0.4)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(126, 74, 158, 0.6)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
