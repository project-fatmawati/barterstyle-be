const express = require("express");
const { regis, login, userDetail, Logout } = require("../controllers/auth-controller");

const route = express.Router();

route.post("/regis", regis); 
route.post("/login", login);
route.get("/userDetail",userDetail)
route.post("/Logout",Logout)

module.exports = route;
