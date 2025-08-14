import { useTheme } from '../context/ThemeContext';

export const useThemeColors = () => {
  const { theme, isDarkMode, isSystemTheme, toggleTheme, setSystemTheme, setLightTheme, setDarkTheme } = useTheme();

  return {
    // Colors
    colors: theme.colors,
    // Theme state
    isDarkMode,
    isSystemTheme,
    // Theme actions
    toggleTheme,
    setSystemTheme,
    setLightTheme,
    setDarkTheme,
    // Common color combinations
    text: theme.colors.text,
    background: theme.colors.background,
    surface: theme.colors.surface,
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    border: theme.colors.border,
    placeholder: theme.colors.placeholder,
    // Utility functions
    getContrastText: (backgroundColor) => {
      // Simple contrast calculation
      const isLight = backgroundColor === theme.colors.primary || 
                     backgroundColor === theme.colors.surface ||
                     backgroundColor === theme.colors.background;
      return isLight ? theme.colors.card : theme.colors.text;
    },
    // Common style combinations
    cardStyle: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    inputStyle: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      color: theme.colors.text,
    },
    buttonStyle: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
    },
    buttonTextStyle: {
      color: theme.colors.card,
      fontSize: theme.typography.button.fontSize,
      fontWeight: theme.typography.button.fontWeight,
    },
  };
};

