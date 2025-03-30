import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getOrders } from '../services/orderService';
import { toast } from 'react-toastify';
import { FaExclamationTriangle } from 'react-icons/fa';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('Fetching orders for user:', currentUser?._id);
        const response = await getOrders();
        console.log('Orders response:', response);
        
        if (response.success) {
          setOrders(response.data);
        } else {
          setError(response.message || 'Failed to load orders');
          toast.error(response.message || 'Failed to load orders');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
        toast.error('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn && currentUser) {
      fetchOrders();
    } else {
      setLoading(false);
      setError('Please log in to view your orders');
    }
  }, [currentUser, isLoggedIn]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Orders</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">
            This could be due to a network issue or the server might be unavailable.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600">You haven't placed any orders yet.</p>
          <a 
            href="/menu" 
            className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Browse Menu
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-3">
                {order.items.map(item => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium">{item.quantity}x</span>
                      <span className="ml-2">{item.name}</span>
                    </div>
                    <span className="text-gray-700">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t">
              <a 
                href={`/order-details/${order._id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Order Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage; 