import { createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';

// Tema personalizzato per oneshotDash
const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: amber[500],
    },
    secondary: {
      main: deepOrange[500],
    },
    background: {
      default: '#18181b', // zinc-950
      paper: '#27272a',   // zinc-900
    },
    text: {
      primary: '#f4f4f5',
      secondary: '#a1a1aa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
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
  },
});

export default muiTheme;