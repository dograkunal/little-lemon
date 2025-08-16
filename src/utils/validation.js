// Email validation utility
export const validateEmail = (email) => {
  if (!email) return false;
  
  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation utility
export const validatePhone = (phone) => {
  if (!phone) return false;
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid length (7-15 digits)
  return cleanPhone.length >= 7 && cleanPhone.length <= 15;
};

// Name validation utility
export const validateName = (name) => {
  if (!name) return false;
  
  // Check if name has at least 2 characters and only letters, spaces, and hyphens
  const nameRegex = /^[a-zA-Z\s\-']{2,}$/;
  return nameRegex.test(name.trim());
};
