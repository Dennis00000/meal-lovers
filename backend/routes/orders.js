import express from 'express';
import { 
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  addItemsToOrder
} from '../controllers/orders.js';
import { protect, authorize } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Admin routes
router.route('/')
  .get(authorize('admin'), getOrders)
  .post(createOrder);

router.route('/:id')
  .get(getOrder)
  .put(authorize('admin'), updateOrder)
  .delete(authorize('admin'), deleteOrder);

// User routes
router.get('/user/:userId', getUserOrders);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel an order
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check if the order belongs to the user or if user is admin
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }
    
    // Check if order can be cancelled
    if (!['pending', 'processing'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'This order cannot be cancelled'
      });
    }
    
    // Update order status to cancelled
    order.status = 'cancelled';
    await order.save();
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order'
    });
  }
});

// @route   PUT /api/orders/:id/add-items
// @desc    Add items to an existing order
// @access  Private
router.put('/:id/add-items', addItemsToOrder);

export default router; 