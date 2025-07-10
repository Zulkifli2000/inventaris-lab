const Barang = require('../models/Barang');
const Log = require('../models/Log');

exports.getAll = async (req, res) => {
  try {
    const data = await Barang.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Gagal memuat data barang' });
  }
};

exports.create = async (req, res) => {
  const { nama, kode, jumlah, kategori } = req.body;

  if (!nama || !kode || !jumlah || !kategori) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    const barang = new Barang({ nama, kode, jumlah, kategori });
    await barang.save();

    await Log.create({
      action: 'Tambah Barang',
      user: req.user?.username || 'admin',
      detail: `Nama: ${nama}, Kode: ${kode}, Jumlah: ${jumlah}, Kategori: ${kategori}`
    });

    res.status(201).json(barang);
   } catch (err) {
    console.error('❌ Gagal tambah barang:', err.message);  // Tambah ini
    res.status(400).json({ message: err.message });          // Tampilkan error asli
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nama, kode, jumlah, kategori } = req.body;

  try {
    const updated = await Barang.findByIdAndUpdate(
      id,
      { nama, kode, jumlah, kategori },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }

    await Log.create({
      action: 'Update Barang',
      user: req.user?.username || 'admin',
      detail: `ID: ${id}, Nama: ${nama}, Kode: ${kode}, Jumlah: ${jumlah}, Kategori: ${kategori}`
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Gagal mengubah barang' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const barang = await Barang.findByIdAndDelete(id);

    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }

    await Log.create({
      action: 'Hapus Barang',
      user: req.user?.username || 'admin',
      detail: `Nama: ${barang.nama}, Kode: ${barang.kode}, Jumlah: ${barang.jumlah}, Kategori: ${barang.kategori}`
    });

    res.json({ message: 'Barang dihapus' });
  } catch (err) {
    res.status(400).json({ message: 'Gagal menghapus barang' });
  }
};
