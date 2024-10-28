const express = require("express");
const {
  getAllMembers,
  getMemberById,
  createMember,
  editMemberById,
  deleteMemberById,
} = require("../controllers/member-controller");
const route = express.Router();

route.get("/", getAllMembers);
route.get("/:id", getMemberById);
route.post("/", createMember);
route.put("/:id", editMemberById);
route.delete("/:id", deleteMemberById);

module.exports = route;