const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    // ...
    // isFree: {
    //   type: Boolean,
    //   default: true
    // },
    // isPro3Months: Boolean,
    // isPro6Months: Boolean
  });

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;