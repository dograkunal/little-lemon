import * as SecureStore from 'expo-secure-store';
import { API_CONFIG } from '../config/api';

class AuthService {
  constructor() {
    this.token = null;
    this.refreshToken = null;
    this.user = null;
    this.isInitialized = false;
  }

  // Initialize auth service and check for existing tokens
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Check for existing tokens
      const [token, refreshToken, userData] = await Promise.all([
        SecureStore.getItemAsync('auth_token'),
        SecureStore.getItemAsync('refresh_token'),
        SecureStore.getItemAsync('user_data'),
      ]);

      if (token && refreshToken && userData) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.user = JSON.parse(userData);
        
        // Validate token
        if (await this.validateToken(token)) {
          console.log('User session restored');
        } else {
          // Token expired, try to refresh
          await this.refreshAccessToken();
        }
      }
    } catch (error) {
      console.error('Failed to initialize auth service:', error);
      await this.clearAllData();
    } finally {
      this.isInitialized = true;
    }
  }

  // Simulate API call to authenticate user
  async login(email, password) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock API validation
      if (email === 'demo@example.com' && password === 'demo123') {
        const response = {
          success: true,
          accessToken: this.generateDummyToken(email, 'access'),
          refreshToken: this.generateDummyToken(email, 'refresh'),
          user: {
            id: 1,
            email: email,
            name: 'Little Lemon User',
            role: 'customer',
            avatar: null,
          }
        };

        // Store authentication data
        await this.setToken(response.accessToken);
        await this.setRefreshToken(response.refreshToken);
        await this.setUser(response.user);

        return response;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  }

  // Real API login method 
  /*
  async login(email, password) {
    try {
      const response = await httpInterceptor.post(API_CONFIG.ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const data = await response.json();
      
      if (response.ok) {
        await this.setToken(data.accessToken);
        await this.setRefreshToken(data.refreshToken);
        await this.setUser(data.user);
        return data;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  }
  */

  // Generate dummy tokens for development
  generateDummyToken(email, type = 'access') {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: 1,
      email: email,
      type: type,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (type === 'access' ? 3600 : 604800), // 1 hour or 7 days
      role: 'customer'
    }));
    const signature = `dummy_signature_${type}_for_${email}`;
    
    return `${header}.${payload}.${signature}`;
  }

  // Set authentication token
  async setToken(token) {
    this.token = token;
    try {
      await SecureStore.setItemAsync('auth_token', token);
    } catch (error) {
      console.error('Failed to store token:', error);
      throw error;
    }
  }

  // Get current token
  async getToken() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.token;
  }

  // Set refresh token
  async setRefreshToken(refreshToken) {
    this.refreshToken = refreshToken;
    try {
      await SecureStore.setItemAsync('refresh_token', refreshToken);
    } catch (error) {
      console.error('Failed to store refresh token:', error);
      throw error;
    }
  }

  // Get refresh token
  async getRefreshToken() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.refreshToken;
  }

  // Set user data
  async setUser(user) {
    this.user = user;
    try {
      await SecureStore.setItemAsync('user_data', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user data:', error);
      throw error;
    }
  }

  // Get current user
  async getUser() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.user;
  }

  // Check if user is authenticated
  async isAuthenticated() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.token !== null && await this.validateToken(this.token);
  }

  async validateToken(token) {
    if (!token) return false;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  async refreshAccessToken() {
    try {
      if (!this.refreshToken) {
        throw new Error('No refresh token available');
      }


      const newToken = this.generateDummyToken(this.user?.email || 'demo@example.com', 'access');
      await this.setToken(newToken);
      
      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      await this.logout();
      throw error;
    }
  }

  async logout() {
    try {

      await this.clearAllData();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      await this.clearAllData();
    }
  }

  // Clear all stored data
  async clearAllData() {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync('auth_token'),
        SecureStore.deleteItemAsync('refresh_token'),
        SecureStore.deleteItemAsync('user_data'),
      ]);
      
      this.token = null;
      this.refreshToken = null;
      this.user = null;
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  }

  
}

export default new AuthService();
