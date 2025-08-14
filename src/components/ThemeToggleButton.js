import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = ({ onPress, style }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      toggleTheme();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: theme.colors.primary },
        style
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.text, { color: theme.colors.card }]}>
        {isDarkMode ? '☀️' : '🌙'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default ThemeToggleButton;
