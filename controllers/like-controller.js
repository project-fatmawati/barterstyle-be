const Like = require("../models/Like");

module.exports = {
  // Get all likes
  getAllLikes: async (req, res) => {
    try {
      const likes = await Like.find();
      res.json({ message: "Get All Likes Success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get Like By Id
  getLikesById: async (req, res) => {
    try {
      const like = await Like.findById(req.params.id);
      if (!like) {
        return res.status(404).json({ message: "Like not found" });
      }
      res.json(like);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Create a new like
  addLikes: async (req, res) => {
    try {
      const newLike = new Like(req.body);
      const savedLike = await newLike.save();
      res.status(201).json(savedLike);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update a like
  editLikesById: async (req, res) => {
    try {
      const updatedLike = await Like.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedLike) {
        return res.status(404).json({ message: "Like not found" });
      }
      res.json(updatedLike);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete a like
  deleteLikesById: async (req, res) => {
    try {
      const deletedLike = await Like.findByIdAndDelete(req.params.id);
      if (!deletedLike) {
        return res.status(404).json({ message: "Like not found" });
      }
      res.json({ message: "Like deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
