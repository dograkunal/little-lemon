import { Alert } from 'react-native';
import { HTTP_STATUS } from '../config/api';

// Common API error handler
export const handleApiError = (error, customMessage = null) => {
  console.error('API Error:', error);
  
  let message = customMessage;
  
  if (!message) {
    if (error.message) {
      message = error.message;
    } else if (error.status) {
      switch (error.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          message = 'Session expired. Please login again.';
          break;
        case HTTP_STATUS.FORBIDDEN:
          message = 'You do not have permission to perform this action.';
          break;
        case HTTP_STATUS.NOT_FOUND:
          message = 'The requested resource was not found.';
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          message = 'Server error. Please try again later.';
          break;
        case HTTP_STATUS.SERVICE_UNAVAILABLE:
          message = 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          message = 'An unexpected error occurred. Please try again.';
      }
    } else {
      message = 'Network error. Please check your connection.';
    }
  }
  
  return message;
};

// Show error alert
export const showErrorAlert = (error, customMessage = null) => {
  const message = handleApiError(error, customMessage);
  Alert.alert('Error', message);
};

// Show success alert
export const showSuccessAlert = (title, message, onPress = null) => {
  Alert.alert(
    title,
    message,
    onPress ? [{ text: 'OK', onPress }] : [{ text: 'OK' }]
  );
};

// Show confirmation alert
export const showConfirmationAlert = (title, message, onConfirm, onCancel = null) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: onConfirm,
      },
    ]
  );
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    errors: {
      length: password.length < minLength ? `Password must be at least ${minLength} characters` : null,
      upperCase: !hasUpperCase ? 'Password must contain at least one uppercase letter' : null,
      lowerCase: !hasLowerCase ? 'Password must contain at least one lowercase letter' : null,
      numbers: !hasNumbers ? 'Password must contain at least one number' : null,
    }
  };
};

// Format phone number
export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
