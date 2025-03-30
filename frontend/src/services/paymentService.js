import { loadStripe } from '@stripe/stripe-js';
import api from './api';

// Load the Stripe instance with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const response = await api.post('/payments/create-payment-intent', {
      amount,
      currency
    });
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const processPayment = async (paymentMethodId, amount) => {
  try {
    const stripe = await stripePromise;
    
    // Create payment intent on the server
    const { clientSecret } = await createPaymentIntent(amount);
    
    // Confirm the payment with Stripe.js
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodId
    });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    return result.paymentIntent;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
};

export const getStripe = () => stripePromise; 