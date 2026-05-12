/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
