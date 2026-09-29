const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  type: { type: String, enum: ['Lost', 'Found'], required: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  ownerName: { type: String, required: true },
  rollNo: { type: String, default: '' },
  location: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, default: 'Open' },
  phone: { type: String, required: true },
  claimedBy: {
    name: { type: String, default: null },
    email: { type: String, default: null },
    branch: { type: String, default: null },
    claimedAt: { type: Date, default: null }
  },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'lost-found' });

module.exports = mongoose.model('LostFound', lostFoundSchema);
