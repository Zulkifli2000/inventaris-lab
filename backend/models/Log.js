const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  action: { type: String, required: true },
  user: { type: String, default: 'admin' },
  detail: { type: String, default: '-' }
});

module.exports = mongoose.model('Log', logSchema);
