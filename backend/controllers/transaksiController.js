const Transaksi = require('../models/Transaksi');
const Log = require('../models/Log');

exports.create = async (req, res) => {
  const { nama_barang, jumlah, peminjam, tanggal_pinjam, tanggal_kembali } = req.body;

  try {
    const transaksi = new Transaksi({ nama_barang, jumlah, peminjam, tanggal_pinjam, tanggal_kembali });
    await transaksi.save();

    await Log.create({
      action: 'Peminjaman',
      user: req.user?.username || 'admin',
      detail: `Nama Barang: ${nama_barang}, Jumlah: ${jumlah}, Peminjam: ${peminjam}`
    });

    res.json(transaksi);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menyimpan peminjaman' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Transaksi.find().sort({ tanggal_pinjam: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Gagal memuat data' });
  }
};
