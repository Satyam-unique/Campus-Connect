const express = require('express');
const router = express.Router();
const LostFound = require('../models/LostFound');
const User = require('../models/User');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
  try {
    const items = await LostFound.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching lost & found items:', error);
    res.status(500).json({ error: 'Server error fetching lost & found items' });
  }
});


router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { type, itemName, category, description, location, date, phone, rollNo } = req.body;

    const newItem = new LostFound({
      type,
      itemName,
      category,
      description,
      ownerName: user.name, // Use the logged in user's name
      rollNo: rollNo || user.rollNo || '', 
      location,
      date,
      phone
    });

    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Server error creating item' });
  }
});


router.put('/:id/claim', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let item = await LostFound.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.status === 'Claimed') {
      return res.status(400).json({ error: 'Item is already claimed' });
    }

    item.status = 'Claimed';
    item.claimedBy = {
      name: user.name,
      email: user.email,
      branch: user.branch,
      claimedAt: new Date()
    };

    await item.save();
    res.json(item);
  } catch (error) {
    console.error('Error claiming item:', error);
    res.status(500).json({ error: 'Server error claiming item' });
  }
});

module.exports = router;
