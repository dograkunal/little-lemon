import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import authService from '../services/authService';

export default function WelcomeScreen({ navigation }) {
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await authService.logout();
              navigation.replace('Login');
            } catch (error) {
              console.error('Logout error:', error);
              // Force navigation even if logout fails
              navigation.replace('Login');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView indicatorStyle="white" style={styles.scrollContainer}>
        <Text style={styles.title}>Welcome to Little Lemon</Text>
        <Text style={styles.description}>
          Little Lemon is a charming neighborhood bistro that serves simple food
          and classic cocktails in a lively but casual environment. We would love
          to hear more about your experience with us!
        </Text>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.nextButtonText}>View Our Menu</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    padding: 40,
    fontSize: 30,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  description: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
    gap: 15,
  },
  nextButton: {
    backgroundColor: '#F4CE14',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#495E57',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#EDEFEE',
    fontSize: 16,
    fontWeight: 'bold',
  },
});