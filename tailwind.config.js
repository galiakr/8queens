/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#121D17',
        felt: '#1B2C22',
        cream: '#F3EFE4',
        sage: '#9DB2A4',
        mint: '#98FB98',
        gold: '#FFEC8B',
        rose: '#FFB6C1',
        parchment: '#EFE7D3',
        pencil: '#B0424F',
        club: '#2F6B3C',
        brass: '#8F6E1F',
      },
      borderColor: {
        line: 'rgba(243, 239, 228, 0.14)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
