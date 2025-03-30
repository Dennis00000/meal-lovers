import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

// MongoDB connection string
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://dennis:Dennis2025@meal-lover.xqruhnb.mongodb.net/meallovers?retryWrites=true&w=majority&appName=meal-lover';

async function createSimpleAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Define Admin schema
    const adminSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String
    });
    
    // Create Admin model
    const Admin = mongoose.model('Admin', adminSchema);
    
    // Create a simple admin with a known password
    const email = 'admin@example.com';
    const plainPassword = 'admin123';
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingAdmin) {
      console.log('Admin already exists. Updating password...');
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);
      
      // Update admin
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      
      console.log('Admin password updated successfully');
    } else {
      console.log('Creating new admin...');
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);
      
      // Create new admin
      const newAdmin = new Admin({
        name: 'Admin User',
        email,
        password: hashedPassword,
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('Admin created successfully');
    }
    
    console.log('Admin credentials:');
    console.log('Email:', email);
    console.log('Password:', plainPassword);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createSimpleAdmin(); 