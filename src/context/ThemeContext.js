import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, getTheme } from '../constants/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(deviceColorScheme === 'dark');
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (isSystemTheme && deviceColorScheme) {
      setIsDarkMode(deviceColorScheme === 'dark');
    }
  }, [deviceColorScheme, isSystemTheme]);

  const loadThemePreference = async () => {
    try {
      const savedThemeMode = await AsyncStorage.getItem('themeMode');
      const savedSystemTheme = await AsyncStorage.getItem('isSystemTheme');
      
      if (savedThemeMode !== null) {
        setIsDarkMode(savedThemeMode === 'dark');
      }
      
      if (savedSystemTheme !== null) {
        setIsSystemTheme(JSON.parse(savedSystemTheme));
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newThemeMode = !isDarkMode;
    setIsDarkMode(newThemeMode);
    setIsSystemTheme(false);
    
    try {
      await AsyncStorage.setItem('themeMode', newThemeMode ? 'dark' : 'light');
      await AsyncStorage.setItem('isSystemTheme', 'false');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const setSystemTheme = async () => {
    setIsSystemTheme(true);
    setIsDarkMode(deviceColorScheme === 'dark');
    
    try {
      await AsyncStorage.setItem('isSystemTheme', 'true');
      await AsyncStorage.removeItem('themeMode');
    } catch (error) {
      console.error('Error saving system theme preference:', error);
    }
  };

  const setLightTheme = async () => {
    setIsDarkMode(false);
    setIsSystemTheme(false);
    
    try {
      await AsyncStorage.setItem('themeMode', 'light');
      await AsyncStorage.setItem('isSystemTheme', 'false');
    } catch (error) {
      console.error('Error saving light theme preference:', error);
    }
  };

  const setDarkTheme = async () => {
    setIsDarkMode(true);
    setIsSystemTheme(false);
    
    try {
      await AsyncStorage.setItem('themeMode', 'dark');
      await AsyncStorage.setItem('isSystemTheme', 'false');
    } catch (error) {
      console.error('Error saving dark theme preference:', error);
    }
  };

  const theme = getTheme(isDarkMode);

  const value = {
    theme,
    isDarkMode,
    isSystemTheme,
    toggleTheme,
    setSystemTheme,
    setLightTheme,
    setDarkTheme,
    deviceColorScheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
