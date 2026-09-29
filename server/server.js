require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const timetableRoutes = require('./routes/timetable');
const noticeRoutes = require('./routes/notices');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const lostFoundRoutes = require('./routes/lostfound');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/timetable', timetableRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/lostfound', lostFoundRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
