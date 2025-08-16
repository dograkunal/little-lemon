import * as React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
} from "react-native";
import Button from "../components/Button";
import { validateEmail } from "../utils/validation";
import { useTheme } from "../context/ThemeContext";

const SubscribeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [email, setEmail] = React.useState("");

  const isEmailValid = validateEmail(email);

  const handleSubscribe = () => {
    Alert.alert("Success!", "Thanks for subscribing, stay tuned!", [
      { text: "OK", onPress: () => setEmail("") },
    ]);
    navigation.navigate("Menu");
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Image
          style={styles.logo}
          source={require("../img/LittleLemonLogo.png")}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Subscribe to our newsletter for our latest delicious recipes!
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
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="Type your email"
          placeholderTextColor={theme.colors.placeholder}
        />
        <Button
          onPress={handleSubscribe}
          disabled={!isEmailValid}
          size="medium"
          style={styles.subscribeButton}
        >
          Subscribe
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {

    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 24,
    paddingHorizontal: 20,
    lineHeight: 28,
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: "contain",
    marginBottom: 32,
  },
  input: {
    height: 50,
    marginVertical: 24,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
  subscribeButton: {
    width: "100%",
    marginTop: 16,
  },
});

export default SubscribeScreen;
