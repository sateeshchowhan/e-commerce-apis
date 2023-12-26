// models/Order.js
const mongoose = require('mongoose');

//shema of order
const orderSchema = new mongoose.Schema({
  userId:{type:String,required:true},
  items: [],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending', // Default status when the order is created
    enum: ['pending', 'processing', 'shipped', 'delivered'], // Possible order statuses
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
