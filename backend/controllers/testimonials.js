import Testimonial from '../models/Testimonial.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = asyncHandler(async (req, res, next) => {
  // For public access, only return approved testimonials
  const query = req.user && req.user.role === 'admin' 
    ? {} 
    : { isApproved: true };
  
  const testimonials = await Testimonial.find(query).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials
  });
});

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
export const getTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(
      new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if testimonial is approved or user is admin
  if (!testimonial.isApproved && (!req.user || req.user.role !== 'admin')) {
    return next(
      new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: testimonial
  });
});

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private
export const createTestimonial = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;
  
  // Set name from user if not provided
  if (!req.body.name) {
    req.body.name = req.user.name;
  }

  // Auto-approve if admin
  if (req.user.role === 'admin') {
    req.body.isApproved = true;
  }

  const testimonial = await Testimonial.create(req.body);

  res.status(201).json({
    success: true,
    data: testimonial
  });
});

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
export const updateTestimonial = asyncHandler(async (req, res, next) => {
  let testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(
      new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is testimonial owner or admin
  if (
    testimonial.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this testimonial`,
        401
      )
    );
  }

  // Reset approval status if content is changed by non-admin
  if (
    req.user.role !== 'admin' &&
    (req.body.review !== testimonial.review || req.body.rating !== testimonial.rating)
  ) {
    req.body.isApproved = false;
  }

  testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: testimonial
  });
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(
      new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404)
    );
  }

  await Testimonial.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Approve testimonial
// @route   PUT /api/testimonials/:id/approve
// @access  Private/Admin
export const approveTestimonial = asyncHandler(async (req, res, next) => {
  let testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(
      new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404)
    );
  }

  testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: testimonial
  });
}); 