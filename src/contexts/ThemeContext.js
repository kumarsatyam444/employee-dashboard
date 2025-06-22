import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themeColors = {
  purple: '#9c27b0',
  blue: '#1976d2',
  green: '#2e7d32',
  orange: '#ed6c02',
  red: '#d32f2f',
};

export const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('purple');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedColor = localStorage.getItem('primaryColor');
    if (savedTheme) setDarkMode(savedTheme === 'dark');
    if (savedColor) setPrimaryColor(savedColor);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('primaryColor', primaryColor);
  }, [darkMode, primaryColor]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: themeColors[primaryColor],
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
      },
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const value = {
    darkMode,
    primaryColor,
    toggleDarkMode,
    setPrimaryColor,
    themeColors,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
