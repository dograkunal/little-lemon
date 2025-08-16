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
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import authService from "../services/authService";
import { useTheme } from "../context/ThemeContext";

const SettingsScreen = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await authService.getUser();
      if (userData) {
        setUser(userData);
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setEmail(userData.email || "");
        setGender(userData.gender || "");
        setProfilePicture(userData.profilePicture || null);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  const handleSaveProfile = async () => {
    if (!firstName || !lastName || !email) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    try {
      const updatedUserData = {
        ...user,
        firstName,
        lastName,
        email,
        gender,
        profilePicture,
        updatedAt: new Date().toISOString(),
      };

      await authService.updateUser(updatedUserData);
      setUser(updatedUserData);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const handleSelectPicture = () => {
    Alert.alert(
      "Profile Picture",
      "Profile picture selection would be implemented here with expo-image-picker"
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
          <View
            style={[
              styles.headerSection,
              { backgroundColor: theme.colors.secondary },
            ]}
          >
            <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
              Profile Settings
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.text }]}>
              Manage your personal information
            </Text>
          </View>

          <View style={styles.profilePictureSection}>
            <TouchableOpacity
              style={[
                styles.profilePictureContainer,
                { borderColor: theme.colors.border },
              ]}
              onPress={handleSelectPicture}
            >
              {profilePicture ? (
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.profilePicture}
                />
              ) : (
                <View
                  style={[
                    styles.profilePicturePlaceholder,
                    { backgroundColor: theme.colors.surface },
                  ]}
                >
                  <Ionicons
                    name="camera"
                    size={40}
                    color={theme.colors.placeholder}
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.changePictureButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={handleSelectPicture}
            >
              <Ionicons
                name="camera-outline"
                size={16}
                color={theme.colors.card}
                style={{ marginRight: 8 }}
              />
              <Text
                style={[
                  styles.changePictureButtonText,
                  { color: theme.colors.card },
                ]}
              >
                Change Picture
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Personal Information
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
              onChangeText={setFirstName}
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
              onChangeText={setLastName}
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
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={theme.colors.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
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
              value={gender}
              onChangeText={setGender}
              placeholder="Gender (Optional)"
              placeholderTextColor={theme.colors.placeholder}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleSaveProfile}
          >
            <Text style={[styles.saveButtonText, { color: theme.colors.card }]}>
              Save Changes
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
  headerSection: {
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  profilePictureSection: {
    alignItems: "center",
    padding: 20,
  },
  profilePictureContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  profilePicturePlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  changePictureButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  changePictureButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  formSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    ...Platform.select({
      android: {
        elevation: 1,
        backgroundColor: "transparent",
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
    }),
  },
  buttonContainer: {
    padding: 20,
  },
  saveButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
