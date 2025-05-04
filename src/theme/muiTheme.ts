import { createTheme } from '@mui/material/styles';

// Creazione di un tema personalizzato con colori che si abbinano all'attuale schema
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f59e0b', // amber-500
      dark: '#d97706',
      light: '#fbbf24',
      contrastText: '#18181b', // zinc-950
    },
    secondary: {
      main: '#71717a', // zinc-500
      dark: '#52525b',
      light: '#a1a1aa',
    },
    background: {
      default: '#18181b', // zinc-950
      paper: '#27272a', // zinc-900
    },
    text: {
      primary: '#f4f4f5', // zinc-100
      secondary: '#a1a1aa', // zinc-400
      disabled: '#52525b', // zinc-600
    },
    action: {
      active: '#f59e0b',
      hover: 'rgba(245, 158, 11, 0.1)',
      selected: 'rgba(245, 158, 11, 0.2)',
      disabled: '#52525b',
      disabledBackground: 'rgba(82, 82, 91, 0.3)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 4,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 4,
          '&.Mui-selected': {
            backgroundColor: '#f59e0b',
            color: '#18181b',
            '&:hover': {
              backgroundColor: '#d97706',
            },
          },
        },
      },
    },
  },
});

export default theme;