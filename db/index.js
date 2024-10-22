require("dotenv").config();
const mongoose = require("mongoose");

const dbURL = process.env.DB_URL;
console.log(dbURL);

const db = mongoose.connect(dbURL);

module.exports = db;