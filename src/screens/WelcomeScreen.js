import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import ThemeSelector from "../components/ThemeSelector";

export default function WelcomeScreen({ navigation }) {
  const { theme } = useTheme();
  const [themeSelectorVisible, setThemeSelectorVisible] = useState(false);


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        indicatorStyle={theme.isDarkMode ? "white" : "black"} 
        style={styles.scrollContainer}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to Little Lemon</Text>
        <View>

        <Image
          source={require("../img/LittleLemonLogo.png")}
          style={styles.backgroundImage}
          resizeMode={"contain"}
          blurRadius={3}
          />

            <Text style={[styles.description, { color: theme.colors.text }]}>
              Little Lemon is a charming neighborhood bistro that serves simple
              food and classic cocktails in a lively but casual environment. We
              would love to hear more about your experience with us!
            </Text>
          </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={[styles.nextButtonText, { color: theme.colors.card }]}>Get Started</Text>
        </TouchableOpacity>

      </View>

      <ThemeSelector
        visible={themeSelectorVisible}
        onClose={() => setThemeSelectorVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    marginTop: 20,
    width: 390,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    padding: 40,
    fontSize: 30,
    textAlign: "center",
  },
  description: {
    fontSize: 24,
    padding: 10,
    textAlign: "center",
    fontWeight: "600",
    textShadowRadius: 3,
  },
  buttonContainer: {
    padding: 20,
    gap: 15,
  },
  nextButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  themeButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
