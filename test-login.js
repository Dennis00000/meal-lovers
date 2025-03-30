import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Function to test the login API
async function testLogin() {
  try {
    console.log('Testing login API...');
    
    const API_URL = process.env.API_URL || 'http://localhost:5000';
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    
    console.log(`API URL: ${API_URL}`);
    console.log(`Test email: ${testEmail}`);
    console.log(`Test password: ${testPassword}`);
    
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: testEmail,
      password: testPassword
    });
    
    console.log('Login response:', response.data);
    
    if (response.data.success) {
      console.log('Login successful!');
      console.log('Token:', response.data.token);
      console.log('User:', response.data.user);
    } else {
      console.log('Login failed!');
    }
  } catch (error) {
    console.error('Error testing login:', error.response?.data || error.message);
  }
}

testLogin(); 