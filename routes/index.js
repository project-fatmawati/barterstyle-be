const express = require("express");
const route = express.Router();
const authRoute = require("./auth-route");
const likeRoute = require("./like-route");
const memberRoute = require("./member-route")
const orderRoute = require("./order-route")
const productRoute = require("./product-route")

const { validateToken } = require("../middleware/auth");

// route.use((req, res, next) => {
//     console.log("middleware untuk semua route");
//     next();
//   });

  route.get("/", (req, res) => {
    res.json({
      message: "Welcome Barterstyle",
    });
  });
  
  route.use("/api/auth", authRoute);
  route.use("/api/likes", validateToken, likeRoute);
  route.use("/api/member", validateToken, memberRoute);
  route.use("/api/like", validateToken, likeRoute);
  route.use("/api/order", validateToken, orderRoute);
  route.use("/api/product", validateToken, productRoute);


  module.exports = route;