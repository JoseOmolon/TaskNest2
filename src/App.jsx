import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideNav from './assets/components/Sidenav';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Set up a theme for dark mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3b5998', // Facebook blue
      },
    },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    },
    background: {
      default: '#f4f6f8',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <SideNav darkMode={darkMode} setDarkMode={setDarkMode} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
