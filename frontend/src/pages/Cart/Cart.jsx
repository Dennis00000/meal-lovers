import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../Context/StoreContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowRight, 
  FaSpinner, FaCreditCard, FaArrowLeft, FaLock, FaMapMarkerAlt,
  FaShieldAlt, FaUtensils, FaExclamationCircle
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import api from '../../services/api';
import './Cart.css';
import { getImageUrl } from '../../utils/imageUtils';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, getTotalCartAmount, clearCart, cartTotal } = useStore();
  const { isLoggedIn, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Format price to Euro
  const formatPrice = (price) => {
    return `€${Number(price || 0).toFixed(2)}`;
  };
  
  useEffect(() => {
    // Pre-fill shipping info if user is logged in
    if (currentUser) {
      setShippingInfo(prev => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || '',
        address: currentUser.address || ''
      }));
    }
  }, [currentUser]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    toast.info('Item removed from cart');
  };
  
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateShippingInfo = () => {
    const { name, email, address, city, postalCode, country } = shippingInfo;
    if (!name || !email || !address || !city || !postalCode || !country) {
      toast.error('Please fill in all shipping information');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    return true;
  };
  
  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast.error('Please log in to checkout');
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setShowCheckout(true);
  };
  
  const handleCancelCheckout = () => {
    setShowCheckout(false);
    setPaymentError(null);
  };
  
  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    if (!validateShippingInfo()) {
      return;
    }
    
    setProcessingPayment(true);
    setPaymentError(null);
    
    try {
      // Create a payment intent on the server
      const { data } = await api.post('/api/payments/create-payment-intent', {
        amount: Math.round(cartTotal * 100), // Convert to cents
        currency: 'eur',
        description: 'Order from Meal Lovers',
        shipping: shippingInfo
      });
      
      const cardElement = elements.getElement(CardElement);
      
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shippingInfo.name,
            email: shippingInfo.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              postal_code: shippingInfo.postalCode,
              country: shippingInfo.country
            }
          }
        }
      });
      
      if (error) {
        setPaymentError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Payment successful, create order
        await api.post('/api/orders', {
          orderItems: cartItems,
          shippingAddress: shippingInfo,
          paymentMethod: 'Credit Card',
          paymentResult: {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: new Date().toISOString(),
            email_address: shippingInfo.email
          },
          totalPrice: cartTotal + 4.99 + (cartTotal * 0.1), // Add shipping and tax
          isPaid: true,
          paidAt: new Date().toISOString()
        });
        
        // Clear cart and show success message
        clearCart();
        toast.success('Payment successful! Your order has been placed.');
        navigate('/my-orders');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentError('An error occurred while processing your payment. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleContinueShopping = () => {
    navigate('/menu');
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Cart</h1>
          {cartItems.length > 0 && (
            <button 
              className="clear-cart-btn"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingCart />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <button 
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              <FaUtensils />
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-content">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item._id}>
                    <div className="cart-item-image">
                      <img 
                        src={getImageUrl(item)} 
                        alt={item.name} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop";
                        }}
                      />
                    </div>
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <span className="price">{formatPrice(item.price)}</span>
                      <div className="cart-item-actions">
                        <div className="quantity-control">
                          <button 
                            onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="quantity-btn"
                          >
                            <FaMinus />
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}
                            className="quantity-btn"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <FaTrash />
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="spinner" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <FaArrowRight />
                    </>
                  )}
                </button>
                
                <button 
                  className="continue-shopping-link"
                  onClick={handleContinueShopping}
                >
                  <FaArrowLeft />
                  Continue Shopping
                </button>
                
                <div className="secure-checkout">
                  <FaLock />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
            
            <div className="cart-features">
              <div className="feature">
                <FaShieldAlt />
                <div>
                  <h3>100% Secure</h3>
                  <p>Your data is protected</p>
                </div>
              </div>
              <div className="feature">
                <FaMapMarkerAlt />
                <div>
                  <h3>Fast Delivery</h3>
                  <p>Quick delivery to your doorstep</p>
                </div>
              </div>
              <div className="feature">
                <FaCreditCard />
                <div>
                  <h3>Secure Payment</h3>
                  <p>Multiple payment options available</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
