const mongoose = require('mongoose');

const peminjamanSchema = new mongoose.Schema({
  nama_barang: { type: String, required: true },
  jumlah: { type: Number, required: true },
  peminjam: { type: String, required: true },
  tanggal_pinjam: { type: Date, required: true },
  tanggal_kembali: { type: Date, required: true },
  status: { type: String, default: 'Dipinjam' }, // bisa Diganti 'Dikembalikan' nanti
}, { timestamps: true });

module.exports = mongoose.model('Peminjaman', peminjamanSchema);
