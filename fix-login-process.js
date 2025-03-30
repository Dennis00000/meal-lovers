import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Function to fix the login process
async function fixLoginProcess() {
  try {
    console.log('Starting login process fix...');
    
    // 1. Fix the User model
    const userModelPath = path.join('backend', 'models', 'User.js');
    if (fs.existsSync(userModelPath)) {
      let userModelContent = fs.readFileSync(userModelPath, 'utf8');
      
      // Ensure the matchPassword method is correctly implemented
      if (userModelContent.includes('userSchema.methods.matchPassword')) {
        // Replace the matchPassword method with a simpler implementation
        userModelContent = userModelContent.replace(
          /userSchema\.methods\.matchPassword = async function\(enteredPassword\) {[\s\S]*?}/,
          `userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}`
        );
        
        fs.writeFileSync(userModelPath, userModelContent);
        console.log('Fixed matchPassword method in User model');
      }
    }
    
    // 2. Fix the auth controller
    const authControllerPath = path.join('backend', 'controllers', 'auth.js');
    if (fs.existsSync(authControllerPath)) {
      let authControllerContent = fs.readFileSync(authControllerPath, 'utf8');
      
      // Add more debug logging to the login function
      if (authControllerContent.includes('export const login')) {
        authControllerContent = authControllerContent.replace(
          /export const login = asyncHandler\(async \(req, res, next\) => {[\s\S]*?const isMatch = await user\.matchPassword\(password\);/,
          `export const login = asyncHandler(async (req, res, next) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    console.log('User not found with email:', email);
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  console.log('User found:', user.email);
  console.log('Attempting to match password...');
  
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  console.log('Password match result:', isMatch);`
        );
        
        fs.writeFileSync(authControllerPath, authControllerContent);
        console.log('Added debug logging to login function in auth controller');
      }
    }
    
    // 3. Fix the frontend auth service
    const authServicePath = path.join('frontend', 'src', 'services', 'authService.js');
    if (fs.existsSync(authServicePath)) {
      let authServiceContent = fs.readFileSync(authServicePath, 'utf8');
      
      // Add more debug logging to the login function
      if (authServiceContent.includes('export const login')) {
        authServiceContent = authServiceContent.replace(
          /export const login = async \(email, password\) => {[\s\S]*?try {[\s\S]*?const response = await api\.post\('\/api\/auth\/login', { email, password }\);/,
          `export const login = async (email, password) => {
  try {
    console.log('Login request:', { email, password: '***' });
    
    const response = await api.post('/api/auth/login', { email, password });
    console.log('Login response:', response.data);`
        );
        
        fs.writeFileSync(authServicePath, authServiceContent);
        console.log('Added debug logging to login function in auth service');
      }
    }
    
    // 4. Create a test user in the database
    try {
      // Connect to the database
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB');
      
      // Get the User model
      const User = mongoose.model('User');
      
      // Create a test user with a known password
      const testEmail = 'test@example.com';
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
      
      // Disconnect from the database
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (dbError) {
      console.error('Error creating test user in database:', dbError);
    }
    
    console.log('Login process fix completed');
    console.log('Try logging in with email: test@example.com and password: password123');
  } catch (error) {
    console.error('Error fixing login process:', error);
  }
}

fixLoginProcess(); 