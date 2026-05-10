/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── LUXURY PALETTE ───────────────────────────────────────────────
        // Brand: Warm Gold / Caramel
        brand: {
          50:  '#fdf8ec',
          100: '#f9edcc',
          200: '#f3d996',
          300: '#ecc05a',
          400: '#e4a82c',   // warm gold highlight
          500: '#c98f1e',   // core caramel-gold
          600: '#a97218',
          700: '#855612',
          800: '#623d0e',
          900: '#3e270a',
        },
        // Background: Deep navy
        background: '#07080f',    // near-black navy
        surface:    '#0d1020',    // slightly lighter navy panel
        // Cream text tokens mapped via CSS var in index.css
        cream: {
          50:  '#fdfaf4',
          100: '#f7f0e0',
          200: '#ede2c5',
          300: '#dfd0a8',
          400: '#ceba87',
          500: '#b89f68',
        },
        // Navy shades for borders / dividers
        navy: {
          700: '#111827',
          800: '#0c1120',
          900: '#07080f',
        },
      },
      fontFamily: {
        sans:    ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body:    ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #c98f1e 0%, #e4a82c 40%, #f3d996 60%, #c98f1e 100%)',
        'navy-radial':  'radial-gradient(ellipse at top, #111827 0%, #07080f 70%)',
      },
      boxShadow: {
        'gold-sm':  '0 0 12px rgba(201,143,30,0.25)',
        'gold-md':  '0 0 25px rgba(201,143,30,0.35)',
        'gold-lg':  '0 0 50px rgba(201,143,30,0.45)',
        'navy':     '0 4px 32px rgba(7,8,15,0.8)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'float':   'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
