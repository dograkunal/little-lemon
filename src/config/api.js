// API Configuration for different environments
export const API_CONFIG = {
  // Base URLs for different environments
  BASE_URL: __DEV__ 
    ? 'http://localhost:3000/api'  // Development
    : 'https://your-production-api.com/api', // Production
  
  // API endpoints
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    USER_PROFILE: '/user/profile',
    FEEDBACK: '/feedback/submit',
  },
  
  // Request configuration
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
