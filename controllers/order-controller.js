const Order = require("../models/Order");
module.exports = {
  // Create order (POST /)
  createOrder: async (req, res, next) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethods,
        shippingPrice,
        feeTransaction,
        totalPrice,
      } = req.body;

      if (orderItems && orderItems.length === 0) {
        throw new Error("No order items found"); // Use throw for asynchronous errors
      }

      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethods,
        shippingPrice,
        feeTransaction,
        totalPrice,
        user: req.user._id, 
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error);
      next(error); // Pass error to middleware for handling
    }
  },

  // Get order details (GET /:id)
  getOrderById: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
      );
      if (!order) {
        throw new Error("Order Not Found");
      }
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Update order status for payment (PUT /:id/payment)
  updateOrderPayment: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        throw new Error("Order Not Found");
      }

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.create_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // Get user orders (GET /)
  getUserOrders: async (req, res, next) => {
    try {
      const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
      if (!orders) {
        throw new Error("Orders Not Found");
      }
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};