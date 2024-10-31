import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: String,
      quantity: Number,
      price: Number,
      salePrice: Number,
    },
  ],
  shippingAddress1: String,
  city: String,
  zip: String,
  country: String,
  phone: String,
  totalPrice: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'cancelled', 'fulfilled', 'processing', 'shipped'],
    default: 'pending',
  },
  
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default OrderModel;
