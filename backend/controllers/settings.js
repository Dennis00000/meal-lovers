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