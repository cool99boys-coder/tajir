export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0c',
          900: '#0f0f12',
          800: '#16161a',
          700: '#1e1e24',
          600: '#2a2a30',
        },
        gold: {
          DEFAULT: '#d4af37',
          soft: '#e8c766',
          deep: '#a8842a',
          50: '#f8f1dd',
        },
        emerald: {
          glow: '#34d399',
        },
        cream: '#ece7db',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(0,0,0,0.7)',
        card: '0 12px 40px -12px rgba(0,0,0,0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
