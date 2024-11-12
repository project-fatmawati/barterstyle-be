require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = {
  regis: async (req, res) => {
    const data = req.body;
    console.log(data);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;

    const newUser = new User(data);
    await newUser.save();

    res.json({
      message: "Registration success",
    });
  },

  login: async (req, res) => {
    const data = req.body;

    const user = await User.findOne({ email: data.email }).exec();
    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }

    const checkPassword = bcrypt.compareSync(data.password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Login failed" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // optional: set expiration time
    );

    res.json({
      message: "Login success",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        kuota: user.kuota,
      }
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
          _id: user._id,
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
      res.clearCookie("token");
      res.json({ message: "Successfully logged out" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
