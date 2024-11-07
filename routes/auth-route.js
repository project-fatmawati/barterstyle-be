const express = require("express");
const { regis, login } = require("../controllers/auth-controller");

const route = express.Router();

route.post("/regis", regis);
route.post("/login", login);

module.exports = route;

// mongodb+srv://rikakamila1717:Loginmongodb2024@cluster1.hpuxn.mongodb.net/BE_Barterstyle