/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f6f1',
          100: '#f3ece0',
          200: '#e6d5c1',
          300: '#d9bea1',
          400: '#cca782',
          500: '#bf9063',
          600: '#a67344',
          700: '#8c5a25',
          800: '#734106',
          900: '#5a2800',
        },
        secondary: {
          50: '#f5f3f2',
          100: '#e6e0dd',
          200: '#d1c3bc',
          300: '#bca69b',
          400: '#a7897a',
          500: '#926c59',
          600: '#7d4f38',
          700: '#683217',
          800: '#531500',
          900: '#3e0000',
        },
        accent: {
          50: '#fcf5eb',
          100: '#f8e5cc',
          200: '#f1cb99',
          300: '#eab166',
          400: '#e39733',
          500: '#dc7d00',
          600: '#c66300',
          700: '#b04900',
          800: '#9a2f00',
          900: '#841500',
        },
        success: {
          50: '#f0f9f0',
          100: '#dcf1dc',
          200: '#bbe3bb',
          300: '#99d599',
          400: '#77c777',
          500: '#55b955',
          600: '#339b33',
          700: '#117d11',
          800: '#005f00',
          900: '#004100',
        },
      },
      fontFamily: {
        'display': ['Literata', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'page': '2px 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'leather': 'repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 4px)',
        'parchment': 'linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
    },
  },
  plugins: [],
};