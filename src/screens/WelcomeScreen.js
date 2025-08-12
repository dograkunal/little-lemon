import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ImageBackground,
} from "react-native";
import authService from "../services/authService";

export default function WelcomeScreen({ navigation }) {
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await authService.logout();
            navigation.replace("Login");
          } catch (error) {
            console.error("Logout error:", error);
            navigation.replace("Login");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView indicatorStyle="white" style={styles.scrollContainer}>
        <Text style={styles.title}>Welcome to Little Lemon</Text>
        <ImageBackground
          source={require("../img/LittleLemonLogo.png")}
          style={styles.backgroundImage}
          resizeMode="contain"
          blurRadius={3}
        >
          <View>
            <Text style={styles.description}>
              Little Lemon is a charming neighborhood bistro that serves simple
              food and classic cocktails in a lively but casual environment. We
              would love to hear more about your experience with us!
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("Menu")}
        >
          <Text style={styles.nextButtonText}>Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  backgroundImage: {
    marginTop: 100,
    width: "100%",
    resizeMode: "contain",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    padding: 40,
    fontSize: 30,
    color: "#EDEFEE",
    textAlign: "center",
  },
  description: {
    fontSize: 24,
    padding: 10,
    color: "#EDEFEE",
    textAlign: "center",
    fontWeight: "600",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    padding: 20,
    gap: 15,
  },
  nextButton: {
    backgroundColor: "#F4CE14",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#495E57",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#EDEFEE",
    fontSize: 16,
    fontWeight: "bold",
  },
});
