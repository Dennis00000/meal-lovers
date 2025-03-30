import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Function to debug the login process
async function debugLogin() {
  try {
    console.log('Starting login debugging process...');
    
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    
    // Get the User model
    const User = mongoose.model('User');
    
    // Check if the User model exists
    if (!User) {
      console.error('User model not found!');
      return;
    }
    
    // List all users in the database
    const users = await User.find({}).select('+password');
    console.log(`Found ${users.length} users in the database:`);
    
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`  ID: ${user._id}`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Password hash: ${user.password ? user.password.substring(0, 20) + '...' : 'No password'}`);
    });
    
    // Create a test user with a known password
    const testEmail = 'testuser@example.com';
    const testPassword = 'password123';
    
    // Check if test user already exists
    let testUser = await User.findOne({ email: testEmail });
    
    if (testUser) {
      console.log(`Test user already exists with email: ${testEmail}`);
      
      // Update the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testPassword, salt);
      
      testUser.password = hashedPassword;
      await testUser.save();
      
      console.log(`Updated test user password to: ${testPassword}`);
    } else {
      // Create a new test user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testPassword, salt);
      
      testUser = new User({
        name: 'Test User',
        email: testEmail,
        password: hashedPassword,
        role: 'user'
      });
      
      await testUser.save();
      console.log(`Created new test user with email: ${testEmail} and password: ${testPassword}`);
    }
    
    // Test the password matching function
    const retrievedUser = await User.findOne({ email: testEmail }).select('+password');
    
    if (!retrievedUser) {
      console.error('Could not retrieve test user!');
      return;
    }
    
    console.log('Testing password matching function...');
    
    // Test with correct password
    const correctMatch = await bcrypt.compare(testPassword, retrievedUser.password);
    console.log(`Password match with correct password: ${correctMatch}`);
    
    // Test with incorrect password
    const incorrectMatch = await bcrypt.compare('wrongpassword', retrievedUser.password);
    console.log(`Password match with incorrect password: ${incorrectMatch}`);
    
    // Check if the User model has the matchPassword method
    if (typeof retrievedUser.matchPassword === 'function') {
      console.log('User model has matchPassword method');
      
      // Test the matchPassword method
      const methodMatch = await retrievedUser.matchPassword(testPassword);
      console.log(`matchPassword method result with correct password: ${methodMatch}`);
      
      const methodIncorrectMatch = await retrievedUser.matchPassword('wrongpassword');
      console.log(`matchPassword method result with incorrect password: ${methodIncorrectMatch}`);
    } else {
      console.error('User model does not have matchPassword method!');
    }
    
    console.log('Login debugging process completed');
    
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error debugging login:', error);
  }
}

debugLogin(); 