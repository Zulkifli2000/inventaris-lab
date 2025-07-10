const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'index.html';
}
const notif = document.getElementById('transaksiNotif');

// Fungsi kirim transaksi
document.getElementById('formTransaksi').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nama_barang = document.getElementById('nama_barang').value;
  const jumlah = document.getElementById('jumlah').value;
  const tipe = document.getElementById('jenis').value;
  const keterangan = document.getElementById('keterangan').value;

  try {
    const res = await fetch(`${BASE_URL}/transaksi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nama_barang, jumlah, tipe, keterangan })
    });

    const data = await res.json();

    if (res.ok) {
      notif.textContent = 'Transaksi berhasil disimpan!';
      notif.className = 'notif success';
      document.getElementById('formTransaksi').reset();
      loadTransaksi();
    } else {
      notif.textContent = data.message || 'Gagal menyimpan transaksi.';
      notif.className = 'notif error';
    }
  } catch (err) {
    notif.textContent = 'Terjadi kesalahan koneksi.';
    notif.className = 'notif error';
  }
});

// Fungsi ambil transaksi terbaru
async function loadTransaksi() {
  const tbody = document.querySelector('#tabelTransaksi tbody');
  tbody.innerHTML = '';

  try {
    const res = await fetch(`${BASE_URL}/transaksi`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    if (Array.isArray(data)) {
      data.reverse().forEach(trx => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${trx.nama_barang}</td>
          <td>${trx.jumlah}</td>
          <td>${trx.tipe}</td>
          <td>${trx.keterangan || '-'}</td>
          <td>${new Date(trx.tanggal).toLocaleString('id-ID')}</td>
        `;
        tbody.appendChild(row);
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="5">Tidak ada data.</td></tr>';
    }
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="5">Gagal memuat data transaksi.</td></tr>';
  }
}

// Jalankan saat halaman dimuat
loadTransaksi();
