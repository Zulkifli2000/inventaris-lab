const mongoose = require('mongoose');

const barangSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    trim: true
  },
  kode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  jumlah: {
    type: Number,
    required: true,
    min: 0
  },
  kategori: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Barang', barangSchema);
