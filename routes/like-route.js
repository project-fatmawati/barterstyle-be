const express = require("express");
const {
  getAllLikes,
  getLikesById,
  addLikes,
  editLikesById,
  deleteLikesById,
} = require("../controllers/like-controller");
const route = express.Router();

route.get("/", getAllLikes);
route.get("/:id", getLikesById);
route.post("/",  addLikes);
route.put("/:id", editLikesById);
route.delete("/:id", deleteLikesById);

module.exports = route;