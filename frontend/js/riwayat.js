const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'index.html'; // redirect jika belum login
}

async function loadRiwayat() {
  const tbody = document.querySelector('#tabelRiwayat tbody');
  tbody.innerHTML = '';

  try {
    const res = await fetch(`${BASE_URL}/riwayat`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      tbody.innerHTML = '<tr><td colspan="4">Gagal memuat data riwayat.</td></tr>';
      return;
    }

    const data = await res.json(); // pindahkan ke bawah

    data.forEach(log => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${new Date(log.timestamp).toLocaleString()}</td>
        <td>${log.action}</td>
        <td>${log.user}</td>
        <td>${log.detail}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="4">Terjadi kesalahan koneksi.</td></tr>';
  }
}

loadRiwayat();
