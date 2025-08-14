import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function LittleLemonHeader() {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text style={[styles.headerText, { color: theme.colors.card }]}>Little Lemon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    textAlign: 'center',
  },
});