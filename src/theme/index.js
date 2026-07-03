import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { colors } from './colors';

const baseTheme = () =>
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: colors.primary.main,
        light: colors.primary.light,
        dark: colors.primary.dark,
        contrastText: colors.primary.contrast,
      },
      secondary: {
        main: colors.secondary.main,
        light: colors.secondary.light,
        dark: colors.secondary.dark,
      },
      info: {
        main: colors.status.info,
      },
      success: {
        main: colors.status.success,
      },
      background: {
        default: colors.background.default,
        paper: colors.background.paper,
      },
      divider: colors.neutral.lightGray,
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
      },
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: "var(--font-inter, 'Inter'), 'Space Grotesk', sans-serif",
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            paddingInline: '1.5rem',
            paddingBlock: '0.75rem',
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            border: '1px solid rgba(148, 163, 184, 0.25)',
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 24,
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'lg',
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#FFFFFF',
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            ':first-of-type': {
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
            },
            ':last-of-type': {
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px',
            },
            boxShadow: 'none',
            '&.Mui-expanded': {
              ':before': {
                opacity: 1,
              },
              margin: 0,
              borderBottom: '1px solid rgb(148 163 184 / 25%)',
            },
          },
        },
      },
    },
  });

export const getAppTheme = () =>
  responsiveFontSizes(baseTheme(), { factor: 3 / 2 });
