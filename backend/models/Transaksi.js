const mongoose = require('mongoose');

const transaksiSchema = new mongoose.Schema({
  nama_barang: String,
  jumlah: Number,
  peminjam: String,
  tanggal_pinjam: Date,
  tanggal_kembali: Date,
  status: {
    type: String,
    default: 'Dipinjam' // atau 'Dikembalikan'
  }
});

module.exports = mongoose.model('Transaksi', transaksiSchema);
