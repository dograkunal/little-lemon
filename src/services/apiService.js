import httpInterceptor from './httpInterceptor';
import { API_CONFIG } from '../config/api';
import { showErrorAlert, showSuccessAlert } from '../utils/apiUtils';

class ApiService {
  /**
   * Submit user feedback
   * @param {Object} feedbackData - The feedback data to submit
   * @returns {Promise<Object>} - Response from the API
   */
  async submitFeedback(feedbackData) {
    try {
      const response = await httpInterceptor.post(
        API_CONFIG.ENDPOINTS.FEEDBACK,
        feedbackData
      );
      
      const result = await response.json();
      showSuccessAlert('Success', 'Thank you for your feedback!');
      return result;
    } catch (error) {
      showErrorAlert(error, 'Failed to submit feedback');
      throw error;
    }
  }

  /**
   * Update user profile
   * @param {Object} profileData - The profile data to update
   * @returns {Promise<Object>} - Response from the API
   */
  async updateProfile(profileData) {
    try {
      const response = await httpInterceptor.put(
        API_CONFIG.ENDPOINTS.USER_PROFILE,
        profileData
      );
      
      const result = await response.json();
      showSuccessAlert('Success', 'Profile updated successfully!');
      return result;
    } catch (error) {
      showErrorAlert(error, 'Failed to update profile');
      throw error;
    }
  }

  /**
   * Get user profile
   * @returns {Promise<Object>} - User profile data
   */
  async getUserProfile() {
    try {
      const response = await httpInterceptor.get(
        API_CONFIG.ENDPOINTS.USER_PROFILE
      );
      
      return await response.json();
    } catch (error) {
      showErrorAlert(error, 'Failed to fetch profile');
      throw error;
    }
  }

  /**
   * Get menu items
   * @returns {Promise<Array>} - Array of menu items
   */
  async getMenuItems() {
    try {
      const response = await httpInterceptor.get('/menu/items');
      return await response.json();
    } catch (error) {
      showErrorAlert(error, 'Failed to fetch menu items');
      throw error;
    }
  }

  /**
   * Get restaurant information
   * @returns {Promise<Object>} - Restaurant information
   */
  async getRestaurantInfo() {
    try {
      const response = await httpInterceptor.get('/restaurant/info');
      return await response.json();
    } catch (error) {
      showErrorAlert(error, 'Failed to fetch restaurant information');
      throw error;
    }
  }
}

export default new ApiService();
