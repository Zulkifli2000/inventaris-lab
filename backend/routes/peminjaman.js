const express = require('express');
const router = express.Router();
const Peminjaman = require('../models/Peminjaman');
const Log = require('../models/Log'); // ✅ tambahkan ini
const auth = require('../middleware/auth');

// GET semua peminjaman
router.get('/', auth, async (req, res) => {
  try {
    const data = await Peminjaman.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Gagal memuat data peminjaman' });
  }
});

// POST simpan peminjaman + simpan log
router.post('/', auth, async (req, res) => {
  try {
    const { nama_barang, jumlah, peminjam, tanggal_pinjam, tanggal_kembali } = req.body;
    
    const pinjam = new Peminjaman({
      nama_barang,
      jumlah,
      peminjam,
      tanggal_pinjam,
      tanggal_kembali,
      status: 'dipinjam'
    });

    await pinjam.save();

    // ✅ Simpan ke log
    await Log.create({
      action: 'Peminjaman',
      user: req.user?.username || 'admin',
      detail: `Pinjam ${jumlah} ${nama_barang} oleh ${peminjam}`
    });

    res.status(201).json(pinjam);
  } catch (err) {
    res.status(400).json({ message: 'Gagal menyimpan peminjaman' });
  }
});

module.exports = router;
