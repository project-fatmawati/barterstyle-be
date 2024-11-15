const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: "User" 
    },
    orderItems: [orderItemSchema],
    poin: { type: String, required: true },
    shippingAddress: {
      address: { type: String, required: true },
    },
    paymentMethod: { 
      type: String, 
      required: true 
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      updated_time: { type: String },
      email_address: { type: String },
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    feeTransaction: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: { type: Date },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
