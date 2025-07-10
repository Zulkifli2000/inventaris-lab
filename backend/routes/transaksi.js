const express = require('express');
const router = express.Router();
const Transaksi = require('../models/Transaksi');
const auth = require('../middleware/auth');

// 🔐 Semua rute ini dilindungi JWT
// -----------------------------------------

// ➕ POST: Tambah transaksi
router.post('/', auth, async (req, res) => {
  try {
    const { nama_barang, jumlah, tipe, keterangan } = req.body;

    if (!nama_barang || !jumlah || !tipe) {
      return res.status(400).json({ message: 'Data tidak lengkap.' });
    }

    const trx = new Transaksi({
      nama_barang,
      jumlah,
      tipe,
      keterangan: keterangan || '-'
    });

    await trx.save();
    res.status(201).json({ message: 'Transaksi berhasil disimpan.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// 📦 GET: Ambil semua transaksi (terbaru di atas)
router.get('/', auth, async (req, res) => {
  try {
    const transaksi = await Transaksi.find().sort({ tanggal: -1 }); // terbaru duluan
    res.json(transaksi);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data.' });
  }
});

module.exports = router;
