import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Meal Lovers'
  },
  siteDescription: {
    type: String,
    default: 'Delicious food delivery service'
  },
  contactEmail: {
    type: String,
    default: 'contact@meallovers.com'
  },
  contactPhone: {
    type: String,
    default: '+1 (555) 123-4567'
  },
  enableRegistration: {
    type: Boolean,
    default: true
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'light'
  },
  currency: {
    type: String,
    default: 'USD'
  },
  taxRate: {
    type: Number,
    default: 7.5
  },
  deliveryFee: {
    type: Number,
    default: 3.99
  },
  minOrderAmount: {
    type: Number,
    default: 10
  },
  maxDeliveryDistance: {
    type: Number,
    default: 10
  },
  smtpHost: {
    type: String,
    default: ''
  },
  smtpPort: {
    type: String,
    default: ''
  },
  smtpUser: {
    type: String,
    default: ''
  },
  smtpPassword: {
    type: String,
    default: ''
  },
  emailFrom: {
    type: String,
    default: ''
  },
  emailName: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Setting', SettingSchema); 