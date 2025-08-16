import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import authService from "../services/authService";

function LogoutButton({ navigation }) {
  const { theme } = useTheme();

  const handlePress = () => {
    authService.logout();
    Alert.alert("Logged out successfully");
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.colors.error }]}
      onPress={handlePress}
    >
      <Ionicons name="log-out-outline" size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );
}

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
