import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

import MenuScreen from '../screens/MenuScreen';
import FeedbackForm from '../screens/FeedBackFrom';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ name, focused, color }) => {
  const { theme } = useTheme();
  
  const getIcon = () => {
    switch (name) {
      case 'Menu':
        return focused ? 'restaurant' : 'restaurant-outline';
      case 'Feedback':
        return focused ? 'chatbubble' : 'chatbubble-outline';
      case 'Settings':
        return focused ? 'settings' : 'settings-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getIconSize = () => {
    return Platform.OS === 'ios' ? 24 : 26;
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Ionicons 
        name={getIcon()} 
        size={getIconSize()} 
        color={color} 
      />
    </View>
  );
};

const TabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon name={route.name} focused={focused} color={color} />
        ),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.placeholder,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 10 : 8,
          paddingTop: Platform.OS === 'ios' ? 5 : 8,
          height: Platform.OS === 'ios' ? 88 : 75,
          ...Platform.select({
            android: {
              elevation: 8,
              shadowOpacity: 0.1,
            },
            ios: {
              shadowColor: theme.colors.border,
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }
          })
        },
        headerStyle: {
          backgroundColor: theme.colors.secondary,
          elevation: Platform.OS === 'android' ? 4 : 0,
          shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.colors.text,
          fontSize: Platform.OS === 'ios' ? 17 : 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen 
        name="Menu"
        component={MenuScreen} 
        options={{ 
          headerShown: true,
          headerRight: () => <ThemeToggleButton />,
        }} 
      />
      <Tab.Screen 
        name="Feedback"
        component={FeedbackForm} 
        options={{ 
          headerShown: true,
          headerRight: () => <ThemeToggleButton />,
        }} 
      />
      <Tab.Screen 
        name="Settings"
        component={SettingsScreen} 
        options={{ 
          headerShown: true,
          headerRight: () => <ThemeToggleButton />,
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
