/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      fontFamily: {
        'Sohne': ['Sohne', 'sans-serif'],
        'sohne-mono': ['Sohne Mono', 'monospace'],
        'sohne-header': ['Sohne Header', 'sans-serif']
      },
    },
  },
  plugins: [],
} 