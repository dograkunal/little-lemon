import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector = ({ visible, onClose }) => {
  const {
    theme,
    isDarkMode,
    isSystemTheme,
    toggleTheme,
    setSystemTheme,
    setLightTheme,
    setDarkTheme,
    deviceColorScheme,
  } = useTheme();

  const handleThemeChange = (themeType) => {
    switch (themeType) {
      case 'system':
        setSystemTheme();
        break;
      case 'light':
        setLightTheme();
        break;
      case 'dark':
        setDarkTheme();
        break;
      default:
        break;
    }
    onClose();
  };

  const getCurrentThemeText = () => {
    if (isSystemTheme) {
      return `System (${deviceColorScheme === 'dark' ? 'Dark' : 'Light'})`;
    }
    return isDarkMode ? 'Dark' : 'Light';
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <View style={[styles.modal, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Choose Theme
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Current: {getCurrentThemeText()}
          </Text>

          <View style={styles.options}>
            <TouchableOpacity
              style={[
                styles.option,
                { backgroundColor: theme.colors.card },
                isSystemTheme && { borderColor: theme.colors.primary, borderWidth: 2 }
              ]}
              onPress={() => handleThemeChange('system')}
            >
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                System
              </Text>
              <Text style={[styles.optionSubtext, { color: theme.colors.textSecondary }]}>
                Follow device setting
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                { backgroundColor: theme.colors.card },
                !isSystemTheme && !isDarkMode && { borderColor: theme.colors.primary, borderWidth: 2 }
              ]}
              onPress={() => handleThemeChange('light')}
            >
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                Light
              </Text>
              <Text style={[styles.optionSubtext, { color: theme.colors.textSecondary }]}>
                Clean and bright
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                { backgroundColor: theme.colors.card },
                !isSystemTheme && isDarkMode && { borderColor: theme.colors.primary, borderWidth: 2 }
              ]}
              onPress={() => handleThemeChange('dark')}
            >
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                Dark
              </Text>
              <Text style={[styles.optionSubtext, { color: theme.colors.textSecondary }]}>
                Easy on the eyes
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: theme.colors.primary }]}
            onPress={onClose}
          >
            <Text style={[styles.closeButtonText, { color: theme.colors.card }]}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  options: {
    gap: 16,
    marginBottom: 24,
  },
  option: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionSubtext: {
    fontSize: 14,
  },
  closeButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ThemeSelector;

