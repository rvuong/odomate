import React, {useMemo, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {getTheme} from './theme';

const Root = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App toggleMode={() => setMode(mode === 'dark' ? 'light' : 'dark')} mode={mode}/>
        </ThemeProvider>
    );
};

ReactDOM.createRoot(
    document.getElementById('root')!
).render(
    <React.StrictMode>
        <Root/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
