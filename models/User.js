const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  handphone: {
    type: String,
    required: true
  },
  kuota: {
    type: Number,
    min: 0
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;