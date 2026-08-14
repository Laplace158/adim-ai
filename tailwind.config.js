/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F9F8F6',
          2: '#F3F0EC',
        },
        ink: '#241E2B',
        muted: '#766F82',
        line: '#E5DFDA',
        orange: {
          DEFAULT: '#E06438',
          deep: '#C85A32',
          soft: '#F6E7DF',
        },
        indigo: {
          DEFAULT: '#1E2338',
          2: '#272E49',
          board: '#181C2E',
        },
        mint: '#A4E8C2',
        'white-tint': '#FCFCFB',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
