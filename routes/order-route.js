const express = require("express");
const orderRoute = express.Router();
const {validateToken} = require("../middleware/auth");
const Order = require("../models/Order");

// Create order (POST /)
orderRoute.post("/", validateToken, (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethods,
    shippingPrice,
    feeTransaction,
    totalPrice,
  } = req.body;
  console.log(orderItems);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    return next(new Error("no order items found")); // Use next() for error handling
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      feeTransaction,
      totalPrice,
      user: req.user._id,
    });

    order.save()
      .then((createdOrder) => {
        res.status(201).json(createdOrder);
      })
      .catch((err) => next(err)); // Pass error to middleware
  }
});

// Get order details (GET /:id)
orderRoute.get("/:id", validateToken, (req, res, next) => {
  Order.findById(req.params.id)
    .populate("user", "name email")
    .then((order) => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404);
        return next(new Error("Order Not Found"));
      }
    })
    .catch((err) => next(err));
});

// Update order status for payment (PUT /:id/payment)
orderRoute.put("/:id/payment", validateToken, (req, res, next) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.create_time,
          email_address: req.body.payer.email_address,
        };

        return order.save();
      } else {
        res.status(404);
        return next(new Error("Order Not Found"));
      }
    })
    .then((updatedOrder) => res.status(200).json(updatedOrder))
    .catch((err) => next(err));
});

// Get user orders (GET /)
orderRoute.get("/", validateToken, (req, res, next) => {
  Order.find({ user: req.user._id })
    .sort({ _id: -1 })
    .then((orders) => {
      if (orders) {
        res.status(200).json(orders);
      } else {
        res.status(404);
        return next(new Error("Orders Not Found"));
      }
    })
    .catch((err) => next(err));
});

module.exports = orderRoute;