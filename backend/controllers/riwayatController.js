const Log = require('../models/Log');

exports.getAll = async (req, res) => {
  const logs = await Log.find().sort({ tanggal: -1 });
  res.json(logs);
};