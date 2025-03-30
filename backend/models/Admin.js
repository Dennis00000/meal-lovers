import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  phone: String,
  role: {
    type: String,
    enum: ['admin', 'super'],
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check if password matches
adminSchema.methods.matchPassword = async function(enteredPassword) {
  try {
    console.log('Comparing admin passwords');
    console.log('Entered password:', enteredPassword);
    console.log('Stored hashed password:', this.password);
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log('Admin password match result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error comparing admin passwords:', error);
    return false;
  }
};

// Sign JWT and return
adminSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

export default mongoose.model('Admin', adminSchema); 