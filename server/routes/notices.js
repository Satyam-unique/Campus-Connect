const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

// GET /api/notices
// Fetch all notices, sorting pinned notices first, then by _id descending
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ isPinned: -1, _id: -1 });
    res.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ error: 'Server error fetching notices' });
  }
});

module.exports = router;
