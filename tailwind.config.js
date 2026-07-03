/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#4F052B',
          light: '#6c0d3a',
          dark: '#4F052B',
          darkBlue: '#4F052B',
          mediumBlue: '#4F052B',
          heading: '#5C2533',
          contrast: '#FDFEFF',
        },
        secondary: {
          main: '#A855F7',
          light: '#D8B4FE',
          dark: '#7C3AED',
        },
        accent: {
          gold: '#dfb680',
          goldDark: '#d4a970',
          goldLight: '#e8c599',
          burgundy: '#6c2a37',
        },
        neutral: {
          black: '#000000',
          darkGray: '#1A1A1A',
          mediumGray: '#1A202C',
          lightGray: 'rgba(148, 163, 184, 0.25)',
          white: '#FFFFFF',
        },
        status: {
          success: '#10B981',
          info: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        text: {
          primary: '#020617',
          secondary: 'rgba(15, 23, 42, 0.7)',
          darkTeal: '#033A4E',
          darkBlue: '#083A4E',
          tealBlue: '#0B3A4E',
          navyBlue: '#08314E',
          gray: '#7a7a7a',
        },
        background: {
          default: '#FFFFFF',
          paper: '#FFFFFF',
          cream: '#f9f0e6',
          footer: '#4F052B',
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        grotesk: ["var(--font-grotesk)", 'Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        'full': '999px',
      },
      boxShadow: {
        'card': '0 24px 60px rgba(15, 23, 42, 0.08)',
        'gold': '0 4px 12px rgba(223, 182, 128, 0.15)',
        'primary': '0 4px 16px rgba(79, 5, 43, 0.35)',
      },
    },
  },
  plugins: [],
}

