const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const username = 'admin';
  const password = 'admin123';

  const existing = await User.findOne({ username });
  if (existing) {
    console.log('✅ Akun admin sudah ada.');
  } else {
    const hashed = bcrypt.hashSync(password, 10);
    await User.create({ username, password: hashed });
    console.log('✅ Admin berhasil dibuat (admin / admin123)');
  }

  mongoose.disconnect();
}).catch(err => {
  console.error('❌ Gagal konek ke MongoDB:', err);
});
