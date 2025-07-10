const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import semua route
const authRoutes = require('./routes/auth');
const barangRoutes = require('./routes/barang');
const transaksiRoutes = require('./routes/transaksi');
const riwayatRoutes = require('./routes/riwayat');
const peminjamanRoutes = require('./routes/peminjaman');

const app = express();
app.use(cors());
app.use(express.json());

// Gunakan route dengan prefix masing-masing
app.use('/auth', authRoutes);
app.use('/barang', barangRoutes);
app.use('/transaksi', transaksiRoutes);
app.use('/riwayat', riwayatRoutes);
app.use('/peminjaman', peminjamanRoutes);

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.error(err));
