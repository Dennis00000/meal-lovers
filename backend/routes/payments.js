import express from 'express';
import { protect } from '../middleware/auth.js';
import Stripe from 'stripe';

const router = express.Router();

// Initialize Stripe with your secret key directly (temporary solution)
const stripe = new Stripe('sk_test_51R7EZ0POni7R48xAZ0boQ2wqykzpwq1yt8q03IPmkW7yi7qYlOvONuvI4zZt961UaiK7zLEDfUE3I9zcSKrBkTYx00QCX7K8Wy');

// Create a payment intent
router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      // Verify your integration by passing this parameter
      metadata: { integration_check: 'accept_a_payment' },
    });
    
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router; 