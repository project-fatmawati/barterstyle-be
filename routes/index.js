const express = require("express");
const route = express.Router();

const authRoute = require("./auth-route");
const { validateToken } = require("../middleware/auth");

route.use((req, res, next) => {
    console.log("middleware untuk semua route");
    next();
  });

  route.get("/", (req, res) => {
    res.json({
      message: "Welcome Barterstyle",
    });
  });
  
  route.use("/auth", authRoute);

  module.exports = route;