const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'index.html'; // Redirect ke login jika belum login
}

const notif = document.getElementById('peminjamanNotif');

// Simpan peminjaman
document.getElementById('formPeminjaman').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nama_barang = document.getElementById('nama_barang').value;
  const jumlah = document.getElementById('jumlah').value;
  const peminjam = document.getElementById('peminjam').value;
  const tanggal_pinjam = document.getElementById('tanggal_pinjam').value;
  const tanggal_kembali = document.getElementById('tanggal_kembali').value;

  try {
    const res = await fetch(`${BASE_URL}/peminjaman`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nama_barang, jumlah, peminjam, tanggal_pinjam, tanggal_kembali })
    });

    const data = await res.json();

    if (res.ok) {
      notif.textContent = 'Peminjaman berhasil disimpan!';
      notif.className = 'notif success';
      document.getElementById('formPeminjaman').reset();
      loadPeminjaman();
    } else {
      notif.textContent = data.message || 'Gagal menyimpan peminjaman.';
      notif.className = 'notif error';
    }
  } catch (err) {
    notif.textContent = 'Terjadi kesalahan koneksi.';
    notif.className = 'notif error';
  }
});

// Tampilkan data peminjaman
async function loadPeminjaman() {
  const tbody = document.querySelector('#tabelPeminjaman tbody');
  tbody.innerHTML = '';

  try {
    const res = await fetch(`${BASE_URL}/peminjaman`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      data.forEach(pjm => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${pjm.nama_barang}</td>
          <td>${pjm.jumlah}</td>
          <td>${pjm.peminjam}</td>
          <td>${new Date(pjm.tanggal_pinjam).toLocaleDateString()}</td>
          <td>${new Date(pjm.tanggal_kembali).toLocaleDateString()}</td>
          <td>${pjm.status || 'Dipinjam'}</td>
        `;
        tbody.appendChild(row);
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="6">Tidak ada data.</td></tr>';
    }
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="6">Gagal memuat data peminjaman.</td></tr>';
  }
}

// Jalankan saat halaman dimuat
loadPeminjaman();
