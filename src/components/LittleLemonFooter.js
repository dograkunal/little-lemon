import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function LittleLemonFooter() {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text style={[styles.footerText, { color: theme.colors.card }]}>
        All rights reserved by Little Lemon, 2025
      </Text>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  footerText: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});