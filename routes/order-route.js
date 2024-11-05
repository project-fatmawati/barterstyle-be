const express = require("express");
const {
  createOrder,
  getOrderById,
  updateOrderPayment,
  getUserOrders,
} = require("../controllers/order-controller");

const router = express.Router();

// Create a new order (POST /)
router.post("/", createOrder);

// Get order details by ID (GET /:id)
router.get("/:id", getOrderById);

// Update order payment status (PUT /:id/payment)
router.put("/:id/payment", updateOrderPayment);

// Get user's orders (GET /)
router.get("/", getUserOrders);

module.exports = router;