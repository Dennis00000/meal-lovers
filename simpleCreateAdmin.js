import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Your actual MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://dennis:Dennis2025@meal-lover.xqruhnb.mongodb.net/?retryWrites=true&w=majority&appName=meal-lover';

// Admin schema
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

// Connect to MongoDB and create admin
async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Create Admin model
    const Admin = mongoose.model('Admin', AdminSchema);
    
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);
    
    // Create admin
    const admin = new Admin({
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role
    });
    
    await admin.save();
    console.log('Admin created successfully');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

run(); 