import mongoose from 'mongoose';

// Your MongoDB connection string
const MONGO_URI = 'mongodb+srv://dennis:Dennis2025@meal-lover.xqruhnb.mongodb.net/meallovers?retryWrites=true&w=majority&appName=meal-lover';

async function checkAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Get the Admin collection
    const adminCollection = mongoose.connection.db.collection('admins');
    
    // Find the admin user
    const admin = await adminCollection.findOne({ email: 'admin@example.com' });
    
    if (admin) {
      console.log('Admin user found:');
      console.log('ID:', admin._id);
      console.log('Name:', admin.name);
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
      console.log('Created At:', admin.createdAt);
    } else {
      console.log('Admin user not found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

checkAdmin(); 