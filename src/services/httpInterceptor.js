import { API_CONFIG, HTTP_STATUS } from '../config/api';
import authService from './authService';

class HttpInterceptor {
  constructor() {
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  // Add request to failed queue
  addToQueue(resolve, reject) {
    this.failedQueue.push({ resolve, reject });
  }

  // Create request with timeout
  createRequestWithTimeout(url, options, timeout) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Request timeout'));
      }, timeout);

      fetch(url, options)
        .then(response => {
          clearTimeout(timeoutId);
          resolve(response);
        })
        .catch(error => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }

  // Retry request with exponential backoff
  async retryRequest(url, options, retryCount = 0) {
    try {
      return await this.createRequestWithTimeout(
        url, 
        options, 
        API_CONFIG.TIMEOUT
      );
    } catch (error) {
      if (retryCount < API_CONFIG.RETRY_ATTEMPTS) {
        const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryRequest(url, options, retryCount + 1);
      }
      throw error;
    }
  }

  // Handle token refresh
  async handleTokenRefresh() {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.addToQueue(resolve, reject);
      });
    }

    this.isRefreshing = true;

    try {
      const refreshToken = await authService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REFRESH_TOKEN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        await authService.setToken(data.accessToken);
        await authService.setRefreshToken(data.refreshToken);
        
        this.processQueue(null, data.accessToken);
        return data.accessToken;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      this.processQueue(error, null);
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  async request(url, options = {}) {
    const fullUrl = url.startsWith('http') ? url : `${API_CONFIG.BASE_URL}${url}`;
    
    const token = await authService.getToken();
    
    const headers = {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const requestOptions = {
      ...options,
      headers,
    };

    try {
      let response = await this.retryRequest(fullUrl, requestOptions);

      if (response.status === HTTP_STATUS.UNAUTHORIZED && token) {
        try {
          // Try to refresh token
          const newToken = await this.handleTokenRefresh();
          
          // Retry original request with new token
          headers.Authorization = `Bearer ${newToken}`;
          response = await this.retryRequest(fullUrl, { ...requestOptions, headers });
        } catch (refreshError) {
          // Token refresh failed, logout user
          await authService.logout();
          throw new Error('Session expired. Please login again.');
        }
      }

      // Handle other error statuses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection.');
      }
      
      throw error;
    }
  }

  // Convenience methods for different HTTP verbs
  async get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }

  async patch(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

export default new HttpInterceptor();
