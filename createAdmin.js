import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
const envPath = path.join(__dirname, 'backend', '.env');
dotenv.config({ path: envPath });

console.log(`Looking for .env file at: ${envPath}`);
console.log(`MONGO_URI from env: ${process.env.MONGO_URI}`);

// If MONGO_URI is not found in .env, set a default
if (!process.env.MONGO_URI) {
  console.log('MONGO_URI not found in .env file. Using default connection string.');
  process.env.MONGO_URI = 'mongodb://localhost:27017/meallovers';
}

// Define the Admin schema directly in this file for simplicity
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'super'],
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Admin details - you can change these
const adminData = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'super'
};

// Connect to MongoDB
async function connectDB() {
  try {
    console.log(`Connecting to MongoDB with URI: ${process.env.MONGO_URI}`);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
}

async function createAdmin() {
  try {
    const conn = await connectDB();
    
    // Create the Admin model
    const Admin = mongoose.model('Admin', AdminSchema);
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin already exists');
      await mongoose.disconnect();
      process.exit(0);
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
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(`Error creating admin: ${error.message}`);
    process.exit(1);
  }
}

createAdmin(); 