const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  postedBy: { type: String, required: true },
  isPinned: { type: Boolean, default: false }
}, { collection: 'notices' });

module.exports = mongoose.model('Notice', noticeSchema);
