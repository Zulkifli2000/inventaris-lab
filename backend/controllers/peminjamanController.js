const Peminjaman = require('../models/Peminjaman');
const Log = require('../models/Log');

exports.create = async (req, res) => {
  try {
    const { nama_barang, jumlah, peminjam, tanggal_pinjam, tanggal_kembali } = req.body;

    const peminjaman = new Peminjaman({ nama_barang, jumlah, peminjam, tanggal_pinjam, tanggal_kembali, status: 'dipinjam' });
    await peminjaman.save();

    await Log.create({
      action: 'Peminjaman',
      user: req.user?.username || 'admin',
      detail: `Pinjam ${jumlah} ${nama_barang} oleh ${peminjam}`
    });

    res.json(peminjaman);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menyimpan peminjaman' });
  }
};
