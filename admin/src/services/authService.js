import axios from 'axios';
import { API_URL } from '../config';

/**
 * Login admin user
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise} - Response with token and user data
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/login`, {
      email,
      password
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

/**
 * Register a new admin user (typically only used by super admins)
 * @param {Object} userData - User data including name, email, password
 * @returns {Promise} - Response with success message
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/admin/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify admin token
 * @param {string} token - Admin JWT token
 * @returns {Promise} - Response with user data if token is valid
 */
export const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout admin user (client-side only)
 */
export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

/**
 * Get current admin user from localStorage
 * @returns {Object|null} - User object or null if not logged in
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('adminUser');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Check if user is logged in
 * @returns {boolean} - True if user is logged in
 */
export const isLoggedIn = () => {
  return !!localStorage.getItem('adminToken');
};

/**
 * Update admin profile
 * @param {Object} userData - User data to update
 * @param {string} token - Admin JWT token
 * @returns {Promise} - Response with updated user data
 */
export const updateProfile = async (userData, token) => {
  try {
    const response = await axios.put(`${API_URL}/api/admin/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Profile update failed' };
  }
};

/**
 * Change admin password
 * @param {Object} passwordData - Password data including current password and new password
 * @param {string} token - Admin JWT token
 * @returns {Promise} - Response with success message
 */
export const changePassword = async (passwordData, token) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/change-password`, passwordData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Password change failed' };
  }
}; 