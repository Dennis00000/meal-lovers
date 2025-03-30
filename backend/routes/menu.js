import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Sample menu data (replace with database queries in production)
const menuItems = [
  {
    id: 1,
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 9.99,
    image: '/images/menu/burger.jpg',
    category: 'Burgers',
    rating: 4.7,
    reviews: 120,
    popular: true
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Traditional pizza with tomato sauce, mozzarella, and basil',
    price: 12.99,
    image: '/images/menu/pizza.jpg',
    category: 'Pizza',
    rating: 4.8,
    reviews: 95,
    popular: true
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
    price: 8.99,
    image: '/images/menu/salad.jpg',
    category: 'Salads',
    rating: 4.5,
    reviews: 68,
    popular: false
  },
  {
    id: 4,
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with vanilla ice cream',
    price: 6.99,
    image: '/images/menu/brownie.jpg',
    category: 'Desserts',
    rating: 4.9,
    reviews: 85,
    popular: true
  },
  {
    id: 5,
    name: 'Iced Coffee',
    description: 'Cold brewed coffee served over ice',
    price: 3.99,
    image: '/images/menu/coffee.jpg',
    category: 'Drinks',
    rating: 4.6,
    reviews: 42,
    popular: false
  },
  {
    id: 6,
    name: 'Veggie Wrap',
    description: 'Grilled vegetables with hummus in a whole wheat wrap',
    price: 8.49,
    image: '/images/menu/wrap.jpg',
    category: 'Vegetarian',
    rating: 4.4,
    reviews: 56,
    popular: false
  },
  {
    id: 7,
    name: 'Chicken Alfredo',
    description: 'Fettuccine pasta with creamy Alfredo sauce and grilled chicken',
    price: 14.99,
    image: '/images/menu/pasta.jpg',
    category: 'Pasta',
    rating: 4.7,
    reviews: 78,
    popular: true
  },
  {
    id: 8,
    name: 'Breakfast Platter',
    description: 'Eggs, bacon, toast, and hash browns',
    price: 10.99,
    image: '/images/menu/breakfast.jpg',
    category: 'Breakfast',
    rating: 4.8,
    reviews: 92,
    popular: true
  },
  {
    id: 9,
    name: 'Grilled Salmon',
    description: 'Fresh salmon fillet with lemon butter sauce',
    price: 16.99,
    image: '/images/menu/salmon.jpg',
    category: 'Seafood',
    rating: 4.9,
    reviews: 65,
    popular: true
  },
  {
    id: 10,
    name: 'Beef Stir Fry',
    description: 'Sliced beef with vegetables in a savory sauce',
    price: 13.99,
    image: '/images/menu/stirfry.jpg',
    category: 'Asian',
    rating: 4.6,
    reviews: 48,
    popular: false
  },
  {
    id: 11,
    name: 'Chicken Tacos',
    description: 'Soft tortillas filled with seasoned chicken, salsa, and cheese',
    price: 11.99,
    image: '/images/menu/tacos.jpg',
    category: 'Mexican',
    rating: 4.7,
    reviews: 72,
    popular: true
  },
  {
    id: 12,
    name: 'Greek Salad',
    description: 'Mixed greens with feta, olives, and Greek dressing',
    price: 9.49,
    image: '/images/menu/greeksalad.jpg',
    category: 'Salads',
    rating: 4.5,
    reviews: 39,
    popular: false
  }
];

// Get all menu items
router.get('/', async (req, res) => {
  try {
    // In a real app, you would fetch from database
    
    // Add this logging to debug
    console.log('Sending menu items:', menuItems.length);
    
    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get a single menu item
router.get('/:id', async (req, res) => {
  try {
    const item = menuItems.find(item => item.id === parseInt(req.params.id));
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      item
    });
  } catch (error) {
    console.error(`Error fetching menu item with id ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get featured menu items
router.get('/featured', async (req, res) => {
  try {
    const featuredItems = menuItems.filter(item => item.popular);
    
    res.status(200).json({
      success: true,
      count: featuredItems.length,
      items: featuredItems
    });
  } catch (error) {
    console.error('Error fetching featured items:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    let filteredItems;
    
    if (category.toLowerCase() === 'all') {
      filteredItems = menuItems;
    } else {
      filteredItems = menuItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    console.log(`Sending ${filteredItems.length} items for category: ${category}`);
    
    res.status(200).json({
      success: true,
      count: filteredItems.length,
      data: filteredItems
    });
  } catch (error) {
    console.error(`Error fetching menu items for category ${req.params.category}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Admin routes (protected)

// Create a new menu item
router.post('/', protect, async (req, res) => {
  try {
    // In a real app, you would save to database
    // For now, just return success
    res.status(201).json({
      success: true,
      message: 'Menu item created successfully'
    });
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Update a menu item
router.put('/:id', protect, async (req, res) => {
  try {
    const item = menuItems.find(item => item.id === parseInt(req.params.id));
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }
    
    // In a real app, you would update in database
    // For now, just return success
    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully'
    });
  } catch (error) {
    console.error(`Error updating menu item with id ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Delete a menu item
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = menuItems.find(item => item.id === parseInt(req.params.id));
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }
    
    // In a real app, you would delete from database
    // For now, just return success
    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error(`Error deleting menu item with id ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

export default router; 