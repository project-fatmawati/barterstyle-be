const express = require("express");
const route = express.Router();
const authRoute = require("./auth-route");
const likeRoute = require("./like-route");
const memberRoute = require("./member-route")

// const { validateToken } = require("../middleware/auth");

// route.use((req, res, next) => {
//     console.log("middleware untuk semua route");
//     next();
//   });

  route.get("/", (req, res) => {
    res.json({
      message: "Welcome Barterstyle",
    });
  });
  
  route.use("/auth", authRoute);
  route.use("/likes", likeRoute);
  route.use("/member", memberRoute);

  module.exports = route;