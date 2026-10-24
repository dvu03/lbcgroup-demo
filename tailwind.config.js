/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E7C86',
          hover: '#0A4F57',
          light: '#EEF7F8',
          50: '#F0F9FA',
          100: '#EEF7F8',
          200: '#CBE7EB',
          300: '#97D2D9',
          400: '#54B2BC',
          500: '#0E7C86',
          600: '#0C6A73',
          700: '#0A4F57',
          800: '#094046',
          900: '#073338'
        },
        medical: {
          bg: '#EEF7F8',
          dark: '#0A4F57',
          charcoal: '#1E293B',
          muted: '#64748B',
          card: '#FFFFFF'
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Fraunces', 'Georgia', 'serif'],
        serif: ['var(--font-heading)', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-body)', '"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['var(--font-body)', '"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(14, 124, 134, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'glow': '0 0 25px rgba(14, 124, 134, 0.25)',
      },
      maxWidth: {
        'site': '1380px',
        '7xl': '1380px',
      }
    },
  },
  plugins: [],
}
