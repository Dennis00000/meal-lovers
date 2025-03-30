import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config();

// Load models
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import Testimonial from './models/Testimonial.js';

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for seeding...'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8')
);

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
);

const testimonials = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/testimonials.json`, 'utf-8')
);

// Reset and seed database
const resetAndSeedDB = async () => {
  try {
    // First clear all existing data
    console.log('Clearing existing data...');
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Testimonial.deleteMany();
    console.log('Data cleared successfully!');
    
    // Then import fresh data
    console.log('Importing fresh data...');
    await User.create(users);
    await Category.create(categories);
    await Product.create(products);
    await Testimonial.create(testimonials);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

// Run the seeding operation
resetAndSeedDB(); 