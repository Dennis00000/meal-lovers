import axios from 'axios';
import { API_URL } from '../config';
import { TEST_CREDENTIALS } from '../config/testCredentials';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Add request interceptor to include token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Register user
export const register = async (userData) => {
  try {
    console.log('Register request:', { ...userData, password: '[REDACTED]' });
    const response = await api.post('/api/auth/register', userData);
    console.log('Register response:', response.data);
    
    if (response.data.success) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);
    throw error;
  }
};

// Login user
export const login = async (email, password) => {
  try {
    console.log('Login request:', { email, password: '[REDACTED]' });
    
    // Check for test credentials in offline mode
    if (navigator.onLine === false || API_URL === 'offline') {
      if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
        console.log('Using test credentials in offline mode');
        
        localStorage.setItem('authToken', 'test-token-for-offline-mode');
        localStorage.setItem('userData', JSON.stringify(TEST_CREDENTIALS.userData));
        
        return {
          success: true,
          token: 'test-token-for-offline-mode',
          user: TEST_CREDENTIALS.userData
        };
      } else {
        return {
          success: false,
          message: 'Invalid credentials (offline mode)'
        };
      }
    }
    
    const response = await api.post('/api/auth/login', { email, password });
    console.log('Login response:', response.data);
    
    if (response.data.success) {
      // Store token in localStorage with proper key name
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      
      console.log('Token stored in localStorage:', response.data.token.substring(0, 10) + '...');
      
      return {
        success: true,
        token: response.data.token,
        user: response.data.user
      };
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error.message || error);
    
    // If we're offline or can't connect, try test credentials
    if (error.message === 'Network Error' && email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
      console.log('Network error, using test credentials');
      
      localStorage.setItem('authToken', 'test-token-for-offline-mode');
      localStorage.setItem('userData', JSON.stringify(TEST_CREDENTIALS.userData));
      
      return {
        success: true,
        token: 'test-token-for-offline-mode',
        user: TEST_CREDENTIALS.userData
      };
    }
    
    throw error;
  }
};

// Logout user
export const logout = async () => {
  try {
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Optional: Call backend to invalidate token
    await api.post('/api/auth/logout');
    
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    
    // Still clear local storage even if API call fails
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    return { success: true };
  }
};

// Get current user
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('userData');
    if (!userData) return null;
    
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  console.log('Checking authentication, token exists:', !!token);
  
  if (!token) {
    return false;
  }
  
  // Check if token is expired (if you have JWT with expiry)
  try {
    // For JWT tokens, you could add expiry validation here
    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/api/users/profile', userData);
    
    if (response.data.success) {
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error.response?.data || error.message);
    throw error;
  }
};

// Add this function to check API connectivity
export const checkApiConnection = async () => {
  try {
    console.log('Checking API connection to:', API_URL);
    const response = await axios.get(`${API_URL}/api/health-check`);
    console.log('API connection response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API connection error:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message 
    };
  }
}; 