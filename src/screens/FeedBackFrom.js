import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import authService from "../services/authService";
import apiService from "../services/apiService";
import { useTheme } from "../context/ThemeContext";

const FeedbackForm = ({ navigation }) => {
  const { theme } = useTheme();
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [message, onChangeMessage] = useState("");
  const [phoneNumber, onChangePhoneNumber] = useState("");

  const handleSubmit = async () => {
    if (firstName && lastName && message) {
      try {
        const feedbackData = {
          firstName,
          lastName,
          phoneNumber,
          message,
          timestamp: new Date().toISOString(),
        };

        // await apiService.submitFeedback(feedbackData);
        alert("Feedback submitted successfully");

        // Reset form
        onChangeFirstName("");
        onChangeLastName("");
        onChangeMessage("");
        onChangePhoneNumber("");
      } catch (error) {
        console.error("Failed to submit feedback:", error);
        Alert.alert("Error", "Failed to submit feedback. Please try again.");
      }
    } else {
      Alert.alert("Missing Information", "Please fill in all required fields.");
    }
  };

  const UserInfoHeader = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const loadUser = async () => {
        try {
          const userData = await authService.getUser();
          setUser(userData);
        } catch (error) {
          console.error("Failed to load user:", error);
        }
      };

      loadUser();
    }, []);

    return (
      <View
        style={[
          styles.userInfoContainer,
          { backgroundColor: theme.colors.secondary },
        ]}
      >
        <Text style={[styles.userInfoText, { color: theme.colors.primary }]}>
          Hi {user?.name || "Guest"}! 🍋
        </Text>
        <Text style={[styles.userInfoSubtext, { color: theme.colors.text }]}>
          We'd love to hear about your experience
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <ScrollView
          style={styles.scrollContainer}
          keyboardDismissMode="on-drag"
        >
          <UserInfoHeader />

          <Text
            style={[
              styles.headingSection,
              {
                color: theme.colors.text,
                backgroundColor: theme.colors.secondary,
              },
            ]}
          >
            How was your visit to Little Lemon?
          </Text>

          <Text
            style={[
              styles.infoSection,
              {
                color: theme.colors.text,
                backgroundColor: theme.colors.secondary,
              },
            ]}
          >
            Little Lemon is a charming neighborhood bistro that serves simple
            food and classic cocktails in a lively but casual environment. We
            would love to hear your experience with us!
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            value={firstName}
            onChangeText={onChangeFirstName}
            placeholder="First Name"
            placeholderTextColor={theme.colors.placeholder}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            value={lastName}
            onChangeText={onChangeLastName}
            placeholder="Last Name"
            placeholderTextColor={theme.colors.placeholder}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            value={phoneNumber}
            onChangeText={onChangePhoneNumber}
            placeholder="Phone Number"
            placeholderTextColor={theme.colors.placeholder}
            keyboardType="numeric"
            maxLength={10}
          />

          <TextInput
            style={[
              styles.messageInput,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            value={message}
            onChangeText={onChangeMessage}
            placeholder="Message"
            placeholderTextColor={theme.colors.placeholder}
            multiline={true}
            numberOfLines={4}
            maxLength={250}
          />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: theme.colors.secondary },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.backButtonText, { color: theme.colors.text }]}>
              Back to Menu
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleSubmit}
          >
            <Text
              style={[styles.submitButtonText, { color: theme.colors.card }]}
            >
              Submit Feedback
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  userInfoContainer: {
    padding: 20,
    alignItems: "center",
  },
  userInfoText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userInfoSubtext: {
    fontSize: 14,
    opacity: 0.8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
  messageInput: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
  infoSection: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    textAlign: "center",
  },
  headingSection: {
    fontSize: 28,
    padding: 20,
    marginVertical: 8,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    gap: 10,
  },
  backButton: {
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FeedbackForm;
