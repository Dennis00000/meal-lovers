import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

// MongoDB connection string
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://dennis:Dennis2025@meal-lover.xqruhnb.mongodb.net/meallovers?retryWrites=true&w=majority&appName=meal-lover';

async function testUserLogin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Define User schema
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String
    });
    
    // Create User model
    const User = mongoose.model('User', userSchema);
    
    // Test credentials
    const email = 'test@example.com';
    const password = 'password123';
    
    console.log(`Testing login for: ${email}`);
    
    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found!');
      return;
    }
    
    console.log('User found:', user);
    
    // Test password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);
    
    if (isMatch) {
      console.log('Login would be successful!');
    } else {
      console.log('Password does not match!');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testUserLogin(); 