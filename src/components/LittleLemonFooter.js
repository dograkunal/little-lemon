import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LittleLemonFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.footerText}>
        All rights reserved by Little Lemon, 2025
      </Text>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4CE14',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});