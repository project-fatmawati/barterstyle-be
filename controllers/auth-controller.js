require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = {
  regis: async (req, res) => {
    const data = req.body;
    console.log(data);

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;
    // console.log(data);

    const newUser = new User(data);
    newUser.save();

    res.json({
      message: "registration success",
    });
  },

  login: async (req, res) => {
    const data = req.body;

    // cari user di dalam DB
    const user = await User.findOne({ username: data.username }).exec();
    if (!user) {
      res.json({ message: "login failed" });
      return;
    }

    // cek password yg di DB dan inputan user
    const checkPassword = bcrypt.compareSync(data.password, user.password);
    if (!checkPassword) {
      res.json({ message: "login failed" });
      return;
    }

    // Buat token
    const token = jwt.sign(
      { username: user.username }, // payload
      process.env.JWT_KEY // secret key
    );

    res.json({
      message: "login success",
      token,
        _id: user.id,
        username: user.username,
        email: user.email,
        kuota: user.kuota,
      
    });
  },

userDetail: async (req, res) => {
  try {
  
    const userId = req.user.id; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User details retrieved",
      user: {
        _id: user.id,
        username: user.username,
        email: user.email,
        kuota: user.kuota, 
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
},


logout: async (req, res) => {
  try {
    res.clearCookie("token")
    // res.send('<script>localStorage.removeItem("token");</script>');

    res.json({ message: "Successfully logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
},
};