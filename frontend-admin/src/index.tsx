import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CssBaseline, ThemeProvider, createTheme} from '@mui/material';
import { getTheme } from './theme';


// const theme = createTheme();
//
// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
// root.render(
//     <React.StrictMode>
//         <ThemeProvider theme={theme}>
//             <App/>
//         </ThemeProvider>
//     </React.StrictMode>
// );

const Root = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App toggleMode={() => setMode(mode === 'dark' ? 'light' : 'dark')} mode={mode} />
        </ThemeProvider>
    );
};

ReactDOM.createRoot(
    document.getElementById('root')!
).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
