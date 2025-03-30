import express from 'express';
import { 
  getOrders, 
  getOrder, 
  createOrder, 
  updateOrder, 
  deleteOrder,
  getUserOrders 
} from '../controllers/orders.js';
import { protect } from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// IMPORTANT: Route order matters! More specific routes should come first
// Add this route to handle /api/orders/my-orders BEFORE the /:id route
router.get('/my-orders', protect, (req, res) => {
  try {
    console.log('Fetching orders for user:', req.user._id);
    
    // In a real app, you would filter orders by user ID
    // For now, we'll return mock data
    const mockOrders = [
      {
        _id: 'mock-order-1',
        status: 'delivered',
        createdAt: new Date().toISOString(),
        totalPrice: 42.99,
        orderItems: [
          { _id: 'item1', name: 'Margherita Pizza', quantity: 1, price: 12.99, image: 'https://via.placeholder.com/100x100?text=Pizza' },
          { _id: 'item2', name: 'Garlic Bread', quantity: 2, price: 4.50, image: 'https://via.placeholder.com/100x100?text=Bread' },
          { _id: 'item3', name: 'Coca Cola', quantity: 3, price: 2.50, image: 'https://via.placeholder.com/100x100?text=Cola' }
        ],
        shippingAddress: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'USA'
        }
      },
      {
        _id: 'mock-order-2',
        status: 'processing',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        totalPrice: 27.50,
        orderItems: [
          { _id: 'item4', name: 'Pepperoni Pizza', quantity: 1, price: 14.99, image: 'https://via.placeholder.com/100x100?text=Pizza' },
          { _id: 'item5', name: 'Chicken Wings', quantity: 1, price: 8.99, image: 'https://via.placeholder.com/100x100?text=Wings' },
          { _id: 'item6', name: 'Sprite', quantity: 1, price: 2.50, image: 'https://via.placeholder.com/100x100?text=Sprite' }
        ],
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Somewhere',
          state: 'NY',
          zipCode: '67890',
          country: 'USA'
        }
      }
    ];
    
    res.status(200).json({
      success: true,
      data: mockOrders
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// Admin routes - use adminAuth directly
// router.get('/', adminAuth, getOrders);
router.put('/:id/status', adminAuth, updateOrder);
router.put('/:id', adminAuth, updateOrder);
router.delete('/:id', adminAuth, deleteOrder);

// User routes - use protect
router.get('/user/:userId', protect, getUserOrders);
router.post('/', protect, createOrder);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, (req, res) => {
  try {
    const order = mockOrders.find(o => o._id === req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
});

export default router; 