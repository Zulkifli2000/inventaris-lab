const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'index.html';
}
const notif = document.getElementById('formNotif');

// Tambah barang
document.getElementById('formBarang').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const kode = document.getElementById('kode').value.trim();
  const jumlah = parseInt(document.getElementById('jumlah').value);
  const kategori = document.getElementById('kategori').value.trim();

  if (!nama || !kode || !jumlah || !kategori) {
    notif.textContent = 'Semua field wajib diisi!';
    notif.className = 'notif error';
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/barang`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nama, kode, jumlah, kategori })
    });

    const data = await res.json();

    if (res.ok) {
      notif.textContent = 'Barang berhasil ditambahkan!';
      notif.className = 'notif success';
      document.getElementById('formBarang').reset();
      loadBarang();
    } else {
      notif.textContent = data.message || 'Gagal menambah barang.';
      notif.className = 'notif error';
    }
  } catch (err) {
    notif.textContent = 'Terjadi kesalahan koneksi.';
    notif.className = 'notif error';
  }
});

// Tampilkan data barang
async function loadBarang() {
  const tbody = document.querySelector('#tabelBarang tbody');
  tbody.innerHTML = '';

  try {
    const res = await fetch(`${BASE_URL}/barang`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (res.ok) {
      if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Belum ada data.</td></tr>';
      } else {
        data.forEach(barang => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${barang.nama}</td>
            <td>${barang.kode}</td>
            <td>${barang.jumlah}</td>
            <td>${barang.kategori}</td>
            <td><button onclick="hapusBarang('${barang._id}')">Hapus</button></td>
          `;
          tbody.appendChild(row);
        });
      }
    } else {
      tbody.innerHTML = '<tr><td colspan="5">Gagal memuat data.</td></tr>';
    }
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="5">Gagal memuat data.</td></tr>';
  }
}

// Hapus barang
async function hapusBarang(id) {
  if (!confirm('Yakin ingin menghapus barang ini?')) return;

  try {
    const res = await fetch(`${BASE_URL}/barang/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (res.ok) {
      alert('Barang berhasil dihapus.');
      loadBarang();
    } else {
      alert(data.message || 'Gagal menghapus barang.');
    }
  } catch (err) {
    alert('Terjadi kesalahan koneksi.');
  }
}

// Load saat halaman dibuka
loadBarang();
window.hapusBarang = hapusBarang;
