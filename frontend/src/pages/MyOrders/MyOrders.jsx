import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../config';
import { toast } from 'react-toastify';
import { FaBox, FaShippingFast, FaCheckCircle, FaTimesCircle, FaSpinner, FaExclamationTriangle, FaReceipt, FaTrash, FaPlus } from 'react-icons/fa';
import './MyOrders.css';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  useEffect(() => {
    console.log("Orders state:", { orders, loading, error });
  }, [orders, loading, error]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      if (!currentUser) {
        setError('Please log in to view your orders');
        setLoading(false);
        return;
      }

      console.log("Fetching orders for user:", currentUser._id);
      console.log("API URL:", `${API_URL}/api/orders/user/${currentUser._id}`);
      
      // Try using fetch directly instead of the api service
      const response = await fetch(`${API_URL}/api/orders/user/${currentUser._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Orders data from fetch:", data);
      
      setOrders(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load your orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    setCancellingOrderId(orderId);
    try {
      await api.put(`/api/orders/${orderId}/cancel`);
      toast.success('Order cancelled successfully');
      
      // Update the order status in the UI
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { ...order, status: 'cancelled' } 
          : order
      ));
    } catch (err) {
      console.error('Error cancelling order:', err);
      toast.error('Failed to cancel order. Please try again.');
    } finally {
      setCancellingOrderId(null);
    }
  };

  const addToOrder = (orderId) => {
    // Store the order ID in localStorage to use it in the menu page
    localStorage.setItem('addingToOrderId', orderId);
    navigate('/menu');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge pending"><FaSpinner className="spin-icon" /> Pending</span>;
      case 'processing':
        return <span className="status-badge processing"><FaBox /> Processing</span>;
      case 'shipped':
        return <span className="status-badge shipped"><FaShippingFast /> Shipped</span>;
      case 'delivered':
        return <span className="status-badge delivered"><FaCheckCircle /> Delivered</span>;
      case 'cancelled':
        return <span className="status-badge cancelled"><FaTimesCircle /> Cancelled</span>;
      default:
        return <span className="status-badge unknown"><FaExclamationTriangle /> Unknown</span>;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const canCancelOrder = (status) => {
    return ['pending', 'processing'].includes(status);
  };

  const canAddToOrder = (status) => {
    return status === 'pending';
  };

  return (
    <div className="my-orders" style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      minHeight: 'calc(100vh - 100px)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '28px',
          color: '#333',
          marginBottom: '10px'
        }}>My Orders</h1>
      </div>

      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          flex: 1
        }}>
          <FaSpinner style={{
            animation: 'spin 1s linear infinite',
            marginRight: '10px',
            fontSize: '20px'
          }} />
          <p>Loading your orders...</p>
        </div>
      ) : error ? (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#fff0f0',
          borderRadius: '8px',
          color: '#e53e3e',
          flex: 1
        }}>
          <FaExclamationTriangle style={{ marginRight: '10px' }} />
          <p>{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '100px'
        }}>
          <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '60px 30px',
            margin: '20px auto 100px auto',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <div style={{ marginBottom: '20px', color: '#aaa' }}>
              <FaBox size={60} />
            </div>
            <h2 style={{
              color: '#333', 
              fontSize: '24px',
              marginBottom: '10px'
            }}>No Orders Yet</h2>
            <p style={{
              color: '#666', 
              margin: '0 0 15px 0',
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
              Track and manage your orders here. You haven't placed any orders yet.
            </p>
            <p style={{
              color: '#666', 
              margin: '0 0 25px 0',
              fontSize: '16px'
            }}>
              Start shopping to place your first order!
            </p>
            <button 
              style={{
                backgroundColor: '#4285f4',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onClick={() => navigate('/menu')}
            >
              Shop Now
            </button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1 }}>
          <p style={{
            marginBottom: '20px',
            color: '#666',
            fontSize: '16px'
          }}>
            Track and manage your orders
          </p>
          <div>
            {orders.map((order) => (
              <div key={order._id} style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: 'white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}>
                <p>Order #{order._id.substring(order._id.length - 8)}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ${order.totalAmount.toFixed(2)}</p>
                <div style={{ marginTop: '15px' }}>
                  <button 
                    style={{
                      backgroundColor: '#f0f0f0',
                      color: '#333',
                      padding: '8px 15px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    View Details
                  </button>
                  
                  {canCancelOrder(order.status) && (
                    <button 
                      style={{
                        backgroundColor: '#fff0f0',
                        color: '#e53e3e',
                        padding: '8px 15px',
                        border: '1px solid #fcc',
                        borderRadius: '6px',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => cancelOrder(order._id)}
                      disabled={cancellingOrderId === order._id}
                    >
                      {cancellingOrderId === order._id ? 'Cancelling...' : 'Cancel Order'}
                    </button>
                  )}
                  
                  {canAddToOrder(order.status) && (
                    <button 
                      style={{
                        backgroundColor: '#f0f9ff',
                        color: '#3182ce',
                        padding: '8px 15px',
                        border: '1px solid #bee3f8',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      onClick={() => addToOrder(order._id)}
                    >
                      Add Items
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
