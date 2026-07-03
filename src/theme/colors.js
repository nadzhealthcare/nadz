// Centralized color palette for the application
export const colors = {
  // Primary Brand Colors
  primary: {
    main: '#4F052B',
    light: '#6c0d3a',
    dark: '#4F052B',
    darkBlue: '#4F052B',
    mediumBlue: '#4F052B',
    contrast: '#FDFEFF',
  },

  // Secondary Colors
  secondary: {
    main: '#A855F7',
    light: '#D8B4FE',
    dark: '#7C3AED',
  },

  // Accent Colors
  accent: {
    gold: '#dfb680',
    goldDark: '#d4a970',
    goldLight: '#e8c599',
    burgundy: '#6c2a37',
  },

  // Neutral Colors
  neutral: {
    black: '#000000',
    darkGray: '#1A1A1A',
    mediumGray: '#1A202C',
    lightGray: 'rgba(148, 163, 184, 0.25)',
    white: '#FFFFFF',
  },

  // Status Colors
  status: {
    success: '#10B981',
    info: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  },

  // Text Colors
  text: {
    primary: '#020617',
    secondary: 'rgba(15, 23, 42, 0.7)',
    darkTeal: '#033A4E',
    darkBlue: '#083A4E',
    tealBlue: '#0B3A4E',
    navyBlue: '#08314E',
  },

  // Background Colors
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
    cream: '#f9f0e6',
    footer: '#4F052B',
    gradient: {
      primary: 'linear-gradient(135deg, #6c0d3a 0%, #4F052B 50%, #3d0421 100%)',
      secondary: 'linear-gradient(135deg, #A78BFA 0%, #6366F1 50%, #4F46E5 100%)',
      violet: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
      blueGradient: 'linear-gradient(135deg, #4F052B 0%, #6c0d3a 100%)',
      creamGradient: 'linear-gradient(180deg, #f9f0e6 0%, #f5e8d8 50%, #ecdcc8 100%)',
    },
  },

  // Hover Colors
  hover: {
    primary: '#6c0d3a',
    gold: '#d4a970',
    black: '#1A1A1A',
  },

  // Shadow Colors (with opacity)
  shadow: {
    primary: 'rgba(79, 5, 43, 0.3)',
    gold: 'rgba(223, 182, 128, 0.15)',
    black: 'rgba(0, 0, 0, 0.15)',
    paper: 'rgba(15, 23, 42, 0.08)',
  },
};

// Export individual color groups for easier imports
export const { primary, secondary, accent, neutral, status, text, background, hover, shadow } = colors;

