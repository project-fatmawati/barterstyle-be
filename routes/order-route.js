// order-route.js
const express = require('express');
const {
  createOrder,
  getOrderById,
  updateOrderPayment,
  getUserOrders,
} = require('../controllers/order-controller'); // Pastikan path ini benar

const router = express.Router();

// Create a new order (POST /)
router.post('/', createOrder); // Harusnya ini adalah callback function dari controller

// Get order details by ID (GET /:id)
router.get('/:id', getOrderById);

// Update order payment status (PUT /:id/payment)
router.put('/:id/payment', updateOrderPayment);

// Get user's orders (GET /)
router.get('/', getUserOrders);

module.exports = router;
