import fs from 'fs';
import path from 'path';

// Function to fix the settings API
function fixSettingsAPI() {
  try {
    console.log('Fixing settings API...');
    
    // 1. Create the Settings model
    const settingsModelPath = path.join('backend', 'models', 'Setting.js');
    const settingsModelContent = `
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
`;
    
    // Create the directory if it doesn't exist
    const modelsDir = path.join('backend', 'models');
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
    }
    
    fs.writeFileSync(settingsModelPath, settingsModelContent);
    console.log('Created Settings model');
    
    // 2. Create the Settings controller
    const settingsControllerPath = path.join('backend', 'controllers', 'settings.js');
    const settingsControllerContent = `
import Setting from '../models/Setting.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all settings
// @route   GET /api/settings
// @access  Public
export const getSettings = asyncHandler(async (req, res, next) => {
  // Get settings or create default if none exist
  let settings = await Setting.findOne({});
  
  if (!settings) {
    settings = await Setting.create({});
  }
  
  res.status(200).json({
    success: true,
    data: settings
  });
});

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = asyncHandler(async (req, res, next) => {
  // Get settings or create default if none exist
  let settings = await Setting.findOne({});
  
  if (!settings) {
    settings = await Setting.create(req.body);
  } else {
    settings = await Setting.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true
    });
  }
  
  res.status(200).json({
    success: true,
    data: settings
  });
});
`;
    
    // Create the directory if it doesn't exist
    const controllersDir = path.join('backend', 'controllers');
    if (!fs.existsSync(controllersDir)) {
      fs.mkdirSync(controllersDir, { recursive: true });
    }
    
    fs.writeFileSync(settingsControllerPath, settingsControllerContent);
    console.log('Created Settings controller');
    
    // 3. Create the Settings route
    const settingsRoutePath = path.join('backend', 'routes', 'settings.js');
    const settingsRouteContent = `
import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getSettings)
  .put(protect, authorize('admin'), updateSettings);

export default router;
`;
    
    // Create the directory if it doesn't exist
    const routesDir = path.join('backend', 'routes');
    if (!fs.existsSync(routesDir)) {
      fs.mkdirSync(routesDir, { recursive: true });
    }
    
    fs.writeFileSync(settingsRoutePath, settingsRouteContent);
    console.log('Created Settings route');
    
    // 4. Update the server.js file to use the Settings route
    const serverPath = path.join('backend', 'server.js');
    if (fs.existsSync(serverPath)) {
      let serverContent = fs.readFileSync(serverPath, 'utf8');
      
      // Check if the settings route is already imported
      if (!serverContent.includes('import settingsRoutes')) {
        // Find the last import statement
        const lastImportIndex = serverContent.lastIndexOf('import');
        const lastImportEndIndex = serverContent.indexOf('\n', lastImportIndex);
        
        // Insert the settings route import after the last import
        serverContent = serverContent.slice(0, lastImportEndIndex + 1) + 
          "import settingsRoutes from './routes/settings.js';\n" + 
          serverContent.slice(lastImportEndIndex + 1);
      }
      
      // Check if the settings route is already used
      if (!serverContent.includes("app.use('/api/settings'")) {
        // Find where routes are defined
        const routesIndex = serverContent.indexOf("app.use('/api");
        
        // Find the end of the routes section
        let routesEndIndex = serverContent.indexOf('\n\n', routesIndex);
        if (routesEndIndex === -1) {
          routesEndIndex = serverContent.indexOf('\n', routesIndex);
        }
        
        // Insert the settings route
        serverContent = serverContent.slice(0, routesEndIndex + 1) + 
          "app.use('/api/settings', settingsRoutes);\n" + 
          serverContent.slice(routesEndIndex + 1);
      }
      
      fs.writeFileSync(serverPath, serverContent);
      console.log('Updated server.js to use Settings route');
    } else {
      console.log('server.js not found, skipping update');
    }
    
    console.log('Settings API fixed successfully!');
  } catch (error) {
    console.error('Error fixing settings API:', error.message);
  }
}

fixSettingsAPI(); 