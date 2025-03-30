import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: [1, 'Quantity cannot be less than 1']
    },
    price: {
      type: Number,
      required: true
    } // Price at time of order
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'Lithuania' }
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'cash_on_delivery', 'paypal'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: Date,
  specialInstructions: String,
  deliveryFee: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

orderSchema.pre('remove', async function(next) {
  // Any cleanup needed when an order is removed
  next();
});

export default mongoose.model('Order', orderSchema) 