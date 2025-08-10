import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import FeedbackForm from './src/screens/FeedBackFrom';
import authService from './src/services/authService';

const Stack = createStackNavigator();

// Loading screen component
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#F4CE14" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Initialize auth service and check for existing tokens
      await authService.initialize();
      const hasAuth = await authService.isAuthenticated();
      setIsAuthenticated(hasAuth);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={isAuthenticated ? "Welcome" : "Login"}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#495E57',
          },
          headerTintColor: '#F4CE14',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ 
            title: 'Sign In',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ 
            title: 'Little Lemon',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{ 
            title: 'Our Menu',
            headerLeft: null,
          }} 
        />
        <Stack.Screen 
          name="Feedback" 
          component={FeedbackForm} 
          options={{ 
            title: 'Share Your Experience',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  loadingText: {
    color: '#F4CE14',
    fontSize: 18,
    marginTop: 20,
  },
});