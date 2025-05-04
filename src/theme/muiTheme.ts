import { createTheme } from '@mui/material/styles';

// Tema personalizzato per l'applicazione
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f59e0b', // amber-500 (colore principale usato nei componenti personaggi)
      light: '#fcd34d', // amber-300
      dark: '#b45309', // amber-700
      contrastText: '#000000',
    },
    secondary: {
      main: '#7c3aed', // purple-600 (usato per i pulsanti secondari)
      light: '#a78bfa', // purple-400
      dark: '#5b21b6', // purple-800
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444', // red-500
      light: '#fca5a5', // red-300
      dark: '#b91c1c', // red-800
    },
    warning: {
      main: '#f59e0b', // amber-500
      light: '#fcd34d', // amber-300
      dark: '#b45309', // amber-700
    },
    info: {
      main: '#3b82f6', // blue-500
      light: '#93c5fd', // blue-300
      dark: '#1d4ed8', // blue-700
    },
    success: {
      main: '#10b981', // green-500
      light: '#6ee7b7', // green-300
      dark: '#047857', // green-800
    },
    background: {
      default: '#18181b', // zinc-900
      paper: '#27272a', // zinc-800
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa', // zinc-400
      disabled: '#71717a', // zinc-500
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#f59e0b', // amber-500
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#f59e0b', // amber-500
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#f59e0b', // amber-500
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#f59e0b', // amber-500
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 500,
      color: '#f59e0b', // amber-500
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#f59e0b', // amber-500
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: '#f59e0b',
          '&:hover': {
            backgroundColor: '#d97706',
          },
        },
        containedSecondary: {
          backgroundColor: '#7c3aed',
          '&:hover': {
            backgroundColor: '#6d28d9',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#27272a', // zinc-800
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#52525b', // zinc-600
            },
            '&:hover fieldset': {
              borderColor: '#f59e0b', // amber-500
            },
            '&.Mui-focused fieldset': {
              borderColor: '#f59e0b', // amber-500
            },
            backgroundColor: '#3f3f46', // zinc-700
            borderRadius: '0.375rem',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#27272a', // zinc-800
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#27272a', // zinc-800
          borderRadius: '0.5rem',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#52525b', // zinc-600
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#a1a1aa', // zinc-400
          '&.Mui-checked': {
            color: '#f59e0b', // amber-500
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#f59e0b', // amber-500
            '& + .MuiSwitch-track': {
              backgroundColor: '#92400e', // amber-800
            },
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#f59e0b', // amber-500
        },
        thumb: {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: '0 0 0 8px rgba(245, 158, 11, 0.16)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#18181b', // zinc-900
          border: '1px solid #52525b', // zinc-600
          fontSize: '0.75rem',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected': {
            color: '#f59e0b', // amber-500
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#f59e0b', // amber-500
        },
      },
    },
  },
});

// Tema specifico per la sezione personaggi
export const characterTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      main: '#f59e0b', // amber-500 (colore principale per i personaggi)
      light: '#fcd34d',
      dark: '#b45309',
      contrastText: '#000000',
    },
    secondary: {
      main: '#7c3aed', // purple-600 (per le note)
      light: '#a78bfa',
      dark: '#5b21b6',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3b82f6', // blue-500 (per gli incantesimi)
      light: '#93c5fd',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
  },
  components: {
    ...theme.components,
    // Personalizzazioni specifiche per i componenti della scheda personaggio
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(39, 39, 42, 0.5)', // zinc-800 con trasparenza
          borderRadius: '0.5rem',
          padding: '0.75rem',
        },
      },
    },
    // Stile per le statistiche dei personaggi
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(39, 39, 42, 0.5)', // zinc-800 con trasparenza
          borderRadius: '0.5rem',
        },
      },
    },
  },
});

export default theme;