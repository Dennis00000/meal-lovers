import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

// MongoDB connection string
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://dennis:Dennis2025@meal-lover.xqruhnb.mongodb.net/meallovers?retryWrites=true&w=majority&appName=meal-lover';

// Define schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

async function fixPasswords() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Create models
    const User = mongoose.model('User', userSchema);
    const Admin = mongoose.model('Admin', adminSchema);
    
    // Get all users and admins
    const users = await User.find({});
    const admins = await Admin.find({});
    
    console.log(`Found ${users.length} users and ${admins.length} admins`);
    
    // Fix user passwords
    for (const user of users) {
      console.log(`Checking user: ${user.email}`);
      
      // Check if password is already hashed
      const isHashed = user.password.length > 20; // Simple check for hash length
      
      if (!isHashed) {
        console.log(`Hashing password for user: ${user.email}`);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        await user.save();
        console.log(`Updated password for user: ${user.email}`);
      } else {
        console.log(`Password already hashed for user: ${user.email}`);
      }
    }
    
    // Fix admin passwords
    for (const admin of admins) {
      console.log(`Checking admin: ${admin.email}`);
      
      // Check if password is already hashed
      const isHashed = admin.password.length > 20; // Simple check for hash length
      
      if (!isHashed) {
        console.log(`Hashing password for admin: ${admin.email}`);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(admin.password, salt);
        admin.password = hashedPassword;
        await admin.save();
        console.log(`Updated password for admin: ${admin.email}`);
      } else {
        console.log(`Password already hashed for admin: ${admin.email}`);
      }
    }
    
    console.log('Password fix completed successfully');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixPasswords(); 