import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeStatusIndicator = ({ style }) => {
  const { theme, isDarkMode, isSystemTheme, deviceColorScheme } = useTheme();

  const getStatusText = () => {
    if (isSystemTheme) {
      return `System (${deviceColorScheme === 'dark' ? 'Dark' : 'Light'})`;
    }
    return isDarkMode ? 'Dark' : 'Light';
  };

  const getStatusIcon = () => {
    if (isSystemTheme) {
      return '🔄';
    }
    return isDarkMode ? '🌙' : '☀️';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }, style]}>
      <Text style={styles.icon}>{getStatusIcon()}</Text>
      <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
        {getStatusText()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  icon: {
    fontSize: 16,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ThemeStatusIndicator;

