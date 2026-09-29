const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  time: { type: String, required: true },
  subject: { type: String, required: true },
  faculty: { type: String, default: null },
  room: { type: String, required: true }
});

const timetableSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  semester: { type: Number, required: true },
  section: { type: String, required: true },
  day: { type: String, required: true },
  lectures: [lectureSchema]
}, { collection: 'timetable' });

module.exports = mongoose.model('Timetable', timetableSchema);
