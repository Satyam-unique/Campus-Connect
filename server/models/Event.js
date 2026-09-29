const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  registrationDeadline: { type: Date, default: null },
  maxRegistrations: { type: Number, default: null },
  rounds: { type: mongoose.Schema.Types.Mixed, default: null },
  createdAt: { type: Date, default: Date.now },
  society: {
    name: { type: String, required: true },
    logoUrl: { type: String, default: null }
  },
  _count: {
    registrations: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Event', eventSchema);
