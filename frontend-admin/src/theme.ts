import {createTheme, PaletteMode} from '@mui/material';

export const getTheme = (mode: PaletteMode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: '#90caf9',
            },
            secondary: {
                main: '#f48fb1',
            },
            background: {
                default: mode === 'dark' ? '#121212' : '#f9f9f9',
                paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", sans-serif',
            h1: {
                fontSize: '2.2rem',
                fontWeight: 500,
            },
            h2: {
                fontSize: '1.8rem',
                fontWeight: 500,
            },
            h3: {
                fontSize: '1.6rem',
                fontWeight: 500,
            },
            body1: {
                fontSize: '1rem',
            },
        }
    });
