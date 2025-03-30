import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

// Use your actual MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://dennis:Dennis2025@meal-lover.xqruhnb.mongodb.net/?retryWrites=true&w=majority&appName=meal-lover';

// Define the Admin schema directly in this file
const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Admin details
const adminData = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'super'
};

async function createAdmin() {
  try {
    console.log(`Connecting to MongoDB at ${MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}...`);
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
    
    // Create the Admin model
    const Admin = mongoose.model('Admin', AdminSchema);
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin already exists');
      await mongoose.disconnect();
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);
    
    // Create new admin
    const admin = new Admin({
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role
    });
    
    await admin.save();
    console.log('Admin created successfully');
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    // Disconnect from MongoDB
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error.message);
    }
  }
}

createAdmin(); 