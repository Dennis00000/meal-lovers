import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../Context/StoreContext';
import PaymentForm from '../../components/Checkout/PaymentForm';
import './Checkout.css';
import { addItemsToOrder } from '../../services/orderService';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cartItems } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(3.99);
  const [total, setTotal] = useState(0);
  const [addingToOrderId, setAddingToOrderId] = useState(null);
  
  useEffect(() => {
    // Redirect to cart if no items
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    
    // Calculate subtotal
    const itemsSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    
    setSubtotal(itemsSubtotal);
    
    // Calculate tax (e.g., 8%)
    const taxAmount = itemsSubtotal * 0.08;
    setTax(taxAmount);
    
    // Calculate total
    setTotal(itemsSubtotal + taxAmount + deliveryFee);
  }, [cartItems, deliveryFee, navigate]);
  
  useEffect(() => {
    // Check if we're adding to an existing order
    const params = new URLSearchParams(location.search);
    const orderIdToAddTo = params.get('addToOrder');
    
    if (orderIdToAddTo) {
      setAddingToOrderId(orderIdToAddTo);
    }
  }, [location]);
  
  // Modify handleSubmit to handle adding to an existing order
  const handleSubmit = async (paymentData) => {
    try {
      if (addingToOrderId) {
        // We're adding items to an existing order
        await addItemsToOrder(addingToOrderId, cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })));
        
        toast.success('Items added to your order successfully!');
        navigate('/my-orders');
      } else {
        // Regular checkout process
        // Existing checkout code...
      }
    } catch (error) {
      toast.error('Failed to process your order. Please try again.');
    }
  };
  
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div className="order-item" key={item.id}>
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="payment-section">
            <h2>Payment Details</h2>
            <PaymentForm totalAmount={total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 