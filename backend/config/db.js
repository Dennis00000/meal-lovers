import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dennis:Dennis2025@meal-lover.xqruhnb.mongodb.net/meallovers?retryWrites=true&w=majority&appName=meal-lover';
        console.log('MongoDB URI:', MONGODB_URI);
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
        process.exit(1);
    }
};

export default connectDB;

// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.