import api from './api';

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/api/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    console.log('Fetching orders from API');
    const response = await api.get('/api/orders');
    console.log('Orders API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error.response?.data || error.message);
    
    // If we're in development or testing mode, return mock data
    if (process.env.NODE_ENV !== 'production') {
      console.log('Returning mock order data for development');
      return {
        success: true,
        data: [
          {
            _id: 'mock-order-1',
            status: 'delivered',
            createdAt: new Date().toISOString(),
            totalAmount: 42.99,
            items: [
              { _id: 'item1', name: 'Margherita Pizza', quantity: 1, price: 12.99 },
              { _id: 'item2', name: 'Garlic Bread', quantity: 2, price: 4.50 },
              { _id: 'item3', name: 'Coca Cola', quantity: 3, price: 2.50 }
            ]
          },
          {
            _id: 'mock-order-2',
            status: 'processing',
            createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            totalAmount: 27.50,
            items: [
              { _id: 'item4', name: 'Pepperoni Pizza', quantity: 1, price: 14.99 },
              { _id: 'item5', name: 'Chicken Wings', quantity: 1, price: 8.99 },
              { _id: 'item6', name: 'Sprite', quantity: 1, price: 2.50 }
            ]
          }
        ]
      };
    }
    
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error.response?.data || error.message);
    throw error;
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order with id ${id}:`, error);
    throw error;
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await api.put(`/api/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error.response?.data || error.message);
    throw error;
  }
};

export const addItemsToOrder = async (orderId, items) => {
  try {
    const response = await api.put(`/api/orders/${orderId}/add-items`, { items });
    return response.data;
  } catch (error) {
    console.error('Error adding items to order:', error.response?.data || error.message);
    throw error;
  }
}; 