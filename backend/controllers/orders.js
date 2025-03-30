import Order from '../models/Order.js';
import Product from '../models/Product.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  
  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }
  
  // Make sure user is order owner or admin
  if (req.user.role !== 'admin' && order.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to access this order`, 401));
  }
  
  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/user/:userId
// @access  Private
export const getUserOrders = asyncHandler(async (req, res, next) => {
  // Check if user is admin or the user themselves
  if (req.user.role !== 'admin' && req.user.id !== req.params.userId) {
    return next(new ErrorResponse(`Not authorized to access these orders`, 401));
  }
  
  const orders = await Order.find({ user: req.params.userId });
  
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;
  
  const order = await Order.create(req.body);
  
  res.status(201).json({
    success: true,
    data: order
  });
});

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private/Admin
export const updateOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  
  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }
  
  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }
  
  // Use deleteOne instead of remove() which is deprecated
  await Order.deleteOne({ _id: req.params.id });
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add items to an existing order
// @route   PUT /api/orders/:id/add-items
// @access  Private
export const addItemsToOrder = asyncHandler(async (req, res, next) => {
  const { items } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new ErrorResponse('Please provide items to add to the order', 400));
  }
  
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }
  
  // Check if the order belongs to the user or if user is admin
  if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to modify this order', 403));
  }
  
  // Check if order can be modified
  if (order.status !== 'pending') {
    return next(new ErrorResponse('This order cannot be modified', 400));
  }
  
  // Calculate additional amount
  let additionalAmount = 0;
  items.forEach(item => {
    additionalAmount += item.price * item.quantity;
  });
  
  // Add new items to the order
  order.items = [...order.items, ...items];
  
  // Update total amount
  order.totalAmount += additionalAmount;
  
  // Save the updated order
  await order.save();
  
  res.status(200).json({
    success: true,
    data: order
  });
}); 