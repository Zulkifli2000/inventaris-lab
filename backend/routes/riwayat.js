const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Gagal memuat riwayat log' });
  }
});

module.exports = router;
