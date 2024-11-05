const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
  memberFree: String,
  memberPro3bulan: String,
  memberPro6bulan: String,
  }
  );

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;