import api from './api';

// Fallback menu items in case API fails
const fallbackMenuItems = [
  // Burgers
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
  // Add more items for each category (5 per category)
  // ... (all your fallback items)
];

export const getMenuItems = async () => {
  try {
    const response = await api.get('/api/menu');
    console.log('Menu API Response:', response.data);
    
    // Make sure we return an array
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (response.data && typeof response.data === 'object') {
      console.warn('API returned object instead of array, using fallback');
      return fallbackMenuItems;
    } else {
      return fallbackMenuItems;
    }
  } catch (error) {
    console.error('Error fetching menu items:', error);
    console.log('Using fallback menu items');
    return fallbackMenuItems;
  }
};

export const getMenuItem = async (id) => {
  try {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu item with id ${id}:`, error);
    throw error;
  }
};

export const getFeaturedItems = async () => {
  try {
    const response = await api.get('/menu/featured');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured items:', error);
    throw error;
  }
}; 