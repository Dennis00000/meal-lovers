import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { processPayment } from '../../services/paymentService';
import { createOrder } from '../../services/orderService';
import { useStore } from '../../Context/StoreContext';
import './PaymentForm.css';

const PaymentForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useStore();
  
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    setProcessing(true);
    setError(null);
    
    try {
      // Get a reference to the CardElement
      const cardElement = elements.getElement(CardElement);
      
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      
      if (error) {
        setError(`Payment failed: ${error.message}`);
        setProcessing(false);
        return;
      }
      
      // Process the payment
      const paymentIntent = await processPayment(paymentMethod.id, totalAmount * 100); // Convert to cents
      
      // Create the order in your system
      const orderData = {
        items: cartItems,
        totalAmount,
        paymentIntentId: paymentIntent.id,
        status: 'paid'
      };
      
      const order = await createOrder(orderData);
      
      setSucceeded(true);
      clearCart();
      
      // Redirect to order confirmation page
      navigate(`/order-confirmation/${order.id}`);
      
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <div className="card-element-container">
          <CardElement 
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>
      
      {error && <div className="payment-error">{error}</div>}
      
      <button 
        type="submit" 
        className="payment-button"
        disabled={processing || !stripe || succeeded}
      >
        {processing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </button>
      
      <div className="payment-info">
        <p>Test Card: 4242 4242 4242 4242</p>
        <p>Exp: Any future date, CVC: Any 3 digits</p>
      </div>
    </form>
  );
};

export default PaymentForm; 