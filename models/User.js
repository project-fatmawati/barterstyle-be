const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  handphone: Number,
  kuota: Number,
  category: {
    type: mongoose.ObjectId,
    ref: "category"
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;