const Member = require("../models/Member");
module.exports = {
  // Get All Member
  getAllMembers: async (req, res) => {
    try {
      const members = await Member.find();
      res.json(members);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get Member by Id
  getMemberById: async (req, res) => {
    try {
      const member = await Member.findById(req.params.id);
      if (!member) {
        return res.status(404).json({
          message: "Member not found",
        });
      }
      res.json(member);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Create a new Member
  createMember: async (req, res) => {
    try {
      const newMember = new Member(req.body);
      const savedMember = await newMember.save();
      res.status(201).json(savedMember);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Edit Member By Id
  editMemberById: async (req, res) => {
    try {
      const updatedMember = await Member.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedMember) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(updatedMember);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete Member By Id
  deleteMemberById: async (req, res) => {
    try {
      const deletedMember = await Member.findByIdAndDelete(req.params.id);
      if (!deletedMember) {
        return res.status(404).json({
          message: "Member not found",
        });
      }
      res.json({ message: "Member deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
