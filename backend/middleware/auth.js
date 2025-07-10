const jwt = require('jsonwebtoken');
const User = require('../models/User'); // pastikan model ini ada

module.exports = async function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id); // ambil user dari DB
    if (!user) return res.status(401).json({ message: 'User tidak ditemukan' });

    req.user = {
      id: user._id,
      username: user.username
    };

    next();
  } catch (err) {
    res.status(403).json({ message: 'Token tidak valid' });
  }
};
