// Cek apakah user sudah login
const token = localStorage.getItem('token');
if (!token && location.pathname !== '/index.html') {
  window.location.href = 'index.html';
}

// Fungsi logout
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'logout.html';
}
