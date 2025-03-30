import fs from 'fs';
import path from 'path';

// Function to fix the login issue
function fixLoginIssue() {
  try {
    console.log('Fixing login issue...');
    
    // 1. Check the auth controller in the backend
    const authControllerPath = path.join('backend', 'controllers', 'auth.js');
    if (fs.existsSync(authControllerPath)) {
      let authControllerContent = fs.readFileSync(authControllerPath, 'utf8');
      
      // Check if there's an issue with the login function
      if (authControllerContent.includes('login')) {
        console.log('Auth controller exists and has login function');
        
        // Add debug logging to the login function
        if (!authControllerContent.includes('console.log(\'Login attempt\')')) {
          authControllerContent = authControllerContent.replace(
            /export const login = asyncHandler\(async \(req, res, next\) => {/,
            `export const login = asyncHandler(async (req, res, next) => {
  console.log('Login attempt:', req.body);`
          );
          
          fs.writeFileSync(authControllerPath, authControllerContent);
          console.log('Added debug logging to login function');
        }
      } else {
        console.log('Login function not found in auth controller');
      }
    } else {
      console.log('Auth controller not found');
    }
    
    // 2. Check the auth service in the frontend
    const authServicePath = path.join('frontend', 'src', 'services', 'authService.js');
    if (fs.existsSync(authServicePath)) {
      let authServiceContent = fs.readFileSync(authServicePath, 'utf8');
      
      // Add debug logging to the login function
      if (!authServiceContent.includes('console.log(\'Login response\')')) {
        authServiceContent = authServiceContent.replace(
          /export const login = async \(email, password\) => {/,
          `export const login = async (email, password) => {
  console.log('Login request:', { email, password });`
        );
        
        authServiceContent = authServiceContent.replace(
          /const response = await api\.post\('\/api\/auth\/login', { email, password }\);/,
          `const response = await api.post('/api/auth/login', { email, password });
    console.log('Login response:', response.data);`
        );
        
        fs.writeFileSync(authServicePath, authServiceContent);
        console.log('Added debug logging to frontend auth service');
      }
    } else {
      console.log('Auth service not found in frontend');
    }
    
    // 3. Create a test user with known credentials
    const createTestUserScript = `
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './backend/models/User.js';
import connectDB from './backend/config/db.js';

dotenv.config();

const createTestUser = async () => {
  try {
    await connectDB();
    console.log('Connected to database');
    
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log('Test user already exists');
      
      // Update password to known value
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      
      await User.findByIdAndUpdate(existingUser._id, { 
        password: hashedPassword 
      });
      
      console.log('Test user password reset to: password123');
    } else {
      // Create a new test user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      
      const newUser = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'user'
      });
      
      await newUser.save();
      console.log('Test user created with email: test@example.com and password: password123');
    }
    
    // Disconnect from database
    await mongoose.disconnect();
    console.log('Disconnected from database');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();
`;
    
    fs.writeFileSync('create-test-user.js', createTestUserScript);
    console.log('Created script to create test user');
    
    console.log('Login issue fix prepared successfully!');
    console.log('To create a test user, run: node create-test-user.js');
    console.log('Then try logging in with: test@example.com / password123');
  } catch (error) {
    console.error('Error fixing login issue:', error.message);
  }
}

fixLoginIssue(); 