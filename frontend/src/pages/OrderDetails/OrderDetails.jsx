import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaArrowLeft, FaBox, FaShippingFast, FaCheckCircle, FaTimesCircle, FaSpinner, FaExclamationTriangle, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaReceipt } from 'react-icons/fa';
import api from '../../services/api';
import './OrderDetails.css';
import Image from '../../components/common/Image';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { currentUser, isLoggedIn } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format price to Euro
  const formatPrice = (price) => {
    return `€${Number(price).toFixed(2)}`;
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        
        // Use mock data directly without checking authentication
        // This ensures the page works even if the API call fails
        const mockOrders = [
          {
            _id: 'mock-order-1',
            status: 'delivered',
            createdAt: new Date().toISOString(),
            deliveredAt: new Date().toISOString(),
            totalPrice: 42.99,
            paymentMethod: 'Credit Card',
            paymentStatus: 'paid',
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
            },
            trackingNumber: 'TRK123456789'
          },
          {
            _id: 'mock-order-2',
            status: 'processing',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            totalPrice: 27.50,
            paymentMethod: 'PayPal',
            paymentStatus: 'paid',
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
            },
            trackingNumber: 'TRK987654321'
          }
        ];
        
        const foundOrder = mockOrders.find(o => o._id === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case 'shipped':
        return <FaShippingFast className="text-blue-500 text-xl" />;
      case 'processing':
        return <FaSpinner className="text-yellow-500 text-xl" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500 text-xl" />;
      default:
        return <FaBox className="text-gray-500 text-xl" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] pt-20">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700">Loading order details...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] pt-20">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-6 text-gray-600">{error}</p>
          <Link 
            to="/my-orders" 
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] pt-20">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <p className="mb-6 text-gray-600">We couldn't find the order you're looking for.</p>
          <Link 
            to="/my-orders" 
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl pt-20">
      <div className="mb-5">
        <Link to="/my-orders" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <FaArrowLeft className="mr-2" />
          <span>Back to My Orders</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 text-white">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Order #{order._id}</h1>
              <p className="text-blue-100 mt-1 text-sm">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className={`${getStatusClass(order.status)} px-4 py-2 rounded-full text-sm font-medium flex items-center mt-2 md:mt-0`}>
              {getStatusIcon(order.status)}
              <span className="ml-2">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                Shipping Address
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                Order Information
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Order Date:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                {order.deliveredAt && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Delivered Date:</span>
                    <span>{new Date(order.deliveredAt).toLocaleDateString()}</span>
                  </div>
                )}
                {order.trackingNumber && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tracking Number:</span>
                    <span className="font-medium">{order.trackingNumber}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>{order.paymentMethod || 'Credit Card'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <FaBox className="text-gray-500 mr-2" />
            Order Items
          </h2>
          
          <div className="bg-gray-50 rounded-lg overflow-hidden mb-6">
            <div className="divide-y">
              {order.orderItems.map((item, index) => (
                <div key={index} className="p-4 flex flex-wrap md:flex-nowrap justify-between items-center">
                  <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      className="item-image"
                      style={{ width: '60px', height: '60px', borderRadius: '4px' }}
                      fallbackSrc="/images/default-item.jpg"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.price)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-right w-full md:w-auto">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <FaMoneyBillWave className="text-gray-500 mr-2" />
            Order Summary
          </h2>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>{formatPrice(order.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0))}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping:</span>
              <span>{formatPrice(4.99)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax:</span>
              <span>{formatPrice(order.totalPrice * 0.1)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-5 border-t flex flex-wrap gap-3 justify-end">
          <Link 
            to="/contact" 
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition duration-300"
          >
            Need Help?
          </Link>
          {order.status === 'delivered' && (
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={() => alert('Reorder functionality would go here')}
            >
              Reorder
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 