import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';
import { FaCheckCircle, FaReceipt, FaUtensils, FaArrowRight } from 'react-icons/fa';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrder(data.order);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Unable to load your order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id]);
  
  if (loading) {
    return (
      <div className="order-confirmation-page">
        <div className="loading-spinner"></div>
        <p>Loading your order details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="order-confirmation-page">
        <div className="error-message">
          <h2>Oops!</h2>
          <p>{error}</p>
          <Link to="/menu" className="browse-menu-button">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your order. Your delicious food is on its way!</p>
        </div>
        
        <div className="order-details">
          <div className="order-info">
            <h2><FaReceipt /> Order Information</h2>
            <div className="info-row">
              <span>Order Number:</span>
              <span>#{order?.id || id}</span>
            </div>
            <div className="info-row">
              <span>Order Date:</span>
              <span>{new Date(order?.createdAt).toLocaleString()}</span>
            </div>
            <div className="info-row">
              <span>Payment Status:</span>
              <span className="status-paid">Paid</span>
            </div>
            <div className="info-row">
              <span>Order Status:</span>
              <span className="status-processing">Processing</span>
            </div>
          </div>
          
          <div className="order-summary">
            <h2><FaUtensils /> Order Summary</h2>
            <div className="order-items">
              {order?.items.map((item, index) => (
                <div className="order-item" key={index}>
                  <div className="item-info">
                    <span className="item-quantity">{item.quantity}x</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${(order?.totalAmount * 0.85).toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${(order?.totalAmount * 0.08).toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Delivery Fee</span>
                <span>${(order?.totalAmount * 0.07).toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${order?.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="confirmation-actions">
          <Link to="/my-orders" className="view-orders-button">
            View My Orders
          </Link>
          <Link to="/menu" className="continue-shopping-button">
            Continue Shopping <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 