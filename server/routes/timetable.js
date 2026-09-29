const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');


router.get('/', async (req, res) => {
  try {
    const { branch, semester, section, day } = req.query;
    
    let query = {};
    if (branch) query.branch = branch;
    if (semester) query.semester = parseInt(semester);
    if (section) query.section = section;
    if (day) query.day = day;

    const timetables = await Timetable.find(query);
    res.json(timetables);
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({ error: 'Server error fetching timetables' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id);
    if (!timetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }
    res.json(timetable);
  } catch (error) {
    console.error('Error fetching timetable by ID:', error);
    res.status(500).json({ error: 'Server error fetching timetable' });
  }
});

module.exports = router;
