import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, View } from "react-native";
import authService from "../services/authService";
import apiService from "../services/apiService";

const FeedbackForm = ({ navigation }) => {
  // declare the variables
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
        console.error('Failed to submit feedback:', error);
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
          console.error('Failed to load user:', error);
        }
      };

      loadUser();
    }, []);

    return (
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>
          Hi {user?.name || 'Guest'}! 🍋
        </Text>
        <Text style={styles.userInfoSubtext}>
          We'd love to hear about your experience
        </Text>
      </View>
    );
  };

  return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardContainer}>
    <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} keyboardDismissMode="on-drag">
          <UserInfoHeader />
          
          <Text style={styles.headingSection}>
            How was your visit to Little Lemon? 
          </Text>
          
          <Text style={styles.infoSection}>
            Little Lemon is a charming neighborhood bistro that serves
            simple food and classic cocktails in a lively but casual
            environment. We would love to hear your experience with us! 
          </Text>
          
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={onChangeFirstName}
            placeholder="First Name"
          />
          
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={onChangeLastName}
            placeholder="Last Name"
          />

          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={onChangePhoneNumber}
            placeholder="Phone Number"
            keyboardType="numeric"
            maxLength={10}
          />
          
          <TextInput
            style={styles.messageInput}
            value={message}
            onChangeText={onChangeMessage}
            placeholder="Message"
            multiline={true}
            numberOfLines={4}
            maxLength={250}
          />
        </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
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
    backgroundColor: '#495E57',
    padding: 20,
    alignItems: 'center',
  },
  userInfoText: {
    color: '#F4CE14',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInfoSubtext: {
    color: '#EDEFEE',
    fontSize: 14,
    opacity: 0.8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
    backgroundColor: "#F4CE14",
  },
  messageInput: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#F4CE14",
  },
  infoSection: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
    backgroundColor: "#495E57",
  },
  headingSection: {
    fontSize: 28,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
    backgroundColor: "#495E57",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 10,
  },
  backButton: {
    backgroundColor: '#495E57',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#EDEFEE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#F4CE14',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackForm;
