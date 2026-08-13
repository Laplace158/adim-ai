/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FDF6F2',
          100: '#F9ECE6',
          200: '#F2D5C8',
          500: '#C85A32',
          600: '#B04A26',
          700: '#8E381A',
          900: '#5C220E',
        },
        indigo: {
          50: '#F3F4F8',
          100: '#E4E6F0',
          500: '#3B4274',
          600: '#2E3460',
          700: '#22274A',
          900: '#151830',
        },
        warm: {
          bg: '#FBF9F6',
          card: '#FFFFFF',
          border: '#EFE8E1',
          subtle: '#F4ECE4',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
