import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import errorHandler from './middleware/error.js'
import morgan from 'morgan'
import colors from 'colors'
import path from 'path'
import cookieParser from 'cookie-parser'

// Import routes
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import productsRoutes from './routes/products.js'
import categoriesRoutes from './routes/categories.js'
import ordersRoutes from './routes/orders.js'
import testimonialsRoutes from './routes/testimonials.js'
import contactRoutes from './routes/contact.js'
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/users.js'
import orderRoutes from './routes/orderRoutes.js'
import menuRoutes from './routes/menu.js'
import paymentRoutes from './routes/payments.js'
import settingsRoutes from './routes/settings.js'
import healthCheckRoutes from './routes/healthCheck.js'

// Load env vars
dotenv.config()

// Debug environment variables
console.log('Environment:', process.env.NODE_ENV);
console.log('Stripe Key exists:', !!process.env.STRIPE_SECRET_KEY);
// Don't log the actual key for security reasons

const app = express()

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:5173', // Add Vite's default port
    process.env.ADMIN_URL || 'http://localhost:3001'
  ],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Connect to MongoDB
connectDB();

// Mount routers
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/testimonials', testimonialsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/users', userRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/health-check', healthCheckRoutes)

// Add this before your other routes
app.get('/api/health-check', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
  })
}

// Error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})

export default app; // For testing purposes